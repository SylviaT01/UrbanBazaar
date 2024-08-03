from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, Product, ShoppingCart, Order, OrderItem, ShippingDetails, Wishlist, Review, ContactUs
from datetime import datetime
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from functools import wraps


app = Flask(__name__)

# User registration route (admin can create users)
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

# Route to add a product to the shopping cart
@app.route('/cart', methods=['POST'])
@jwt_required()
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
@jwt_required()
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

# Route for users to contact admin
@app.route('/contact', methods=['POST'])
def contact_us():
    data = request.get_json()
    new_contact = ContactUs(
        name=data['name'],
        email=data['email'],
        message=data['message'],
        date=datetime.utcnow()
    )
    db.session.add(new_contact)
    db.session.commit()

    return jsonify({'message': 'Message sent successfully'})

if __name__ == '__main__':
    app.run(debug=True)
