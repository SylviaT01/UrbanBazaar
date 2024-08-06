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
import AllProducts from "./admin/AllProducts";
import AddProducts from "./admin/AddProducts";
import Reviews from "./admin/Reviews";
import Orders from "./admin/Orders";
import Customers from "./admin/Customers";
import Payments from "./admin/Payments";
import Dashboard from "./admin/DashboardAdmin";

import Navbar from "./admin/navbar";

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
