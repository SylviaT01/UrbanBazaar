from flask import Flask, jsonify
import requests
import json

app = Flask(__name__)

@app.route('/fetch-data', methods=['GET'])
def fetch_all_data():
    # Base URL for the Dummy JSON API
    base_url = 'https://dummyjson.com/products'
    
    all_products = []
    limit = 30  # The default limit per page
    skip = 0  # Start from the first page

    while True:
        # Construct the URL with pagination parameters
        url = f'{base_url}?limit={limit}&skip={skip}'
        
        # Send a GET request to the API
        response = requests.get(url)
        
        if response.status_code == 200:
            # Parse the JSON response
            data = response.json()
            products = data.get('products', [])
            
            # Convert prices to Ksh by multiplying by 100 and converting to integer
            for product in products:
                product['price'] = int(product['price'] * 100)
            
            # Add the fetched products to the list
            all_products.extend(products)
            
            # Break the loop if no more products are returned
            if len(products) < limit:
                break
            
            # Update the skip value to fetch the next set of products
            skip += limit
        else:
            return jsonify({"error": "Failed to fetch data"}), response.status_code
    
    # Write all products to a JSON file
    with open('data.json', 'w') as json_file:
        json.dump({"products": all_products}, json_file, indent=4)
    
    return jsonify({"message": "All data fetched, prices converted to integer Ksh, and saved to data.json"}), 200

if __name__ == '__main__':
    app.run(debug=True)
