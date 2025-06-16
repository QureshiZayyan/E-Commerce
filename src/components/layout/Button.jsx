// Button.jsx
import { useNavigate } from "react-router-dom";
import { toast, Zoom } from 'react-toastify';
import { useContext } from "react";
import { StateContext } from '../states/StateProvider';

const Button = ({ addToCart, product }) => {
    const { user } = useContext(StateContext);
    const navigate = useNavigate();

    const handleBuyNow = () => {
        if (!user) {
            toast.info("Please login to place the order.", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                theme: 'light',
                closeOnClick: true,
                transition: Zoom,
                bodyClassName: "text-green-800 font-semibold",
            });
            return;
        }
        navigate(`/item/${product.id}`);
    };

    return (
        <>
            <button onClick={addToCart}
                className="font-semibold text-[13px] bg-[#172554] text-white py-[9px] px-[10.2px] rounded-2xl">
                Add to Cart
            </button>

            <button onClick={handleBuyNow}
                className="text-[13px] bg-black font-semibold text-white py-[9px] px-[10.2px] rounded-2xl">
                Buy Now
            </button>
        </>
    );
};

export default Button;
