# import json
# from faker import Faker
# from models import db, User, Product, ShoppingCart, Order, OrderItem, ShippingDetails, Wishlist, Review, ContactUs
# from app import app

# fake = Faker()

# def load_products():
#     with open('data/data.json') as file:
#         data = json.load(file)
#     return data['products']  # Access the 'products' array from the JSON

# def seed_users():
#     db.session.query(User).delete()  # Clear existing users
#     for _ in range(20):
#         user = User(
#             username=fake.user_name(),
#             email=fake.email(),
#             password=fake.password(),
#             is_admin=fake.boolean()
#         )
#         db.session.add(user)
#     db.session.commit()

# def seed_products():
#     db.session.query(Product).delete()  # Clear existing products
#     products = load_products()
#     for product in products:
#         db.session.add(Product(
#             title=product['title'],
#             description=product['description'],
#             category=product['category'],
#             price=product['price'],
#             discount_percentage=product.get('discountPercentage', fake.pyfloat()),
#             rating=product.get('rating', fake.pyfloat()),
#             stock=product.get('stock', fake.random_int(min=1, max=100)),
#             tags=product.get('tags', []),
#             brand=product.get('brand', fake.company()),
#             sku=product['sku'],
#             weight=product.get('weight', fake.pyfloat()),
#             width=product['dimensions']['width'],
#             height=product['dimensions']['height'],
#             depth=product['dimensions']['depth'],
#             warranty_information=product.get('warrantyInformation', fake.sentence()),
#             shipping_information=product.get('shippingInformation', fake.sentence()),
#             availability_status=product['availabilityStatus'],
#             return_policy=product.get('returnPolicy', fake.sentence()),
#             minimum_order_quantity=product.get('minimumOrderQuantity', fake.random_int(min=1, max=10)),
#             barcode=product['meta'].get('barcode', fake.ean13()),
#             qr_code=product['meta'].get('qrCode', fake.uuid4()),
#             images=product.get('images', []),
#             thumbnail=product.get('thumbnail', fake.image_url()),
#         ))
#     db.session.commit()

# def seed_other_tables():
#     db.session.query(ShoppingCart).delete()  # Clear existing ShoppingCart entries
#     db.session.query(Order).delete()  # Clear existing Orders
#     db.session.query(OrderItem).delete()  # Clear existing OrderItems
#     db.session.query(Review).delete()  # Clear existing Reviews
#     db.session.query(Wishlist).delete()  # Clear existing Wishlists
#     db.session.query(ContactUs).delete()  # Clear existing ContactUs entries
    
#     user_ids = [user.id for user in User.query.all()]
#     product_ids = [product.id for product in Product.query.all()]

#     for _ in range(20):
#         user_id = fake.random_element(user_ids)
#         product_id = fake.random_element(product_ids)
        
#         cart = ShoppingCart(
#             user_id=user_id,
#             product_id=product_id,
#             quantity=fake.random_int(min=1, max=5),
#             price=fake.pyfloat(left_digits=2, right_digits=2, positive=True)
#         )
#         db.session.add(cart)

#     for _ in range(20):
#         user_id = fake.random_element(user_ids)
#         order = Order(
#             user_id=user_id,
#             shipping_address=fake.address(),
#             payment_method=fake.credit_card_provider(),
#             order_total=fake.pyfloat(left_digits=3, right_digits=2, positive=True)
#         )
#         db.session.add(order)
#         db.session.flush()  # Ensure the order is committed so we get an ID

#         for _ in range(fake.random_int(min=1, max=5)):
#             db.session.add(OrderItem(
#                 order_id=order.id,
#                 product_id=fake.random_element(product_ids),
#                 quantity=fake.random_int(min=1, max=5),
#                 price=fake.pyfloat(left_digits=2, right_digits=2, positive=True)
#             ))

#     for _ in range(20):
#         db.session.add(Review(
#             product_id=fake.random_element(product_ids),
#             rating=fake.random_int(min=1, max=5),
#             comment=fake.text(),
#             reviewer_name=fake.name(),
#             reviewer_email=fake.email()
#         ))

#     for _ in range(20):
#         db.session.add(Wishlist(
#             user_id=fake.random_element(user_ids),
#             product_id=fake.random_element(product_ids)
#         ))

#     for _ in range(20):
#         db.session.add(ContactUs(
#             name=fake.name(),
#             email=fake.email(),
#             message=fake.text()
#         ))

#     db.session.commit()

# if __name__ == '__main__':
#     with app.app_context():
#         db.create_all()  # Ensure tables are created
#         seed_users()
#         seed_products()
#         seed_other_tables()
#         print("Database seeded successfully.")
import json
from faker import Faker
from models import db, User, Product, ShoppingCart, Order, OrderItem, ShippingDetails, Wishlist, Review, ContactUs
from app import app

fake = Faker()

def load_products():
    with open('data/data.json') as file:
        data = json.load(file)
    return data['products']  # Access the 'products' array from the JSON

def seed_users():
    db.session.query(User).delete()  # Clear existing users
    for _ in range(20):
        user = User(
            username=fake.user_name(),
            email=fake.email(),
            password=fake.password(),
            is_admin=fake.boolean()
        )
        db.session.add(user)
    db.session.commit()

def seed_products():
    db.session.query(Product).delete()  # Clear existing products
    products = load_products()
    for product in products:
        db.session.add(Product(
            title=product['title'],
            description=product['description'],
            category=product['category'],
            price=product['price'],
            discount_percentage=product.get('discountPercentage', fake.pyfloat()),
            rating=product.get('rating', fake.pyfloat()),
            stock=product.get('stock', fake.random_int(min=1, max=100)),
            tags=product.get('tags', []),
            brand=product.get('brand', fake.company()),  # Use .get() with a default value
            sku=product.get('sku', fake.uuid4()),
            weight=product.get('weight', fake.pyfloat()),
            width=product.get('dimensions', {}).get('width', fake.pyfloat()),
            height=product.get('dimensions', {}).get('height', fake.pyfloat()),
            depth=product.get('dimensions', {}).get('depth', fake.pyfloat()),
            warranty_information=product.get('warrantyInformation', fake.sentence()),
            shipping_information=product.get('shippingInformation', fake.sentence()),
            availability_status=product.get('availabilityStatus', 'In Stock'),
            return_policy=product.get('returnPolicy', fake.sentence()),
            minimum_order_quantity=product.get('minimumOrderQuantity', fake.random_int(min=1, max=10)),
            barcode=product.get('meta', {}).get('barcode', fake.ean13()),
            qr_code=product.get('meta', {}).get('qrCode', fake.uuid4()),
            images=product.get('images', []),
            thumbnail=product.get('thumbnail', fake.image_url()),
        ))
    db.session.commit()

def seed_shipping_details():
    db.session.query(ShippingDetails).delete()  # Clear existing ShippingDetails entries
    for _ in range(20):
        shipping_detail = ShippingDetails(
            order_id=fake.random_int(min=1, max=20),  # Adjust as per your Order seeding logic
            street_address=fake.address(),
            city=fake.city(),
            zip_code=fake.zipcode(),
            name=fake.name(),
            apartment_number=fake.random_int(min=1, max=200),
            
        )
        db.session.add(shipping_detail)
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
    db.session.query(ShoppingCart).delete()  # Clear existing ShoppingCart entries
    db.session.query(Order).delete()  # Clear existing Orders
    db.session.query(OrderItem).delete()  # Clear existing OrderItems
    db.session.query(Review).delete()  # Clear existing Reviews
    db.session.query(Wishlist).delete()  # Clear existing Wishlists
     # Clear existing ContactUs entries
    
    user_ids = [user.id for user in User.query.all()]
    product_ids = [product.id for product in Product.query.all()]

    for _ in range(20):
        user_id = fake.random_element(user_ids)
        product_id = fake.random_element(product_ids)
        
        cart = ShoppingCart(
            user_id=user_id,
            product_id=product_id,
            quantity=fake.random_int(min=1, max=5),
            price=fake.pyfloat(left_digits=2, right_digits=2, positive=True)
        )
        db.session.add(cart)

    for _ in range(20):
        user_id = fake.random_element(user_ids)
        order = Order(
            user_id=user_id,
            shipping_address=fake.address(),
            payment_method=fake.credit_card_provider(),
            order_total=fake.pyfloat(left_digits=3, right_digits=2, positive=True)
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

    for _ in range(20):
        db.session.add(Review(
            product_id=fake.random_element(product_ids),
            rating=fake.random_int(min=1, max=5),
            comment=fake.text(),
            reviewer_name=fake.name(),
            reviewer_email=fake.email()
        ))

    for _ in range(20):
        db.session.add(Wishlist(
            user_id=fake.random_element(user_ids),
            product_id=fake.random_element(product_ids)
        ))

    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Ensure tables are created
        seed_users()
        seed_products()
        seed_shipping_details()
        seed_contacts()
        seed_other_tables()
        print("Database seeded successfully.")
