from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
import json
from sqlalchemy.types import TypeDecorator, TEXT

db = SQLAlchemy()

#a function for images and tags array to jsontype
class JSONType(TypeDecorator):
    impl = TEXT

    def process_bind_param(self, value, dialect):
        if value is not None:
            return json.dumps(value)
        return value

    def process_result_value(self, value, dialect):
        if value is not None:
            return json.loads(value)
        return value

# User model to store user information
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    phone_number=db.Column(db.Integer, nullable=False)

    # Relationships to other models
    shopping_carts = db.relationship('ShoppingCart', backref='user', lazy=True)
    orders = db.relationship('Order', backref='user', lazy=True)
    wishlist = db.relationship('Wishlist', backref='user', lazy=True)

# Product model to store product information
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float, nullable=False)
    discount_percentage = db.Column(db.Float, nullable=True)
    rating = db.Column(db.Float, nullable=True)
    stock = db.Column(db.Integer, nullable=False)
    tags = db.Column(JSONType, nullable=True)  # Changed to JSONType
    brand = db.Column(db.String(50), nullable=False)
    sku = db.Column(db.String(100), nullable=False)
    weight = db.Column(db.Float, nullable=False)
    width = db.Column(db.Float, nullable=True)
    height = db.Column(db.Float, nullable=True)
    depth = db.Column(db.Float, nullable=True)
    warranty_information = db.Column(db.String(255), nullable=True)
    shipping_information = db.Column(db.String(255), nullable=True)
    availability_status = db.Column(db.String(50), nullable=False)
    return_policy = db.Column(db.String(255), nullable=True)
    minimum_order_quantity = db.Column(db.Integer, nullable=True)
    barcode = db.Column(db.String(50), nullable=True)
    qr_code = db.Column(db.String(255), nullable=True)
    images = db.Column(JSONType, nullable=True)  # Changed to JSONType
    thumbnail = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships to other models
    reviews = db.relationship('Review', backref='product', lazy=True)
    cart_items = db.relationship('ShoppingCart', backref='product', lazy=True)
    wishlist_items = db.relationship('Wishlist', backref='product', lazy=True)

# Review model to store product reviews
class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    reviewer_name = db.Column(db.String(100), nullable=False)
    reviewer_email = db.Column(db.String(100), nullable=False)

    # Foreign Key to link with Product
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    
# ShoppingCart model to store cart details for users
class ShoppingCart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
   
# Order model to store order details
class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    order_date = db.Column(db.DateTime, default=datetime.utcnow)
    shipping_address = db.Column(db.String(255), nullable=False)
    payment_method = db.Column(db.String(50), nullable=False)
    order_total = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), default='Pending')

    # Relationship to store order items
    order_items = db.relationship('OrderItem', backref='order', lazy=True)
# OrderItem model to store individual items within an order
class OrderItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)

# ShippingDetails model to store shipping information for orders
class ShippingDetails(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    street_address = db.Column(db.String(255), nullable=False)
    apartment_number = db.Column(db.String(100), nullable=True)
    city = db.Column(db.String(100), nullable=False)
    zip_code = db.Column(db.String(20), nullable=False)
    
# Wishlist model to store a user's wishlist and items
class Wishlist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)



# ContactUs model to store user queries and feedback
class ContactUs(db.Model):
    __tablename__ = 'contacts'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    message = db.Column(db.String(500), nullable=False)
    submitted_at = db.Column(db.DateTime, default=datetime.utcnow)


