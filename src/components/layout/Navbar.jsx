import { ShoppingCart } from "lucide-react";
import { useState, useContext } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { StateContext } from "../states/StateProvider";
import { auth } from "../../firebase";

const Navbar = () => {
    const { user, cart } = useContext(StateContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMenu = () => setIsMobileMenuOpen(prev => !prev);
    const closeMenu = () => setIsMobileMenuOpen(false);

    return (
        <>
            {/* Navbar */}
            <nav className="bg-blue-950 shadow-md py-4 pl-6 pr-14 flex items-center justify-between sticky top-0 z-30">
                {/* Left: Hamburger + Logo */}
                <div className="flex items-center gap-4">
                    <button className="md:hidden text-white text-2xl" onClick={toggleMenu}>
                        <FaBars />
                    </button>
                    <NavLink to='/' className="text-xl font-bold text-white">ShopKart</NavLink>
                </div>

                {/* Right: Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6 relative">
                    {user && (
                        <NavLink to='/userprofile' className="text-white font-semibold hover:text-gray-300">
                            Hello, {auth.currentUser?.displayName}
                        </NavLink>
                    )}
                    {!user && (
                        <NavLink to='/login' className="text-white font-semibold hover:text-gray-300">
                            Login
                        </NavLink>
                    )}
                    <NavLink to='/cart' className="text-white font-semibold hover:text-gray-300 flex items-center relative">
                        <span className="absolute top-[-8px] left-[70px] bg-white text-[#172554] text-base font-bold py-[2px] px-[7px] rounded-full">{cart.length}</span>
                        <ShoppingCart className="mr-1" /> Cart
                    </NavLink>
                </div>
            </nav>

            {/* Slide-in Mobile Menu */}
            <div
                className={`fixed top-0 left-0 h-full w-64 text-blue-950 bg-slate-50 z-40 p-6 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                    } md:hidden`}
            >
                <button className="text-2xl mb-6" onClick={closeMenu}>
                    <FaTimes />
                </button>

                <div className="flex flex-col space-y-4">
                    {!user ? (
                        <NavLink onClick={closeMenu} to='/login' className="font-semibold hover:text-gray-300">
                            Login
                        </NavLink>
                    ) : (
                        <NavLink onClick={closeMenu} to='/userprofile' className="font-semibold hover:text-gray-300">
                            Hello, {auth.currentUser?.displayName}
                        </NavLink>
                    )}
                    <NavLink onClick={closeMenu} to='/cart' className="font-semibold hover:text-gray-300 flex items-center relative">
                        <ShoppingCart className="mr-1" /> Cart
                    </NavLink>
                </div>
            </div>

            {/* Backdrop Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
                    onClick={closeMenu}
                />
            )}
        </>
    );
};

export default Navbar;
