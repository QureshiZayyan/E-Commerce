import { ShoppingCart } from "lucide-react";
import { useState, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { NavLink } from 'react-router-dom'
import { StateContext } from "./StateProvider";
import { auth } from "../firebase";

const Navbar = () => {
    const { user } = useContext(StateContext);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-blue-950 shadow-md py-3 pl-6 pr-8 flex items-center justify-between">
            {/* <div className="flex justify-between items-center"> */}
            {/* Logo */}
            <NavLink to='/'><div className="text-xl font-bold text-white">ShopKart</div></NavLink>

            <div className="flex items-center bg-white rounded-2xl">
                <input
                    type="text"
                    placeholder="Search..."
                    className="px-3 py-[3.5px] w-96 outline-none rounded-2xl font-medium"
                />
                <FaSearch className="text-black cursor-pointer relative right-3" />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6">
                <NavLink to='/' className="text-white font-semibold hover:text-gray-300">Home</NavLink>
                {!user ? (
                    <NavLink to='/login' className="text-white font-semibold hover:text-gray-300">Login</NavLink>
                ) : (
                    <NavLink to='userprofile' className="text-white font-semibold">Hello, {auth.currentUser?.displayName}</NavLink>
                )}
                <NavLink to='/cart' className="text-white font-semibold hover:text-gray-300 flex items-center"><ShoppingCart />Cart</NavLink>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
                <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
                    {isOpen ? "Close" : "Menu"}
                </button>
            </div>
            {/* </div> */}

            {/* Mobile Menu */}
            {
                isOpen && (
                    <div className="md:hidden bg-white shadow-md absolute w-full">
                        <div className="p-4 space-y-4">
                            <a href="#" className="block text-gray-600 hover:text-gray-900">Home</a>
                            <a href="#" className="block text-gray-600 hover:text-gray-900">Shop</a>
                            <a href="#" className="block text-gray-600 hover:text-gray-900">Cart</a>
                            <a href="#" className="block text-gray-600 hover:text-gray-900">Contact</a>
                        </div>
                    </div>
                )
            }
        </nav >
    );
};

export default Navbar;
