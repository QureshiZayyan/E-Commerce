import React, { useContext } from 'react'
import { StateContext } from '../states/StateProvider'
import { MdCurrencyRupee } from "react-icons/md";
import { Link } from 'react-router-dom';

const Cart = () => {

  const { cart } = useContext(StateContext);

  return (
    <>
      <div className="min-h-screen pt-16 pb-24 px-14">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
          <ul>
            {
              cart.length === 0 ? (<p>Your Cart is Empty</p>)
                :
                cart.map((item) => (
                  // <Link to={`/item/${item.id}`}>
                  <li key={item.id} className="flex pt-4 pb-8 border-b-[0.2px] border-[#172554] gap-9 mb-9">
                    <img
                      src={item.image}
                      alt="Product"
                      className="w-[20vw] h-[40vh]"
                      loading="lazy"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">{item.title}</h2>
                      <p className="flex items-center text-[21.5px] text-black">
                        <MdCurrencyRupee />
                        {item.price}
                      </p>
                      {/* </Link> */}
                      {/* </div> */}
                      <Link to={`/item/${item.id}`}>
                        <button
                          className="text-[13px] bg-[#172554] text-white mt-3 py-[6px] px-[10.2px] rounded-2xl">
                          Buy Now
                        </button>
                      </Link>
                    </div>
                  </li>))}

          </ul>
        </div>
      </div>
    </>
  )
}

export default Cart
