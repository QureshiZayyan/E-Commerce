import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { StateContext } from "../states/StateProvider";

const Button = ({ addToCart }) => {

    return (
        <>
            <NavLink to='/cart'>
                <button onClick={addToCart} className="bg-black text-white py-1 px-[10px] rounded-2xl"
                >Add to Cart</button></NavLink>
            <button
                className="bg-[#172554] text-white py-1 px-[10px] rounded-2xl"
            >Buy Now</button>
        </>
    )
}

export default Button
