import React from 'react'
import { NavLink } from 'react-router-dom'

const Button = () => {
    return (
        <>
            <NavLink to={'/userprofile'}><button
                className="bg-black text-white py-1 px-[10px] rounded-2xl"
            >Add to Cart</button></NavLink>
            <button
                className="bg-[#172554] text-white py-1 px-[10px] rounded-2xl"
            >Buy Now</button>

        </>
    )
}

export default Button
