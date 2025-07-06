import { ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { StateContext } from "../states/StateProvider";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const { user, cart, products, setAllProducts, setDropDown } = useContext(StateContext);
  const navigate = useNavigate();

  const resetProducts = () => {
    setAllProducts(products);
    setDropDown('All');
    navigate('/');
    window.scrollTo({ top: 0 });
  };

  return (
    <nav className="bg-blue-950 shadow-md py-4 px-10 md:px-14 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Logo */}
      <div onClick={resetProducts} className="cursor-pointer text-xl font-bold text-white">ShopKart</div>

      {/* Right: Cart + User */}
      <div className="flex items-center gap-6 relative">
        {/* Cart */}
        <NavLink to='/cart' className="text-white font-semibold hover:text-gray-300 flex items-center relative">
          <ShoppingCart size={27} />
          {cart?.length > 0 && (
            <span className="absolute top-[-6px] left-4 text-xs font-bold bg-white text-[#172554] px-[6px] py-[2px] rounded-full">
              {cart.length}
            </span>
          )}
        </NavLink>

        {/* User Icon (go to login or profile) */}
        <NavLink
          to={user ? '/userprofile' : '/login'}
          className="text-white font-semibold hover:text-gray-300"
        >
          <FaUser size={23} />
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
