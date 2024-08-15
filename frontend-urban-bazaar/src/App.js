import React, {useContext} from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { CartProvider } from "./contexts/cartContext.jsx";
import { UserProvider } from "./contexts/userContext.jsx";
import { UserContext } from "./contexts/userContext.jsx";
import Home from "./Pages/home";
import AboutUs from "./Pages/about";
import WishList from "./User/wishList.jsx";
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
import ContactsUs from "./admin/Contacts";
import Dashboard from "./admin/DashboardAdmin";
import Login from "./Forms /login";
import SignUp from "./Forms /signup";
import Contacts from "./Pages/Contact";
import Checkout from "./Forms /Checkout";
import UserDashboard from "./User/UserDashboard.jsx";
import OrderComplete from "./Product/orderComplete.jsx";
import UpdateProfile from "./Forms /UpdateProfile.jsx";
import RelatedProducts from "./Product/relatedProducts.jsx";
import Navbar from "./admin/navbar";
import PrivacyPolicy from './components/privacypolicy.jsx';
import FAQs from './components/FAQs';
import DeliveryAndReturns from './components/DeliveryAndReturns.jsx';
import OrderHistory from "./Product/orderHistory.jsx";
import ExecutePayment from "./Forms /ExcutePayment.jsx";
// Dummy components for User Profile
// const OrderHistory = () => <div>Order History Content</div>;


function AppContent() {
  const { currentUser } = useContext(UserContext);
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith('/dashboard');
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="min-h-screen flex flex-col">
      {!isAuthPage && (isAdminPage ? <Navbar /> : <NavItems />)}

      <div className="flex-grow">
        <Routes>
          {/* Shared Routes (accessible by both users and admins) */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contact" element={<Contacts />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/excute-payment" element={<ExecutePayment />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/toppicks" element={<TopPicks />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/delivery" element={<DeliveryAndReturns />} />
          <Route path="/weeklyoffers" element={<WeeklyOffers />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/ordercomplete" element={<OrderComplete />} />

          {/* Admin Routes */}
          {currentUser?.is_admin && (
            <Route path="/dashboard" element={<DashboardAdmin />}>
              <Route path="dashboardAdmin" element={<Dashboard />} />
              <Route path="products/all" element={<AllProducts />} />
              <Route path="products/add" element={<AddProducts />} />
              <Route path="orders" element={<Orders />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="customers" element={<Customers />} />
              <Route path="payments" element={<Payments />} />
              <Route path="contacts" element={<ContactsUs />} />
            </Route>
          )}

          {/* UserProfile Routes */}
          {!currentUser?.is_admin && (
            <Route path="/userprofile" element={<UserProfile />}>
              <Route path="dashboarduser" element={<UserDashboard />} />
              <Route path="orderhistory" element={<OrderHistory />} />
              <Route path="wishlist" element={<WishList />} />
              <Route path="profile" element={<UpdateProfile />} />
              <Route path="relatedproducts" element={<RelatedProducts />} />
            </Route>
          )}
        </Routes>
      </div>
      
      {!isAuthPage && <Footer />}
    </div>
  );
}




function App() {
  return (
    <Router>
      <UserProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </UserProvider>
    </Router>
  );
}

export default App;

