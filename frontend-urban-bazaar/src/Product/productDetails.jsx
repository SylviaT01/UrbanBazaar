// import React from 'react';
// import { Link } from "react-router-dom";
// import { useParams } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart } from '@fortawesome/free-solid-svg-icons';
// import RelatedProducts from './relatedProducts';
// import TopPicksFour from './top-picksfour';

// const ProductDetailPage = () => {
//   const { id } = useParams();
//   const [product, setProduct] = React.useState(null);
//   const [selectedImage, setSelectedImage] = React.useState('');
//   const [relatedProducts, setRelatedProducts] = React.useState([]);

//   React.useEffect(() => {
//     fetch(`http://127.0.0.1:5000/products/${id}`)
//       .then(response => response.json())
//       .then(data => {
//         setProduct(data.product);

//         // Set the first image as the default selected image
//         if (data.product.images.length > 0) {
//           setSelectedImage(data.product.images[0]);
//         }
//         // Fetch related products
//         fetch(`http://127.0.0.1:5000/products/category/${data.product.category}`)
//           .then(response => response.json())
//           .then(relatedData => {
//             setRelatedProducts(relatedData.products.filter(p => p.id !== data.product.id));
//           });
//       })
//       .catch(error => console.error('Error fetching product details:', error));
//   }, [id]);
// console.log(product)

//   if (!product) return <div className="text-center py-8">Loading...</div>;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex flex-row gap-8">
//         {/* Thumbnail images */}
//         <div className="w-1/8 flex flex-col space-y-4">
//           {product.images.map((image, index) => (
//             <img
//               key={index}
//               src={image}
//               alt={`Product Thumbnail ${index + 1}`}
//               className={`w-10 h-10 object-cover cursor-pointer rounded-lg shadow-md ${selectedImage === image ? 'border-2 border-blue-500' : ''}`}
//               onClick={() => setSelectedImage(image)}
//             />
//           ))}
//         </div>

//         {/* Main product image */}
//         <div className="flex-1">
//           <img
//             src={selectedImage}
//             alt="Main Product"
//             className="w-50 h-50 image-cover rounded-lg shadow-md"
//           />
//         </div>

//         {/* Product details */}
//         <div className="w-1/2 flex flex-col">
//           <h1 className="text-3xl font-medium mb-2">Name: {product.title}</h1>
//           <h2 className="text-2xl font-normal mb-2 capitalize">Category: {product.category}</h2>
//           <h2 className="text-2xl font-normal mb-4 capitalize">Brand: {product.brand}</h2>
//           <p className="text-lg text-gray-700 mb-2">Ksh. {Math.round((product.price * (100 - product.discountPercentage)) / 100)}</p>
//           <p className="text-lg text-gray-500 line-through mb-4">Ksh. {product.price}</p>
//           <p className="text-gray-600 mb-6">{product.description}</p>
//           <div className="flex space-x-4">
//             <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add to Cart</button>
//             <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 flex items-center">
//               <FontAwesomeIcon icon={faHeart} className="mr-2" />
//               Add to Wishlist
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Related Products */}
//       <RelatedProducts relatedProducts={relatedProducts} />
//       <div className="4-items">
//         <h1 className="mb-2 flex justify-center text-xl font-semibold">Top picks</h1>
//         <TopPicksFour />
//       </div>
//       <div className="flex justify-center py-4">
//         <Link
//           to="/toppicks"
//           className="bg-blue-300 text-gray-600 text-sm px-2 py-2 rounded-md "
//         >
//           View Top Picks
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ProductDetailPage;


import React from 'react';
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import RelatedProducts from './relatedProducts';
import TopPicksFour from './top-picksfour';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = React.useState(null);
  const [selectedImage, setSelectedImage] = React.useState('');
  const [relatedProducts, setRelatedProducts] = React.useState([]);

  React.useEffect(() => {
    fetch(`http://127.0.0.1:5000/products/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data.product);

        // Set the first image as the default selected image
        if (data.product.images.length > 0) {
          setSelectedImage(data.product.images[0]);
        }
        // Fetch related products
        fetch(`http://127.0.0.1:5000/products/category/${data.product.category}`)
          .then(response => response.json())
          .then(relatedData => {
            setRelatedProducts(relatedData.products.filter(p => p.id !== data.product.id));
          });
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
        <div className="w-1/2 flex flex-col">
          <h1 className="text-3xl font-medium mb-2">{product.title}</h1>
          <h2 className=" mb-2 capitalize text-lg">
            <span className="font-medium text-gray-900">Category:</span>
            <span className="font-normal text-gray-700"> {product.category}</span>
          </h2>
          <h2 className="text-lg mb-4 capitalize">
            <span className="font-medium text-gray-900">Brand:</span>
            <span className="font-normal text-gray-700"> {product.brand}</span>
          </h2>

          <p className="text-gray-600 mb-2 text-md">
            <span className="font-medium text-gray-900">SKU:</span>
            <span className="font-normal text-gray-700"> {product.sku}</span>
          </p>
          <p className="text-md text-gray-700 mb-2">
            <span className="font-medium text-gray-900">Price:</span> Ksh. {Math.round((product.price * (100 - product.discountPercentage)) / 100)}
          </p>
          <p className="text-md text-gray-500 mb-4">
            <span className="font-medium text-gray-900">Original Price:</span>
            <span className="line-through text-gray-700"> Ksh. {product.price}</span>
          </p>
          <p className="text-gray-600 mb-2 text-md">
            <span className="font-medium text-gray-900">Description:</span> {product.description}
          </p>
          <p className="text-gray-600 mb-2 text-md">
            <span className="font-medium text-gray-900">Stock:</span>
            <span className="font-normal text-red-500"> {product.stock}</span>
          </p>

          <div className="flex flex-row gap-6 m-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add to Cart</button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 flex items-center">
              <FontAwesomeIcon icon={faHeart} className="mr-2" />
              Add to Wishlist
            </button>
          </div>
          <div className='flex flex-row justify-between space-x-4 mb-2'>
            <p className="text-gray-600 mb-2 text-sm">
              <span className="font-medium text-gray-900">Shipping:</span>
              <span className="font-light text-gray-700"> {product.shippingInformation}</span>
            </p>
            <p className="text-gray-600 mb-2 text-sm">
              <span className="font-medium text-gray-900">Availability:</span>
              <span className="font-bold text-yellow-500"> {product.availabilityStatus}</span>
            </p>
            <p className="text-gray-600 mb-2 text-sm">
              <span className="font-medium text-gray-900">Return Policy:</span>
              <span className="font-light text-gray-600"> {product.returnPolicy}</span>
            </p>
          </div>
          <div className='flex flex-row justify-between space-x-4 mb-2'>
            <p className="text-gray-600 mb-2 text-sm">
              <span className="font-medium text-gray-900">Weight:</span>
              <span className="font-light text-gray-600"> {product.weight}g</span>
            </p>
            <p className="text-gray-600 mb-2 text-sm">
              <span className="font-medium text-gray-900">Dimensions:</span>
              <span className="font-light text-gray-600"> {product.dimensions.width}x{product.dimensions.height}x{product.dimensions.depth} mm</span>
            </p>
            <p className="text-gray-600 mb-2 text-sm">
              <span className="font-medium text-gray-900">Warranty:</span>
              <span className="italic text-gray-700"> {product.warrantyInformation}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts relatedProducts={relatedProducts} />
      <div className="4-items">
        <h1 className="mb-2 flex justify-center text-xl font-semibold">Top picks</h1>
        <TopPicksFour />
      </div>
      <div className="flex justify-center py-4">
        <Link
          to="/toppicks"
          className="bg-blue-300 text-gray-600 text-sm px-2 py-2 rounded-md"
        >
          View Top Picks
        </Link>
      </div>
    </div>
  );
};

export default ProductDetailPage;
