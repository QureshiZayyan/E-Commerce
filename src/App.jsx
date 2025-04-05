import './App.css'
import Navbar from './components/layout/Navbar'
import ProductList from './components/pages/ProductList'
import ProductDetailPage from './components//pages/ProductDetailPage';
import LoginForm from './components/pages/LoginForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProfile from './components/pages/UserProfile';
import Cart from './components/pages/Cart';

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

