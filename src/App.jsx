import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy, useContext } from 'react';
import Navbar from './components/layout/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/layout/Loader';
import { StateContext } from './components/states/StateProvider';


const ProductList = lazy(() => import('./components/pages/ProductList'));
const ProductDetailPage = lazy(() => import('./components/pages/ProductDetailPage'));
const LoginForm = lazy(() => import('./components/pages/LoginForm'));
const UserProfile = lazy(() => import('./components/pages/UserProfile'));
const Cart = lazy(() => import('./components/pages/Cart'));
const CheckoutPage = lazy(() => import('./components/pages/CheckoutPage'));
const Address = lazy(() => import('./components/pages/Address'));
const OrderPage = lazy(() => import('./components/pages/OrderPage'));

export const App = () => {
  const { checkedItems } = useContext(StateContext);

  return (
    <>
      <Router>
        <Navbar />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path='/' element={<ProductList />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/product/:id' element={<ProductDetailPage />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/userprofile' element={<UserProfile />} />
            <Route path="/item/:id" element={<CheckoutPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path='/address' element={<Address />} />
            <Route path='/orders' element={<OrderPage />} />
          </Routes>
        </Suspense>
      </Router>
      <ToastContainer />
    </>
  );
};
