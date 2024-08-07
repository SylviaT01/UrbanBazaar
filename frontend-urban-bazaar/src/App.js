import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/home";
import AboutUs from "./Pages/about";
import WishList from "./components/wishList";
import ProductList from "./Product/productList";
import ShoppingCart from "./Product/shoppingcart.jsx";
import NavItems from "./components/navItems";
import TopPicks from "./Product/top-picks.jsx";
import WeeklyOffers from "./Product/weekly-offers.jsx";
import Footer from "./components/Footer.jsx";
import ProductDetails from "./Product/productDetails.jsx";
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
import Login from "./Forms /login";
import SignUp from "./Forms /signup";
import Contacts from "./Pages/Contact";
import Checkout from "./Forms /Checkout";
import UserDashboard from "./User/UserDashboard.jsx";

// Dummy components for User Profile

const OrderHistory = () => <div>Order History Content</div>;
const Wishlist = () => <div>Wishlist Content</div>;
const UpdateProfile = () => <div>Update Profile Content</div>;

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavItems />
      {/* <Navbar /> */}
      <div className="flex-grow">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contact" element={<Contacts />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/toppicks" element={<TopPicks />} />
          <Route path="/weeklyoffers" element={<WeeklyOffers />} />
          <Route path="/products/:id" element={<ProductDetails />} />
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
            <Route path="dashboarduser" element={<UserDashboard />} />
            <Route path="orderhistory" element={<OrderHistory />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="profile" element={<UpdateProfile />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    // <CartProvider>
    <Router>
      <AppContent />
    </Router>
    // </CartProvider>
  );
}

export default App;
