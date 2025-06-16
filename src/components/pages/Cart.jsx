import React, { useContext } from 'react'
import { StateContext } from '../states/StateProvider'
import { MdCurrencyRupee } from "react-icons/md";
import { toast, Zoom } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const navigate = useNavigate();

  const { cart, user } = useContext(StateContext);

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
  }
  return (
    <>
      <div id='cart-container' className="my-16">
        <div id='cart' className="mx-auto rounded-lg py-10 px-10 w-[80vw] shadow-md bg-white">
          <h1 className="text-2xl font-bold mb-11 text-center text-[#172554]">Your Cart Items</h1>
          <ul>
            {
              cart.length === 0 ? (<p>Your Cart is Empty</p>)
                :
                cart.map((item) => (
                  // <Link to={`/item/${item.id}`}>
                  <li key={item.id} className="flex items-center pt-4 pb-8 border-b-[0.2px] border-[#172554] gap-9 mb-9">
                    <img
                      src={item.image}
                      alt="Product"
                      className="w-[20vw] h-[40vh]"
                      loading="lazy"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">{item.title}</h2>
                      <p className="flex items-center my-2 text-[21.5px] text-black">
                        <MdCurrencyRupee />
                        {item.price}
                      </p>
                      {/* </Link> */}
                      {/* </div> */}
                      <button onClick={() => handleBuyNow(item)}
                        className="text-[13px] bg-[#172554] text-white mt-3 py-[6px] px-[10.2px] rounded-2xl">
                        Buy Now
                      </button>
                    </div>
                  </li>))}
          </ul>
        </div>
      </div >
    </>
  )
}

export default Cart
