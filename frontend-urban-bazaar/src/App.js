// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Home from "./Pages/home";
// import AboutUs from "./Pages/about";
// import Contact from "./Pages/contact";
// import WishList from "./components/wishList";
// import ProductList from "./Product/productList";
// import CartModal from "./components/cartModal";
// import NavItems from "./components/navItems";
// import DashboardAdmin from "./Pages/DashboardAdmin";
// import UserProfileDashboard from "./Pages/UserProfileDashboard";
// import AllProducts from "./components/AllProducts";
// import AddProducts from "./components/AddProducts";
// import Orders from "./components/Orders";
// import Reviews from "./components/Reviews";
// import Customers from "./components/Customers";
// import Payments from "./components/Payments";
// import Dashboard from "./components/DashboardAdmin";
// // dummy componets
// const DashboardUser = () => <div>Dashboard Content</div>;
// const OrderHistory = () => <div>Order History Content</div>;
// const Wishlist = () => <div>Wishlist Content</div>;
// const UpdateProfile = () => <div>Update Profile Content</div>;
// function AppContent() {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <NavItems />
//       <div className="flex-grow">
//         <Routes>
//           {/* <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<SignUp />} /> */}
//           <Route path="/" element={<Home />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/about" element={<AboutUs />} />
//           <Route path="/cart" element={<CartModal />} />
//           <Route path="/wishlist" element={<WishList />} />
//           <Route path="/products" element={<ProductList />} />
//           <Route path="/dashboard" element={<DashboardAdmin />}>
//             <Route path="dashboardAdmin" element={<Dashboard />} />
//             <Route path="products/all" element={<AllProducts />} />
//             <Route path="products/add" element={<AddProducts />} />
//             <Route path="orders" element={<Orders />} />
//             <Route path="reviews" element={<Reviews />} />
//             <Route path="customers" element={<Customers />} />
//             <Route path="payments" element={<Payments />} />
//           </Route>
//           <Route path="/userprofile" element={<UserProfileDashboard />}>
//             <Route path="dashboarduser" element={<DashboardUser />} />
//             <Route path="orderhistory" element={<OrderHistory />} />
//             <Route path="whishlist" element={<Wishlist />} />
//             <Route path="profile" element={<UpdateProfile />} />
//           </Route>
//         </Routes>
//       </div>
//     </div>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }

// export default App;
// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/home";
import AboutUs from "./Pages/about";
import Contact from "./Pages/contact";
import WishList from "./components/wishList";
import ProductList from "./Product/productList";
import CartModal from "./components/cartModal";
import NavItems from "./components/navItems";
import DashboardAdmin from "./Pages/DashboardAdmin";
import UserProfile from "./Pages/UserProfileDashboard";
import AllProducts from "./components/AllProducts";
import AddProducts from "./components/AddProducts";
import Orders from "./components/Orders";
import Reviews from "./components/Reviews";
import Customers from "./components/Customers";
import Payments from "./components/Payments";
import Dashboard from "./components/DashboardAdmin";
import Orders from "./admin/orders";
import Dashboard from "./Pages/DashboardAdmin";
import Navbar from "./admin/navbar";
import Customer from './admin/customers'


// Dummy components for User Profile
const DashboardUser = () => <div>Dashboard Content</div>;
const OrderHistory = () => <div>Order History Content</div>;
const Wishlist = () => <div>Wishlist Content</div>;
const UpdateProfile = () => <div>Update Profile Content</div>;

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <NavItems /> */}
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/cart" element={<CartModal />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/orders" element={<Orders />} />
          <Route path='/customers' element={<Customer/>} />
          <Route path="/DashboardAdmin" element={<Dashboard />} />
            <Route path="/dashboard" element={<DashboardAdmin />}>
            <Route path="dashboardAdmin" element={<Dashboard />} />
            <Route path="products/all" element={<AllProducts />} />
            <Route path="products/add" element={<AddProducts />} />
            <Route path="orders" element={<Orders />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="customers" element={<Customers />} />
            <Route path="payments" element={<Payments />} />
          </Route>
          {/* UserProfile Routes */}
          <Route path="/userprofile" element={<UserProfile />}>
            <Route path="dashboarduser" element={<DashboardUser />} />
            <Route path="orderhistory" element={<OrderHistory />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="profile" element={<UpdateProfile />} />
          </Route>

        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
