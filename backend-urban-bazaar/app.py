from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
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
@jwt_required()
def view_users():
    current_user = get_jwt_identity()
    if not current_user['is_admin']:
        return jsonify({'message': 'Admin access required'}), 403

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
            'thumbnail': product.thumbnail
        }
        output.append(product_data)

    return jsonify({'products': output})