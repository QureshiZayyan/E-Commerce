import { useNavigate } from "react-router-dom";
import { toast, Zoom } from 'react-toastify';
import { useContext } from "react";
import { StateContext } from '../states/StateProvider';
import { MdDone } from "react-icons/md";

const Button = ({ addToCart, product }) => {
    const { user, cart } = useContext(StateContext);
    const navigate = useNavigate();

    const handleBuyNow = () => {
        if (!user) {
            toast.info("Please login to place the order.", {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: true,
                theme: 'light',
                closeOnClick: true,
                transition: Zoom,
                bodyClassName: "text-green-800 font-semibold",
            });
            return;
        }
        addToCart(product)
        navigate(`/item/${product.id}`);
    };

    return (
        <>
            <button onClick={addToCart}
                className="font-semibold text-[15px] bg-[#172554] text-white py-[9px] px-[10.2px] rounded-2xl">
                {
                    cart.some(item => item.id === product.id) ? (
                        <span className="flex items-center gap-1 text-white">
                            <MdDone color="white" size={18} /> Added
                        </span>
                    ) : (
                        'Add to Cart'
                    )
                }
            </button>

            <button onClick={handleBuyNow}
                className="text-[15px] bg-black font-semibold text-white py-[9px] px-[10.2px] rounded-2xl">
                Buy Now
            </button>
        </>
    );
};

export default Button;
