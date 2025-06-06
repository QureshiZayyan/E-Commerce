import { ShoppingCart } from "lucide-react";
import { useState, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { NavLink } from 'react-router-dom'
import { StateContext } from "../states/StateProvider"
import { auth } from "../../firebase";

const Navbar = () => {
    const { user, cart } = useContext(StateContext);

    return (
        <nav className="bg-blue-950 overflow-hidden shadow-md py-4 pl-6 pr-16 flex sticky top-0 z-[1] items-center justify-between">
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
            <div className="hidden md:flex space-x-6 relative">
                {/* <NavLink to='/' className="text-white font-semibold hover:text-gray-300">Home</NavLink> */}
                {!user ? (
                    <NavLink to='/login' className="text-white font-semibold hover:text-gray-300">Login</NavLink>
                ) : (
                    <NavLink to='userprofile' className="text-white font-semibold">Hello, {auth.currentUser?.displayName}</NavLink>
                )}
                <NavLink to='/cart' className="text-white font-semibold hover:text-gray-300 flex items-center"><span className="rbg-red-700 absolute py-[2.2px] px-[9px] top-[-10px] left-[204px] bg-white text-[#172554] rounded-[50%]">{cart.length}</span><ShoppingCart />Cart</NavLink>
            </div>
        </nav >
    );
};

export default Navbar;