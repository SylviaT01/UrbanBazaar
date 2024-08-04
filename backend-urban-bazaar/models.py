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


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    orders = db.relationship('Order', back_populates='user', cascade='all, delete-orphan')
    addresses = db.relationship('Address', back_populates='user')
    products = association_proxy('orders', 'product', creator=lambda product_obj: Order(product=product_obj))
    contacts = relationship('Contact', back_populates='user')


class Product(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(255))
    image_url = db.Column(db.String(255))
    price = db.Column(db.Integer, nullable=False)
    category_name = db.Column(db.String(120), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    category = db.relationship('Category', back_populates='products')
    tags = db.relationship('Tags')
    orders = db.relationship('Order', back_populates='product', cascade='all, delete-orphan')
    users = association_proxy('orders', 'user', creator=lambda user_obj: Order(user=user_obj))

class Order(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Integer, nullable=False)
    order_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    status = db.Column(db.String(20), nullable=False, default="unprocessed")  # New column
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    user = db.relationship('User', back_populates='orders')
    product = db.relationship('Product', back_populates='orders')

class checkout(db.Model):
    __tablename__ = 'addresses'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    phone_number = db.Column(db.Integer, nullable=False)
    city = db.Column(db.String(120), nullable=False)
    street_address = db.Column(db.String(120), nullable=False)
    apartment= db.Column(db.String(120), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', back_populates='addresses') 

class Contact(db.Model):
    __tablename__ = 'contacts'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    message = db.Column(db.String(500), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', back_populates='contacts')


