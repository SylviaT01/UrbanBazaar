import React, { useState, useEffect } from 'react';

const TopPicks = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/products')
      .then(response => response.json())
      .then(data => {
        console.log('API response:', data);

        // Access products from the response
        const products = data.products;

        // Check if products is an array and filter
        if (Array.isArray(products)) {
          const filteredProducts = products.filter(product => product.rating > 4.8);
          setTopProducts(filteredProducts);
        } else {
          setError('Expected an array of products under "products" key');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError('Error fetching products: ' + error.message);
        setLoading(false);
      });
  }, []);

  console.log(topProducts);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Top Picks</h2>
      <ul>
        {topProducts.map(product => (
          <li key={product.id}>
            {product.title} - Rating: {product.rating}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopPicks;
