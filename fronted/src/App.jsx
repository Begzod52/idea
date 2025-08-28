import React from "react";
import Header from "./components/Header.jsx";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Hero from "./components/Hero.jsx";
import ProductSlider from "./components/ProductSlider.jsx";
import ProductSlider1 from "./components/ProductSlider1.jsx";
import ProductSlider2 from "./components/ProductSlider2.jsx";
import ProductSlider3 from "./components/ProductSlider3.jsx";
import ProductSlider4 from "./components/ProductSlider4.jsx";
import ThreeBanner from "./components/ThreeBanner.jsx";
import Categories from "./components/Categories.jsx";
import Footer from "./components/Footer.jsx";
import ChatBubbleRight from "./components/ChatBubbleRight.jsx";
import Sales from "./pages/Sales.jsx";
import Shops from "./pages/Shops.jsx";
import Favorites from "./pages/Favorites.jsx";
import Shop from "./pages/Shop.jsx";
import Compare from "./pages/Compare.jsx";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div className="bg-gray-100">
              <Hero />
              <ProductSlider />
              <ProductSlider1 />
              <ProductSlider2 />
              <ProductSlider3 />
              <ThreeBanner />
              <ProductSlider4 />
              <Categories />
              <Footer />
              <ChatBubbleRight />
            </div>
          }
        />
        <Route path="sales" element={<Sales />} />
        <Route path="shops" element={<Shops />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
