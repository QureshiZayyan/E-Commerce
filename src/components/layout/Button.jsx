import { Link } from "react-router-dom"

const Button = ({ addToCart, product }) => {

    return (
        <>
            <button onClick={addToCart} className="font-semibold text-[13px] bg-[#172554] text-white py-[9px] px-[10.2px] rounded-2xl"
            >Add to Cart</button>
            <Link to={`/item/${product.id}`}>
                <button
                    className="text-[13px] bg-black font-semibold text-white py-[9px] px-[10.2px] rounded-2xl">
                    Buy Now
                </button>
            </Link>
        </>
    )

}

export default Button
