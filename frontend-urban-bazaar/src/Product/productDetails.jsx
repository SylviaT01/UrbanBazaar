import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = React.useState(null);
  const [selectedImage, setSelectedImage] = React.useState('');

  React.useEffect(() => {
    fetch(`http://127.0.0.1:5000/products/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data.product);
        // Set the first image as the default selected image
        if (data.product.images.length > 0) {
          setSelectedImage(data.product.images[0]);
        }
      })
      .catch(error => console.error('Error fetching product details:', error));
  }, [id]);

  if (!product) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-row gap-8">
        {/* Thumbnail images */}
        <div className="w-1/8 flex flex-col space-y-4">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product Thumbnail ${index + 1}`}
              className={`w-10 h-10 object-cover cursor-pointer rounded-lg shadow-md ${selectedImage === image ? 'border-2 border-blue-500' : ''}`}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
        
        {/* Main product image */}
        <div className="flex-1">
          <img
            src={selectedImage}
            alt="Main Product"
            className="w-50 h-50 image-cover rounded-lg shadow-md"
          />
        </div>

        {/* Product details */}
        <div className="w-1/2 flex flex-col space-y-4">
          <h1 className="text-3xl font-semibold mb-4">{product.title}</h1>
          <p className="text-lg text-gray-700 mb-2">Ksh. {Math.round((product.price * (100 - product.discountPercentage)) / 100)}</p>
          <p className="text-lg text-gray-500 line-through mb-4">Ksh. {product.price}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
