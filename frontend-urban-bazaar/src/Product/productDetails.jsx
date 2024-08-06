import React from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = React.useState(null);

  React.useEffect(() => {
    fetch(`http://127.0.0.1:5000/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data.product))
      .catch(error => console.error('Error fetching product details:', error));
  }, [id]);

  if (!product) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <Swiper spaceBetween={30} navigation pagination={{ clickable: true }}>
            {product.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} alt={`Product ${index + 1}`} className="w-full h-auto object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="md:w-1/2">
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
