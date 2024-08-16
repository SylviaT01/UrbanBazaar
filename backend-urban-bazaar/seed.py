
import json
from models import db, User, Product, ShoppingCart, Order, OrderItem, ShippingDetails, Wishlist, Review, ContactUs, PaymentMethod
from app import app
from faker import Faker
from flask_bcrypt import Bcrypt

fake = Faker()
bcrypt = Bcrypt(app)  # Initialize Bcrypt with your Flask app

def load_products():
    with open('data/data.json') as file:
        data = json.load(file)
    return data['products']  # Access the 'products' array from the JSON

def seed_users():
    db.session.query(User).delete()  # Clear existing users

    # Create a specific admin user
    admin_user = User(
        username='admin',  # Predefined username for admin
        email='admin@example.com',  # Predefined email for admin
        password=bcrypt.generate_password_hash('admin_password').decode('utf-8'),  # Hashed password
        is_admin=True,
        phone_number=fake.phone_number()
    )
    db.session.add(admin_user)

    # Create other random users
    for _ in range(19):
        user = User(
            username=fake.user_name(),
            email=fake.email(),
            password=bcrypt.generate_password_hash(fake.password()).decode('utf-8'),  # Hashed password
            is_admin=fake.boolean(),
            phone_number=fake.phone_number()
        )
        db.session.add(user)

    db.session.commit()

def seed_products():
    db.session.query(Product).delete() 
    db.session.query(Review).delete()  # Clear existing products
    products = load_products()
    for product in products:
        db_product = Product(
            title=product['title'],
            description=product['description'],
            category=product['category'],
            price=product['price'],
            discount_percentage=product.get('discountPercentage', None),
            rating=product.get('rating', None),
            stock=product.get('stock', 0),
            tags=product.get('tags', []),
            brand=product.get('brand', 'Unknown Brand'),  # Set default value for brand
            sku=product.get('sku', None),
            weight=product.get('weight', 0.0),
            width=product.get('dimensions', {}).get('width', 0.0),
            height=product.get('dimensions', {}).get('height', 0.0),
            depth=product.get('dimensions', {}).get('depth', 0.0),
            warranty_information=product.get('warrantyInformation', None),
            shipping_information=product.get('shippingInformation', None),
            availability_status=product.get('availabilityStatus', 'In Stock'),
            return_policy=product.get('returnPolicy', None),
            minimum_order_quantity=product.get('minimumOrderQuantity', 1),
            barcode=product.get('meta', {}).get('barcode', None),
            qr_code=product.get('meta', {}).get('qrCode', None),
            images=product.get('images', []),
            thumbnail=product.get('thumbnail', None)
        )
        db.session.add(db_product)
        db.session.flush()  # Flush to get the product ID for reviews

        # Add reviews for this product if available
        if 'reviews' in product:
            for review in product['reviews']:
                db_review = Review(
                    product_id=db_product.id,
                    rating=review['rating'],
                    comment=review['comment'],
                    reviewer_name=review['reviewerName'],
                    reviewer_email=review['reviewerEmail']
                )
                db.session.add(db_review)
    db.session.commit()

def seed_shipping_details():
    db.session.query(ShippingDetails).delete()  # Clear existing ShippingDetails entries
    user_ids = [user.id for user in User.query.all()]
    for _ in range(20):
        shipping_detail = ShippingDetails(
            user_id=fake.random_element(user_ids),
            name=fake.name(),
            street_address=fake.address(),
            apartment_number=fake.random_int(min=1, max=200),
            city=fake.city(),
            zip_code=fake.zipcode(),
        )
        db.session.add(shipping_detail)
    db.session.commit()

def seed_payment_methods():
    db.session.query(PaymentMethod).delete()  # Clear existing PaymentMethod entries
    user_ids = [user.id for user in User.query.all()]
    for _ in range(20):
        payment_method = PaymentMethod(
            user_id=fake.random_element(user_ids),
            email=fake.email()
       
  
        )
        db.session.add(payment_method)
    db.session.commit()

def seed_contacts():
    db.session.query(ContactUs).delete()  # Clear existing ContactUs entries
    for _ in range(20):
        contact = ContactUs(
            name=fake.name(),
            email=fake.email(),
            message=fake.text(),
        )
        db.session.add(contact)
    db.session.commit()

def seed_other_tables():
    # Clear existing entries
    db.session.query(ShoppingCart).delete()  
    db.session.query(Order).delete()  
    db.session.query(OrderItem).delete()  
    db.session.query(Wishlist).delete()  
    
    # Fetch existing IDs
    user_ids = [user.id for user in User.query.all()]
    product_ids = [product.id for product in Product.query.all()]
    shipping_ids = [shipping.id for shipping in ShippingDetails.query.all()]
    payment_ids = [payment.id for payment in PaymentMethod.query.all()]

    print(f"User IDs: {user_ids}")
    print(f"Product IDs: {product_ids}")
    print(f"Shipping IDs: {shipping_ids}")
    print(f"Payment IDs: {payment_ids}")

    if not user_ids or not product_ids or not shipping_ids or not payment_ids:
        print("Not enough data to seed. Ensure users, products, shipping details, and payment methods are seeded first.")
        return

    # Seed ShoppingCart
    for _ in range(20):
        user_id = fake.random_element(user_ids)
        product_id = fake.random_element(product_ids)
        
        cart = ShoppingCart(
            user_id=user_id,
            product_id=product_id,
            quantity=fake.random_int(min=1, max=5),
            price=fake.pyfloat(left_digits=2, right_digits=2, positive=True),
            total_price=fake.pyfloat(left_digits=2, right_digits=2, positive=True),  # Make sure total_price is added
            status="unprocessed"
        )
        db.session.add(cart)

    # Seed Orders and OrderItems
    for _ in range(20):
        user_id = fake.random_element(user_ids)
        shipping_id = fake.random_element(shipping_ids)
        payment_id = fake.random_element(payment_ids)
        order_total = fake.pyfloat(left_digits=3, right_digits=2, positive=True)

        order = Order(
            user_id=user_id,
            shipping_id=shipping_id,
            payment_id=payment_id,
            order_total=order_total
        )
        db.session.add(order)
        db.session.flush()  # Ensure the order is committed so we get an ID

        for _ in range(fake.random_int(min=1, max=5)):
            db.session.add(OrderItem(
                order_id=order.id,
                product_id=fake.random_element(product_ids),
                quantity=fake.random_int(min=1, max=5),
                price=fake.pyfloat(left_digits=2, right_digits=2, positive=True)
            ))

    # Seed Wishlist
    for _ in range(20):
        db.session.add(Wishlist(
            user_id=fake.random_element(user_ids),
            product_id=fake.random_element(product_ids),
        ))

    # Commit all changes
    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Ensure tables are created
        seed_users()
        seed_products()
        seed_shipping_details()
        seed_payment_methods()  # Ensure PaymentMethods are seeded
        seed_contacts()
        seed_other_tables()
        print("Database seeded successfully.")
