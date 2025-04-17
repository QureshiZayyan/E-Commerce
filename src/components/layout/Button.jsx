import { useContext } from "react"
import { StateContext } from "../states/StateProvider"

const Button = ({ addToCart }) => {


    return (
        <>
            <button onClick={addToCart} className="text-[14px] bg-black text-white py-1 px-[9px] rounded-2xl"
            >Add to Cart</button>
            <button
                className="text-[14px] bg-[#172554] text-white py-1 px-[9px] rounded-2xl"
            >Buy Now</button>
        </>
    )
}

export default Button
