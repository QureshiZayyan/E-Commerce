import './App.css'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import ProductDetailPage from './components/ProductDetailPage';
import LoginForm from './components/LoginForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import Cart from './components/Cart';

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
        </Routes>
      </Router>
    </>
  )
}

