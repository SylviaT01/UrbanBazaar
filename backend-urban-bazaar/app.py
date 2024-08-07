from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from functools import wraps
from models import db, User, Product, ShoppingCart, Order, OrderItem, ShippingDetails, Wishlist, Review, ContactUs
from datetime import datetime
from flask_migrate import Migrate

app = Flask(__name__)

# Flask configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'  # Update as needed
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your_secret_key'  # Change this to a secure key

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)


# Helper function to check if a user is an admin
def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        current_user = get_jwt_identity()
        user = User.query.filter_by(username=current_user['username']).first()
        if not user.is_admin:
            return jsonify({'message': 'Admin access required'}), 403
        return fn(*args, **kwargs)
    return wrapper


# User registration route
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(
        username=data['username'],
        email=data['email'],
        password=hashed_password
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'})
# User login route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()

    if user and bcrypt.check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity={'username': user.username, 'is_admin': user.is_admin})
        return jsonify({'token': access_token})

    return jsonify({'message': 'Invalid credentials'}), 401

# Admin route to assign admin role
@app.route('/assign_admin/<int:user_id>', methods=['POST'])
@jwt_required()
@admin_required
def assign_admin(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    user.is_admin = True
    db.session.commit()
    return jsonify({'message': f'{user.username} is now an admin'})

# Admin route to create a new user
@app.route('/admin/create_user', methods=['POST'])
@jwt_required()
@admin_required
def create_user():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(
        username=data['username'],
        email=data['email'],
        password=hashed_password
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully by admin'})

# Route to view all users (Admin only)
@app.route('/admin/users', methods=['GET'])
# @jwt_required()
def view_users():
    # current_user = get_jwt_identity()
    # if not current_user['is_admin']:
    #     return jsonify({'message': 'Admin access required'}), 403

    users = User.query.all()
    output = []

    for user in users:
        user_data = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'is_admin': user.is_admin
        }
        output.append(user_data)

    return jsonify({'users': output})

# Route to delete a user (Admin only)
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


# Route to update user profile
@app.route('/profile', methods=['PATCH'])
@jwt_required()
def update_profile():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user['username']).first()

    data = request.get_json()

    if 'username' in data:
        user.username = data['username']
    if 'email' in data:
        user.email = data['email']
    if 'password' in data:
        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        user.password = hashed_password

    db.session.commit()

    return jsonify({'message': 'Profile updated successfully'})


# Product routes
@app.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
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
            'updatedAt': product.updated_at,
            'barcode': product.barcode,
            'qrCode': product.qr_code,
            'images': product.images,
            'thumbnail': product.thumbnail,
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


#Implements POST /products route to allow admins to add new products to the database
@app.route('/products', methods=['POST'])
@jwt_required()
def add_product():
    current_user = get_jwt_identity()
    if not current_user['is_admin']:
        return jsonify({'message': 'Permission denied'}), 403

    data = request.get_json()
    new_product = Product(
        title=data['title'],
        description=data['description'],
        category=data['category'],
        price=data['price'],
        discount_percentage=data['discountPercentage'],
        rating=data['rating'],
        stock=data['stock'],
        tags=data['tags'],
        brand=data['brand'],
        sku=data['sku'],
        weight=data['weight'],
        width=data['dimensions']['width'],
        height=data['dimensions']['height'],
        depth=data['dimensions']['depth'],
        warranty_information=data['warrantyInformation'],
        shipping_information=data['shippingInformation'],
        availability_status=data['availabilityStatus'],
        return_policy=data['returnPolicy'],
        minimum_order_quantity=data['minimumOrderQuantity'],
        barcode=data['barcode'],
        qr_code=data['qrCode'],
        images=data['images'],
        thumbnail=data['thumbnail']
    )
    db.session.add(new_product)
    db.session.commit()

    return jsonify({'message': 'Product created successfully'})

# PATCH route to partially update a product
@app.route('/products/<int:id>', methods=['PATCH'])
@jwt_required()
def partial_update_product(id):
    current_user = get_jwt_identity()
    if not current_user['is_admin']:
        return jsonify({'message': 'Permission denied'}), 403

    product = Product.query.get(id)
    if not product:
        return jsonify({'message': 'Product not found'}), 404

    data = request.get_json()

    if 'title' in data:
        product.title = data['title']
    if 'description' in data:
        product.description = data['description']
    if 'category' in data:
        product.category = data['category']
    if 'price' in data:
        product.price = data['price']
    if 'discountPercentage' in data:
        product.discount_percentage = data['discountPercentage']
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
    if 'availabilityStatus' in data:
        product.availability_status = data['availabilityStatus']
    if 'returnPolicy' in data:
        product.return_policy = data['returnPolicy']
    if 'minimumOrderQuantity' in data:
        product.minimum_order_quantity = data['minimumOrderQuantity']
    if 'barcode' in data:
        product.barcode = data['barcode']
    if 'qrCode' in data:
        product.qr_code = data['qrCode']
    if 'images' in data:
        product.images = data['images']
    if 'thumbnail' in data:
        product.thumbnail = data['thumbnail']

    db.session.commit()

    return jsonify({'message': 'Product partially updated successfully'})

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

# Route to add a product to the shopping cart
@app.route('/cart', methods=['POST'])
# @jwt_required()
def add_to_cart():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user['username']).first()

    data = request.get_json()
    shopping_cart = ShoppingCart.query.filter_by(user_id=user.id).first()

    if not shopping_cart:
        shopping_cart = ShoppingCart(user_id=user.id, product_id=data['product_id'], quantity=data['quantity'], price=data['price'])
        db.session.add(shopping_cart)
    else:
        shopping_cart.quantity += data['quantity']  # Update quantity if item is already in the cart
        shopping_cart.price += data['price'] * data['quantity']

    db.session.commit()

    return jsonify({'message': 'Product added to cart successfully'})

# Route to view items in the shopping cart
@app.route('/cart', methods=['GET'])
# @jwt_required()
def view_cart():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user['username']).first()

    cart_items = ShoppingCart.query.filter_by(user_id=user.id).all()
    output = []

    for item in cart_items:
        product = Product.query.get(item.product_id)
        product_data = {
            'id': product.id,
            'title': product.title,
            'quantity': item.quantity,
            'price': item.price,
            'thumbnail': product.thumbnail
        }
        output.append(product_data)

    return jsonify({'cart': output})
# Route to remove a product from the shopping cart
@app.route('/cart/<int:product_id>', methods=['DELETE'])
@jwt_required()
def remove_from_cart(product_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user['username']).first()

    cart_item = ShoppingCart.query.filter_by(user_id=user.id, product_id=product_id).first()
    if not cart_item:
        return jsonify({'message': 'Product not found in cart'}), 404

    db.session.delete(cart_item)
    db.session.commit()

    return jsonify({'message': 'Product removed from cart successfully'})

# Route to view all orders (Admin only)
@app.route('/admin/orders', methods=['GET'])
# @jwt_required()
# @admin_required
def get_all_orders():
    orders = Order.query.join(User, Order.user_id == User.id).all()
    output = []

    for order in orders:
        order_data = {
            'id': order.id,
            'user_id': order.user_id,
            'user_email': order.user.email,  # Include the user's email
            'shipping_address': order.shipping_address,
            'payment_method': order.payment_method,
            'order_total': order.order_total,
            'created_at': order.order_date,
            'status': order.status
        }
        output.append(order_data)

    return jsonify({'orders': output})

# Route to create an order from the shopping cart
@app.route('/orders', methods=['POST'])
@jwt_required()
def create_order():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user['username']).first()

    data = request.get_json()
    new_order = Order(
        user_id=user.id,
        shipping_address=data['shipping_address'],
        payment_method=data['payment_method'],
        order_total=data['order_total']
    )
    db.session.add(new_order)
    db.session.commit()
    
    # Move items from cart to order
    cart_items = ShoppingCart.query.filter_by(user_id=user.id).all()

    for item in cart_items:
        new_order_item = OrderItem(
            order_id=new_order.id,
            product_id=item.product_id,
            quantity=item.quantity,
            price=item.price
        )
        db.session.add(new_order_item)
        db.session.delete(item)  # Remove item from cart after adding to order

    db.session.commit()

    return jsonify({'message': 'Order created successfully'})

@app.route('/order', methods=['GET'])
def get_orders():
    orders = Order.query.all()
    orders_data = [
        {
            'id': order.id,
            'user_id': order.user_id,
            'order_date': order.order_date,
            'shipping_address': order.shipping_address,
            'payment_method': order.payment_method,
            'order_total': order.order_total,
            'status': order.status
        }
        for order in orders
    ]
    return jsonify(orders_data)    

# Route to add product to wishlist
@app.route('/wishlist', methods=['POST'])
@jwt_required()
def add_to_wishlist():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user['username']).first()

    data = request.get_json()
    wishlist = Wishlist.query.filter_by(user_id=user.id).first()

    if not wishlist:
        wishlist = Wishlist(user_id=user.id, product_id=data['product_id'])
        db.session.add(wishlist)
    else:
        wishlist.product_id = data['product_id']

    db.session.commit()

    return jsonify({'message': 'Product added to wishlist successfully'})

# Route to view wishlist
@app.route('/wishlist', methods=['GET'])
@jwt_required()
def view_wishlist():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user['username']).first()

    wishlist_items = Wishlist.query.filter_by(user_id=user.id).all()
    output = []

    for item in wishlist_items:
        product = Product.query.get(item.product_id)
        product_data = {
            'id': product.id,
            'title': product.title,
            'description': product.description,
            'price': product.price,
            'thumbnail': product.thumbnail
        }
        output.append(product_data)

    return jsonify({'wishlist': output})
# Route to remove product from wishlist
@app.route('/wishlist/<int:product_id>', methods=['DELETE'])
@jwt_required()
def remove_from_wishlist(product_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user['username']).first()

    wishlist_item = Wishlist.query.filter_by(user_id=user.id, product_id=product_id).first()
    if not wishlist_item:
        return jsonify({'message': 'Product not found in wishlist'}), 404

    db.session.delete(wishlist_item)
    db.session.commit()

    return jsonify({'message': 'Product removed from wishlist successfully'})

# Route to handle product reviews
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


# Route to get all reviews for a product
@app.route('/reviews/<int:product_id>', methods=['GET'])
def get_reviews(product_id):
    reviews = Review.query.filter_by(product_id=product_id).all()
    output = []

    for review in reviews:
        review_data = {
            'rating': review.rating,
            'comment': review.comment,
            'reviewer_name': review.reviewer_name,
            'date': review.date
        }
        output.append(review_data)

    return jsonify({'reviews': output})

#Delete a review 
@app.route('/reviews/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_review(id):
    current_user = get_jwt_identity()
    review = Review.query.get(id)
    
    if not review:
        return jsonify({'message': 'Review not found'}), 404

    if current_user['id'] != review.user_id and not current_user['is_admin']:
        return jsonify({'message': 'Permission denied'}), 403

    db.session.delete(review)
    db.session.commit()

    return jsonify({'message': 'Review deleted successfully'})

# Route for contact us form
@app.route('/contact', methods=['POST'])
def contact_us():
    data = request.get_json()
    new_contact = ContactUs(
        name=data['name'],
        email=data['email'],
        subject=data['subject'],
        message=data['message']
    )
    db.session.add(new_contact)
    db.session.commit()

    return jsonify({'message': 'Your message has been received. We will get back to you shortly.'})

# Route to view all Contact Us submissions (Admin only)
@app.route('/admin/contact_us', methods=['GET'])
@jwt_required()
def view_contact_submissions():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user['username']).first()
    
    if not user.is_admin:
        return jsonify({'message': 'Admin access required'}), 403

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
            'updatedAt': product.updated_at,
            'barcode': product.barcode,
            'qrCode': product.qr_code,
            'images': product.images,
            'thumbnail': product.thumbnail
        }
        output.append(product_data)

    return jsonify({'products': output})



#Enable Flask application to run in debug mode
if __name__ == '__main__':
    app.run(debug=True)
