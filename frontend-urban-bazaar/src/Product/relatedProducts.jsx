import React from 'react';
import { Link } from 'react-router-dom';

const RelatedProducts = ({ relatedProducts }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">You May Also Like This</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0 bg-blue-50 z-100 px-4 py-4 mb-0">
        {relatedProducts.map((product) => (
          <div
            key={product.id}
            className="border p-4 flex flex-col justify-between shadow-xl rounded-lg overflow-hidden bg-white aos-init"
          >
            <div className="flex-grow border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
              <div className="w-full h-full flex justify-center items-center">
                <div className="w-[200px] mx-auto flex justify-center items-center">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="max-h-[300px] object-cover"
                  />
                </div>
              </div>
            </div>
            <h3 className="font-medium text-sm mb-1">{product.title}</h3>
            <p className="text-gray-700 mb-2">
              Ksh. {Math.round((product.price * (100 - product.discountPercentage)) / 100)}
            </p>
            <p className="text-gray-700 mb-2 line-through">Ksh. {product.price}</p>
            <div className="flex items-center space-x-6">
              <button className="bg-slate-200 text-gray-600 text-sm px-2 py-2 rounded-md">Add to Cart</button>
              <Link
                to={`/products/${product.id}`}
                className="bg-slate-200 text-gray-600 text-sm px-2 py-2 rounded-md"
              >
                View Product
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
