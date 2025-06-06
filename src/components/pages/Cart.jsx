import React, { useContext } from 'react'
import { StateContext } from '../states/StateProvider'
import { MdCurrencyRupee } from "react-icons/md";
import Button from '../layout/Button';
// import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const { cart } = useContext(StateContext);
  // const navigate = useNavigate()

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
          <ul>
            {
              cart.length === 0 ? (<p>Your Cart is Empty</p>)
                :
                cart.map((item) => (
                  <li key={item.id} className="flex pt-4 pb-8 border-b-[0.2px] border-[#172554] gap-9 mb-9">
                    <img
                      src={item.image}
                      alt="Product"
                      className="w-[20vw] h-[40vh]"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">{item.title}</h2>
                      <p className="flex items-center text-[21.5px] text-black">
                        <MdCurrencyRupee />
                        {item.price}
                      </p>
                      <Button product={item} />
                    </div>
                  </li>))}

          </ul>
        </div>
      </div>
    </>
  )
}

export default Cart
