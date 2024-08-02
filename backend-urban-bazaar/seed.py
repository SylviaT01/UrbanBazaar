import json
import re
import logging
import random
from faker import Faker
from datetime import datetime
from app import db, create_app, bcrypt
from models import User, Product, Order, Category, Checkout, Contact, Role, Brand

def convert_price_to_float(price_str):
    numeric_part = re.sub(r'[^\d.,]', '', price_str).replace(',', '')
    return float(numeric_part)

with open('data.json', 'r') as file:
    data = json.load(file)    

for category, products in data.items():
    for product in products:
        product['price'] = convert_price_to_float(product['price'])

NUM_USERS = 10
NUM_ORDERS = 20
NUM_CONTACTS = 10        

def generate_fake_users(num_users):
    users = []
    for _ in range(num_users):
        name = fake.name()
        email = fake.email()
        password = bcrypt.generate_password_hash(fake.password()).decode('utf-8')
        user = User(name=name, email=email, password=password)
        users.append(user)
    return users

def generate_fake_orders(num_orders, users, products):
    orders = []
    for _ in range(num_orders):
        user = random.choice(users)
        product = random.choice(products)
        quantity = random.randint(1, 10)
        price = product.price
        total_price = product.price * quantity
        order_date = fake.date_time_between(start_date='-1y', end_date='now')
        order = Order(
            user_id=user.id,
            product_id=product.id,
            quantity=quantity,
            price=price,
            total_price=total_price,
            order_date=order_date
        )
        orders.append(order)
    return orders    

def generate_fake_contacts(num_contacts, users):
    contacts = []
    for _ in range(num_contacts):
        name = fake.name()
        email = fake.email()
        message = fake.text(max_nb_chars=200)
        user = random.choice(users)
        contact = Contact(name=name, email=email, message=message, user=user)
        contacts.append(contact)
    return contacts    