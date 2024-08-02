from app import db
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import relationship
from datetime import datetime

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

class Category(db.Model):
    __tablename__ = 'categories'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    products = db.relationship('Product', back_populates='category')

class Brand (db.Model):
    __tablename__ = 'brands'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    products = db.relationship('Product', back_populates='brand')

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
