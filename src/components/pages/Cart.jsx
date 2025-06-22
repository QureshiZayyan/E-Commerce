import React, { useContext } from 'react'
import { StateContext } from '../states/StateProvider'
import { MdCurrencyRupee } from "react-icons/md";
import { toast, Zoom } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';

const Cart = () => {

  const navigate = useNavigate();
  const { cart, user, setCart } = useContext(StateContext);

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
  }

  const handleBuyNow = (product) => {
    if (!user) {
      toast.info("Please login to place the order.", {
        position: 'top-center',
        bodyClassName: 'txt',
        autoClose: 2000,
        hideProgressBar: true,
        theme: 'light',
        closeOnClick: true,
        transition: Zoom,
      });
      return;
    }
    navigate(`/item/${product.id}`);
  };

  return (
    <div id='cart-container' className="my-10">
      <div id='cart' className="mx-auto rounded-lg py-10 px-10 w-[85vw] shadow-md bg-white">
        <h1 className="text-2xl font-bold mb-11 text-center text-[#172554]">Your Cart Items</h1>
        <ul>
          {
            cart.length === 0 ? (<p className='text-center font-semibold text-xl'>Your Cart is Empty</p>)
              : cart.map((item) => (
                <li key={item.id} className="flex items-center pt-4 pb-8 border-b-[0.2px] border-[#172554] gap-9 mb-9">

                  <Link to={`/product/${item.id}`} className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt="Product"
                      className="w-[200px] h-[32vh]"
                      loading="lazy"
                    />
                  </Link>

                  <div>
                    <Link to={`/product/${item.id}`}>
                      <h2 className="text-lg font-semibold">{item.title}</h2>
                      <p className="flex items-center my-2 text-[20.5px] text-black">
                        <MdCurrencyRupee />
                        {item.price}
                      </p>
                    </Link>

                    <button
                      onClick={() => handleBuyNow(item)}
                      className="text-[13px] font-semibold bg-[#172554] text-white mt-3 py-[6px] px-[10.2px] rounded-2xl"
                    >
                      Buy Now
                    </button>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[13px] font-semibold mx-2 bg-black text-white mt-3 py-[6px] px-[10.2px] rounded-2xl"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))
          }
        </ul>
      </div>
    </div>
  );
};

export default Cart;
