from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity,create_refresh_token, get_jwt
from flask_cors import CORS
from functools import wraps
from models import db, User, Product, ShoppingCart, Order, OrderItem, ShippingDetails, Wishlist, Review, ContactUs,PaymentMethod
from datetime import datetime
from flask_migrate import Migrate

import paypalrestsdk
import logging
import os
SECRET_KEY = os.urandom(24)

app = Flask(__name__)
logging.basicConfig(level=logging.DEBUG)

# Flask configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'  # Update as needed
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = SECRET_KEY  # Change this to a secure key


# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)
# Initialize PayPal SDK
paypalrestsdk.configure({
    "mode": "sandbox",  # Use "live" for production
    "client_id": 'AeGcfZKN2Ks_snnDvpGDVdiL3pE68JCnykGJg4zHJvl-5hprWI1-DXI-7yKN23yWxRmAgZL_Q3Bv4np8',
    "client_secret": "EH8q3qqJvYbKiGTM01zOF3w-kV7BvsUYiHGXtPyJ547uSWnh7IiXB3aHNwwfcQp4IztHy30QHELqtEkS"
})



def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        current_user = get_jwt_identity()
        user = User.query.filter_by(id=current_user).first()
        if not user.is_admin:
            return jsonify({'message': 'Admin access required'}), 403
        return fn(*args, **kwargs)
    return wrapper

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    # Check if the required fields are present
    if 'username' not in data or 'email' not in data or 'password' not in data or 'phone_number' not in data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Check if the user already exists
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({'error': 'User with this email already exists'}), 400
    
    # Hash the password
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    # Create a new user object
    new_user = User(
        username=data['username'],
        email=data['email'],
        password=hashed_password,
        is_admin=False,
        phone_number=data['phone_number']
    )

    # Add to the database and commit
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'success': 'User registered successfully'}), 201

    
@app.route('/login', methods=['POST'])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)
        return jsonify({"access_token": access_token, "refresh_token": refresh_token})
    else:
        return jsonify({"message": "Invalid username or password"}), 401
    
@app.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user_id = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user_id)
    return jsonify({"access_token": new_access_token}), 200


@app.route("/current_user", methods=["GET"])
@jwt_required()
def get_current_user():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    if current_user:
        return jsonify({
            "id": current_user.id, 
            "username": current_user.username, 
            "email": current_user.email,
            "is_admin": current_user.is_admin
        }), 200
    else:
        return jsonify({"message": "User not found"}), 404



    
BLACKLIST = set()
# @jwt.token_in_blocklist_loader
def check_if_token_in_blocklist(jwt_header, decrypted_token):
    jti = decrypted_token["jti"]
    return jti in BLACKLIST

@app.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    BLACKLIST.add(jti)
    return jsonify({"success":"Logged out successfully"}), 200


@app.route('/admin/users', methods=['GET'])
@jwt_required()
@admin_required
def get_users():
    users = User.query.all()
    users_list = [{'id': user.id, 'username': user.username, 'email': user.email, 'is_admin': user.is_admin} for user in users]
    return jsonify({'users': users_list})

@app.route('/admin/users/<int:id>', methods=['PATCH'])
@jwt_required()
@admin_required
def update_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    
    data = request.get_json()
    is_admin = data.get('is_admin')
    
    if is_admin is not None:
        user.is_admin = is_admin
        db.session.commit()
        return jsonify({'message': 'User updated successfully'})
    return jsonify({'message': 'No updates provided'}), 400

@app.route('/admin/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    current_user = get_jwt_identity()
    if not current_user['is_admin']:
        return jsonify({'message': 'Admin access required'}), 403

    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({'message': 'User deleted successfully'})


@app.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    current_user = get_jwt_identity()
    logging.debug(f"GET /profile called for user: {current_user}")

    user = User.query.filter_by(id=current_user).first()
    logging.debug(f"Fetched user: {user}")

    if not user:
        return jsonify({'message': 'User not found'}), 404

    return jsonify({
        'username': user.username,
        'email': user.email,
        'phone_number': user.phone_number
    })

@app.route('/profile', methods=['PATCH'])
@jwt_required()
def update_profile():
    current_user = get_jwt_identity()
    logging.debug(f"PATCH /profile called for user: {current_user}")

    user = User.query.filter_by(id=current_user).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404

    data = request.get_json()
    logging.debug(f"Request data: {data}")

    if 'username' in data:
        user.username = data['username']
    if 'email' in data:
        user.email = data['email']
    if 'phone_number' in data:
        try:
            user.phone_number = int(data['phone_number'])  # Convert to integer
        except ValueError:
            return jsonify({'message': 'Invalid phone number format'}), 400
    if 'currentPassword' in data and 'newPassword' in data and 'confirmPassword' in data:
        if not bcrypt.check_password_hash(user.password, data['currentPassword']):
            return jsonify({'message': 'Current password is incorrect'}), 400
        if data['newPassword'] != data['confirmPassword']:
            return jsonify({'message': 'New passwords do not match'}), 400
        user.password = bcrypt.generate_password_hash(data['newPassword']).decode('utf-8')

    db.session.commit()

    return jsonify({'message': 'Profile updated successfully'})


@app.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    output = []

    for product in products:
        reviews = []
        for review in product.reviews:
            review_data = {
                'id': review.id,
                'rating': review.rating,
                'comment': review.comment,
                'date': review.date,
                'reviewerName': review.reviewer_name,
                'reviewerEmail': review.reviewer_email
            }
            reviews.append(review_data)

        product_data = {
            'id': product.id,
            'title': product.title,
            'description': product.description,
            'category': product.category,
            'price': product.price,
            'discountPercentage': product.discount_percentage,
            'rating': product.rating,
            'stock': product.stock,
            'tags': product.tags,
            'brand': product.brand,
            'sku': product.sku,
            'weight': product.weight,
            'dimensions': {
                'width': product.width,
                'height': product.height,
                'depth': product.depth
            },
            'warrantyInformation': product.warranty_information,
            'shippingInformation': product.shipping_information,
            'availabilityStatus': product.availability_status,
            'returnPolicy': product.return_policy,
            'minimumOrderQuantity': product.minimum_order_quantity,
            'createdAt': product.created_at,
            'updatedAt': product.updated_at,
            'barcode': product.barcode,
            'qrCode': product.qr_code,
            'images': product.images,
            'thumbnail': product.thumbnail,
            'reviews': reviews  # Add reviews to the product data
        }
        output.append(product_data)

    return jsonify({'products': output})

#product routes by id
@app.route('/products/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({'message': 'Product not found'}), 404

    product_data = {
        'id': product.id,
        'title': product.title,
        'description': product.description,
        'category': product.category,
        'price': product.price,
        'discountPercentage': product.discount_percentage,
        'rating': product.rating,
        'stock': product.stock,
        'tags': product.tags,
        'brand': product.brand,
        'sku': product.sku,
        'weight': product.weight,
        'dimensions': {
            'width': product.width,
            'height': product.height,
            'depth': product.depth
        },
        'warrantyInformation': product.warranty_information,
        'shippingInformation': product.shipping_information,
        'availabilityStatus': product.availability_status,
        'returnPolicy': product.return_policy,
        'minimumOrderQuantity': product.minimum_order_quantity,
        'createdAt': product.created_at,
        'updatedAt': product.updated_at,
        'barcode': product.barcode,
        'qrCode': product.qr_code,
        'images': product.images,
        'thumbnail': product.thumbnail
    }
    return jsonify({'product': product_data})

@app.route('/products', methods=['POST'])
@jwt_required()
def add_product():
    current_user_id = get_jwt_identity()
    
    # Check if the user is an admin
    user = User.query.get(current_user_id)
    if not user or not user.is_admin:
        return jsonify({'message': 'Permission denied'}), 403

    data = request.get_json() or {}
    
    # Provide default values where necessary
    new_product = Product(
        title=data.get('title', ''),
        description=data.get('description', ''),
        category=data.get('category', ''),
        price=data.get('price', 0.0),
        discount_percentage=data.get('discountPercentage', 0.0),
        rating=data.get('rating', 0.0),
        stock=data.get('stock', 0),
        tags=data.get('tags', []),
        brand=data.get('brand', ''),
        sku=data.get('sku', ''),
        weight=data.get('weight', 0.0),
        width=data.get('dimensions', {}).get('width', 0.0),
        height=data.get('dimensions', {}).get('height', 0.0),
        depth=data.get('dimensions', {}).get('depth', 0.0),
        warranty_information=data.get('warrantyInformation', ''),
        shipping_information=data.get('shippingInformation', ''),
        availability_status=data.get('availabilityStatus', ''),
        return_policy=data.get('returnPolicy', ''),
        minimum_order_quantity=data.get('minimumOrderQuantity', 1),
        barcode=data.get('barcode', ''),
        qr_code=data.get('qrCode', ''),
        images=data.get('images', []),
        thumbnail=data.get('thumbnail', '')
    )
    
    try:
        db.session.add(new_product)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to create product', 'error': str(e)}), 500

    return jsonify({'message': 'Product created successfully'}), 201

@app.route('/products/<int:id>', methods=['PATCH'])
@jwt_required()
def partial_update_product(id):
    user_id = get_jwt_identity()
    
    # Query the user based on the ID returned by get_jwt_identity()
    user = User.query.get(user_id)
    
    # Check if the user exists and is an admin
    if not user or not user.is_admin:
        return jsonify({'message': 'Permission denied'}), 403

    product = Product.query.get(id)
    if not product:
        return jsonify({'message': 'Product not found'}), 404

    data = request.get_json()

    # Update product fields based on the provided data
    if 'title' in data:
        product.title = data['title']
    if 'description' in data:
        product.description = data['description']
    if 'category' in data:
        product.category = data['category']
    if 'price' in data:
        product.price = data['price']
    if 'discount_percentage' in data:
        product.discount_percentage = data['discount_percentage']
    if 'rating' in data:
        product.rating = data['rating']
    if 'stock' in data:
        product.stock = data['stock']
    if 'tags' in data:
        product.tags = data['tags']
    if 'brand' in data:
        product.brand = data['brand']
    if 'sku' in data:
        product.sku = data['sku']
    if 'weight' in data:
        product.weight = data['weight']
    if 'dimensions' in data:
        product.width = data['dimensions'].get('width', product.width)
        product.height = data['dimensions'].get('height', product.height)
        product.depth = data['dimensions'].get('depth', product.depth)
    if 'warrantyInformation' in data:
        product.warranty_information = data['warrantyInformation']
    if 'shippingInformation' in data:
        product.shipping_information = data['shippingInformation']

    db.session.commit()
    return jsonify({'message': 'Product updated successfully'}), 200


#Delete  products route only by admins
@app.route('/products/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_product(id):
    current_user = get_jwt_identity()
    if not current_user['is_admin']:
        return jsonify({'message': 'Permission denied'}), 403

    product = Product.query.get(id)
    if not product:
        return jsonify({'message': 'Product not found'}), 404

    db.session.delete(product)
    db.session.commit()

    return jsonify({'message': 'Product deleted successfully'})


@app.route('/cart', methods=['POST'])
def add_to_cart():
    try:
        data = request.get_json()
        print("Received data:", data)
        user_id = data.get('user_id')  # Make sure user_id is included
        product_id = data.get('product_id')
        quantity = data.get('quantity')
        price = data.get('price')
        

        if not user_id or not product_id or not quantity or not price:
            return jsonify({'error': 'Invalid data provided'}), 400
                # Calculate total price
        total_price = quantity * price
        # Create a new cart item
        new_cart_item = ShoppingCart(user_id=user_id, product_id=product_id, quantity=quantity, price=price,total_price=total_price)
        db.session.add(new_cart_item)
        db.session.commit()

        return jsonify({'message': 'Product added to cart successfully'})
    except Exception as e:
        print(f"Error: {e}")  # Log the actual error
        return jsonify({'error': 'An error occurred on the server'}), 500
@app.route('/cart', methods=['GET'])
@jwt_required()
def view_cart():
    try:
        # Get the current user's identity (assumed to be an integer user ID)
        current_user_id = get_jwt_identity()

        # Fetch the user's shopping cart
        cart_items = ShoppingCart.query.filter_by(user_id=current_user_id).all()
        
        # Prepare the response
        cart_data = []
        for item in cart_items:
            product = Product.query.get(item.product_id)
            if product:
                cart_data.append({
                    'id': product.id,
                    'title': product.title,
                    'description': product.description,
                    'quantity': item.quantity,
                    'total_price': item.total_price,
                    'price': item.price,
                    'image': product.images[0] if product.images else None,
                    'discount_percentage':product.discount_percentage
                })

        return jsonify({'cart': cart_data}), 200

    except Exception as e:
        logging.error(f"Error fetching cart: {e}")
        return jsonify({'msg': 'Failed to fetch cart'}), 500


@app.route('/cart/<int:product_id>', methods=['DELETE'])
@jwt_required()
def remove_from_cart(product_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(id=current_user).first()

    cart_item = ShoppingCart.query.filter_by(user_id=user.id, product_id=product_id).first()
    if not cart_item:
        return jsonify({'message': 'Product not found in cart'}), 404

    db.session.delete(cart_item)
    db.session.commit()

    return jsonify({'message': 'Product removed from cart successfully'})

@app.route('/shipping', methods=['POST'])
@jwt_required()
def add_shipping_details():
    try:
        data = request.get_json()
        user_id = get_jwt_identity()
        name = data.get('name')
        street_address = data.get('street_address')
        apartment_number = data.get('apartment_number')
        city = data.get('city')
        zip_code = data.get('zip_code')

        if not name or not street_address or not city or not zip_code:
            return jsonify({'error': 'Invalid data provided'}), 400

        new_shipping_details = ShippingDetails(
            user_id=user_id,
            name=name,
            street_address=street_address,
            apartment_number=apartment_number,
            city=city,
            zip_code=zip_code
        )
        db.session.add(new_shipping_details)
        db.session.commit()

        return jsonify({'message': 'Shipping details added successfully'})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'An error occurred on the server'}), 500

# Route to view shipping details
@app.route('/shipping', methods=['GET'])
@jwt_required()
def view_shipping_details():
    try:
        user_id = get_jwt_identity()
        shipping_details = ShippingDetails.query.filter_by(user_id=user_id).all()
        shipping_data = [{
            'id': sd.id,
            'name': sd.name,
            'street_address': sd.street_address,
            'apartment_number': sd.apartment_number,
            'city': sd.city,
            'zip_code': sd.zip_code,
            'created_at': sd.created_at
        } for sd in shipping_details]

        return jsonify({'shipping_details': shipping_data}), 200
    except Exception as e:
        logging.error(f"Error fetching shipping details: {e}")
        return jsonify({'msg': 'Failed to fetch shipping details'}), 500

# Route to add payment method
@app.route('/payment', methods=['POST'])
@jwt_required()
def add_payment_method():
    try:
        data = request.get_json()
        user_id = get_jwt_identity()
        email = data.get('email')


        if not email:
            return jsonify({'error': 'Invalid data provided'}), 400

        new_payment_method = PaymentMethod(
            user_id=user_id,
            email=email, # Assume the first payment method is the default one

        )
        db.session.add(new_payment_method)
        db.session.commit()

        return jsonify({'message': 'Payment method added successfully'})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'An error occurred on the server'}), 500
@app.route('/create-payment', methods=['POST'])
@jwt_required()
def create_payment():
    try:
        data = request.get_json()
        order_total = str(data.get('order_total'))  # Ensure total is a string

        payment = paypalrestsdk.Payment({
            "intent": "sale",
            "payer": {"payment_method": "paypal"},
            "redirect_urls": {
                "return_url": "http://localhost:3000/execute-payment",
                "cancel_url": "http://localhost:3000"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "Order Total",
                        "sku": "item",
                        "price": order_total,
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "total": order_total,
                    "currency": "USD"
                },
                "description": "Order payment."
            }]
        })

        if payment.create():
            approval_url = next(link.href for link in payment.links if link.rel == "approval_url")
            return jsonify({'payment_id': payment.id, 'payment_link': approval_url})
        else:
            logging.error(f"Payment creation failed: {payment.error}")
            return jsonify({'error': payment.error}), 500
    except Exception as e:
        logging.error(f"Error creating payment: {e}")
        return jsonify({'error': 'An error occurred during payment creation'}), 500

@app.route('/execute-payment', methods=['GET'])
@jwt_required()
def execute_payment():
    payment_id = request.args.get('paymentId')
    payer_id = request.args.get('PayerID')

    try:
        payment = paypalrestsdk.Payment.find(payment_id)

        if payment.execute({"payer_id": payer_id}):
            user_id = get_jwt_identity()

            # Fetch cart items
            cart_items = ShoppingCart.query.filter_by(user_id=user_id).all()
            if not cart_items:
                return jsonify({'error': 'Cart is empty'}), 400

            # Create a new order
            order = Order(user_id=user_id, total_amount=payment.transactions[0]['amount']['total'])
            db.session.add(order)
            db.session.commit()

            # Add items to the order and remove from cart
            for item in cart_items:
                order_item = OrderItem(order_id=order.id, product_id=item.product_id, quantity=item.quantity, price=item.price)
                db.session.add(order_item)
                db.session.delete(item)

            db.session.commit()

            return jsonify({'message': 'Payment executed successfully'})
        else:
            logging.error(f"Payment execution failed: {payment.error}")
            return jsonify({'error': payment.error}), 500
    except Exception as e:
        logging.error(f"Error executing payment: {e}")
        return jsonify({'error': 'An error occurred during payment execution'}), 500
    
@app.route('/checkout', methods=['POST'])
@jwt_required()
def checkout():
    try:
        user_id = get_jwt_identity()
        shipping_data = request.get_json()

        # Fetch cart items
        cart_items = ShoppingCart.query.filter_by(user_id=user_id).all()
        if not cart_items:
            return jsonify({'error': 'Cart is empty'}), 400

        # Calculate order total
        order_total = sum(item.total_price for item in cart_items)

        # Create a new order
        order = Order(user_id=user_id, total_amount=order_total, shipping_address=shipping_data)
        db.session.add(order)
        db.session.commit()

        # Move items from cart to order
        for item in cart_items:
            order_item = OrderItem(order_id=order.id, product_id=item.product_id, quantity=item.quantity, price=item.price)
            db.session.add(order_item)
            db.session.delete(item)

        db.session.commit()

        return jsonify({'message': 'Order created successfully', 'order_id': order.id})
    except Exception as e:
        logging.error(f"Error during checkout: {e}")
        return jsonify({'error': 'An error occurred during checkout'}), 500

@app.route('/user', methods=['GET'])
def get_user():
    users = User.query.all()
    users_data = [
        {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'password': user.password,
            'is_admin': user.is_admin,
        }
        for user in users
    ]
    return jsonify(users_data)          

# Route to add an item to the wishlist
@app.route('/wishlist', methods=['POST'])

def add_to_wishlist():
    data = request.get_json()
    user_id = data.get('user_id')
    product_id = data.get('product_id')

    if not user_id or not product_id:

    # Check if the product is already in the user's wishlist
        return jsonify({"msg": "user_id and product_id are required"}), 400
    existing_item = Wishlist.query.filter_by(user_id=user_id, product_id=product_id).first()
    if existing_item:
        return jsonify({"msg": "Product already in wishlist"}), 409

    # Add the product to the wishlist
    wishlist_item = Wishlist(user_id=user_id, product_id=product_id)
    db.session.add(wishlist_item)
    db.session.commit()

    return jsonify({"msg": "Item added to wishlist"}), 201

@app.route('/wishlist', methods=['GET'])
@jwt_required()
def view_wishlist():
    try:
        # Get the current user's identity (assumed to be an integer user ID)
        current_user_id = get_jwt_identity()

        # Fetch the user's wishlist
        wishlist_items = Wishlist.query.filter_by(user_id=current_user_id).all()
        
        # Prepare the response
        wishlist_data = []
        for item in wishlist_items:
            product = Product.query.get(item.product_id)
            if product:
                wishlist_data.append({
                    'id': product.id,
                    'title': product.title,
                    'description': product.description,
                    'price': product.price,
                    'image': product.images[0] if product.images else None,
                    'discount_percentage':product.discount_percentage
                })

        return jsonify({'wishlist': wishlist_data}), 200

    except Exception as e:
        logging.error(f"Error fetching wishlist: {e}")
        return jsonify({'msg': 'Failed to fetch wishlist'}), 500


@app.route('/wishlist/<int:product_id>', methods=['DELETE'])
@jwt_required()
def remove_from_wishlist(product_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(id=current_user).first()

    wishlist_item = Wishlist.query.filter_by(user_id=user.id, product_id=product_id).first()
    if not wishlist_item:
        return jsonify({'message': 'Product not found in wishlist'}), 404

    db.session.delete(wishlist_item)
    db.session.commit()

    return jsonify({'message': 'Product removed from wishlist successfully'})
# # Route to handle product reviews
@app.route('/reviews', methods=['POST'])
@jwt_required()
def add_review():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user['username']).first()

    data = request.get_json()
    new_review = Review(
        product_id=data['product_id'],
        rating=data['rating'],
        comment=data['comment'],
        reviewer_name=user.username,
        reviewer_email=user.email
    )
    db.session.add(new_review)
    db.session.commit()

    return jsonify({'message': 'Review added successfully'})




@app.route('/reviews/<int:product_id>', methods=['GET'])
def get_reviews_id(product_id):
    reviews = Review.query.filter_by(product_id=product_id).all()
    output = []

    for review in reviews:
        review_data = {
            'rating': review.rating,
            'comment': review.comment,
            'reviewer_name': review.reviewer_name,
            'date': review.date.strftime('%Y-%m-%d')  # Formatting date for better readability
        }
        output.append(review_data)

    return jsonify({'reviews': output})





# Route to get all reviews for a product
@app.route('/review', methods=['GET'])
def get_reviews():
    reviews = Review.query.all()
    output = []

    for review in reviews:
        review_data = {
            'id': review.id,
            'rating': review.rating,
            'comment': review.comment,
            'reviewer_name': review.reviewer_name,
            'reviewer_email': review.reviewer_email,
            'product_id': review.product_id,
            'date': review.date
        }
        output.append(review_data)

    return jsonify({'reviews': output})

#Delete a review 
@app.route('/delete_reviews', methods=['DELETE'])
def delete_reviews():
    data = request.get_json()
    review_ids = data.get('review_ids')
    if not review_ids:
        return jsonify({"message": "No review IDs provided"}), 400

    try:
        for review_id in review_ids:
            review = Review.query.get(review_id)
            if review:
                db.session.delete(review)
        db.session.commit()
        return jsonify({"message": "Reviews deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500
# Route for contact us form
@app.route('/contact', methods=['POST'])
def contact_us():
    data = request.get_json()
    new_contact = ContactUs(
        name=data['name'],
        email=data['email'],
       # subject=data['subject'],
        message=data['message']
    )
    db.session.add(new_contact)
    db.session.commit()

    return jsonify({'message': 'Your message has been received. We will get back to you shortly.'})

# Route to view all Contact Us submissions (Admin only)
@app.route('/admin/contacts', methods=['GET'])
# @jwt_required()
def view_contact_submissions():


    submissions = ContactUs.query.all()
    output = []

    for submission in submissions:
        submission_data = {
            'id': submission.id,
            'name': submission.name,
            'email': submission.email,
            'message': submission.message,
            'submittedAt': submission.submitted_at
        }
        output.append(submission_data)

    return jsonify({'submissions': output})


processed_message_ids = set()

@app.route('/admin/messages', methods=['GET'])
def view_messages():
    # Add authentication/authorization checks if needed
    # Query for messages excluding those already processed
    messages = ContactUs.query.filter(ContactUs.id.notin_(processed_message_ids)) \
        .order_by(ContactUs.submitted_at.desc()).limit(5).all()
    
    output = []
    for message in messages:
        message_data = {
            'id': message.id,
            'name': message.name,
            'email': message.email,
            'message': message.message,
            'submittedAt': message.submitted_at
        }
        output.append(message_data)
        # Mark this message as processed
        processed_message_ids.add(message.id)

    return jsonify({'messages': output})

@app.route('/admin/messages/<int:message_id>', methods=['DELETE'])
def delete_message(message_id):
    # Add authentication/authorization checks if needed
    message = ContactUs.query.get(message_id)
    if message:
        db.session.delete(message)
        db.session.commit()
        return jsonify({'message': 'Message deleted successfully'}), 200
    else:
        return jsonify({'error': 'Message not found'}), 404
    

@app.route('/admin/messages/delete', methods=['DELETE'])
def delete_multiple_messages():
    message_ids = request.json.get('ids')
    if not message_ids:
        return jsonify({'error': 'No message IDs provided'}), 400

    messages = ContactUs.query.filter(ContactUs.id.in_(message_ids)).all()
    if messages:
        for message in messages:
            db.session.delete(message)
        db.session.commit()
        return jsonify({'message': 'Messages deleted successfully'}), 200
    else:
        return jsonify({'error': 'No messages found'}), 404


@app.route('/products/category/<string:category>', methods=['GET'])
def get_products_by_category(category):
    products = Product.query.filter_by(category=category).all()
    output = []

    for product in products:
        product_data = {
            'id': product.id,
            'title': product.title,
            'description': product.description,
            'category': product.category,
            'price': product.price,
            'discountPercentage': product.discount_percentage,
            'rating': product.rating,
            'stock': product.stock,
            'tags': product.tags,
            'brand': product.brand,
            'sku': product.sku,
            'weight': product.weight,
            'dimensions': {
                'width': product.width,
                'height': product.height,
                'depth': product.depth
            },
            'warrantyInformation': product.warranty_information,
            'shippingInformation': product.shipping_information,
            'availabilityStatus': product.availability_status,
            'returnPolicy': product.return_policy,
            'minimumOrderQuantity': product.minimum_order_quantity,
            'createdAt': product.created_at,
            'images': product.images,
            'updatedAt': product.updated_at,
            'barcode': product.barcode,
            'qrCode': product.qr_code,
            'thumbnail': product.thumbnail
        }
        output.append(product_data)

    return jsonify({'products': output})
@jwt_required()
def some_function():
    current_user_id = get_jwt_identity()
    # Verify current_user_id is being used as expected
    print(current_user_id)



#Enable Flask application to run in debug mode
if __name__ == '__main__':
    app.run(debug=True)
