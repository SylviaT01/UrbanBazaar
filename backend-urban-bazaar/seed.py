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