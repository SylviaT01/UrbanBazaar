
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./Pages/home";
import AboutUs from "./Pages/about";
import Contact from "./Pages/contact";
import WishList from "./components/wishList";
import ProductList from "./components/productList";
import CartModal from "./components/cartModal";



function AppContent() {

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <Routes>
          {/* <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/cart" element={<CartModal />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/products" element={<ProductList />} />
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
