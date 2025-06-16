import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar'
import ProductList from './components/pages/ProductList'
import ProductDetailPage from './components//pages/ProductDetailPage';
import LoginForm from './components/pages/LoginForm';
import UserProfile from './components/pages/UserProfile';
import Cart from './components/pages/Cart';
import CheckoutPage from './components/pages/CheckoutPage';
import Address from "./components/pages/Address";
import OrderPage from "./components/pages/OrderPage";
import Footer from './components/layout/Footer'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<ProductList />} />
          <Route path='/cart' element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/item/:id" element={<CheckoutPage />} />
          <Route path="/address" element={<Address />} />
          <Route path="/orders" element={<OrderPage />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  )
}

