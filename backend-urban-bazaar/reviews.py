import json

# Define the path to your JSON file
file_path = 'data/data.json'

def add_ids_to_reviews():
    # Read the existing data from the file
    with open(file_path, 'r') as file:
        data = json.load(file)

    # Check if 'products' key exists and is a list
    if 'products' in data and isinstance(data['products'], list):
        # Initialize a set to keep track of used IDs
        used_ids = set()
        next_id = 1
        
        for product in data['products']:
            # Check if 'reviews' key exists and is a list within each product
            if 'reviews' in product and isinstance(product['reviews'], list):
                for review in product['reviews']:
                    # Ensure unique ID
                    while next_id in used_ids:
                        next_id += 1
                    review['id'] = next_id
                    used_ids.add(next_id)
                    next_id += 1
            else:
                print(f"No 'reviews' key found or 'reviews' is not a list in product ID {product.get('id')}.")
    else:
        print("No 'products' key found or 'products' is not a list.")
        return

    # Write the updated data back to the file
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=4)

    print("Unique IDs have been added to the reviews and saved to the file.")

# Call the function to update the JSON file
add_ids_to_reviews()
