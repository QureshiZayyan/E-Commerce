import React, { useContext, useEffect } from 'react'
import { StateContext } from '../states/StateProvider'
import { MdCurrencyRupee } from "react-icons/md";

const Cart = () => {

  const { cart } = useContext(StateContext);

  useEffect(() => {
    console.log(cart.length);
  }, [])

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

          <ul>
            {
              cart.length === 0 ? (<p>Cart is Empty</p>)
                :
                cart.map((item) => (
                  <li key={item.id} className="flex pt-4 pb-8 border-b-[0.2px] border-[#172554] gap-9 mb-9">
                    {/* <div className="flex items-center gap-4"> */}
                    <img
                      src={item.image}
                      alt="Product"
                      className="w-[20vw] h-[40vh]"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">{item.title}</h2>
                      <p className="flex items-center text-[21.5px] text-black">
                        <MdCurrencyRupee />
                        999
                      </p>
                      {/* </div> */}
                    </div>
                  </li>))}
          </ul>
        </div>
      </div>

    </>
  )
}

export default Cart
