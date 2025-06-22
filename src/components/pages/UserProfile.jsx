import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { StateContext } from "../states/StateProvider";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import Loader from "../layout/Loader";

const UserProfile = () => {
    const navigate = useNavigate();
    const { user, userAddress, userProfile } = useContext(StateContext);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <>
            {
                userProfile ?
                    <div className="mt-[62px] mb-[75px]">
                        {/* <h2 className="text-2xl font-bold">Welcome {user.email}</h2> */}
                        <h2 className="text-2xl font-bold mx-10 mb-10 text-center">👋 Hello {user ? user.displayName : 'User'} !</h2>

                        <div id="UserPorfile" className="flex justify-center gap-4">
                            <div id="Address">
                                {
                                    userAddress.map((res) => (
                                        <ul key={res.id} className="rounded-[8px] py-4 pr-2 pl-3 border-2 border-black w-[240px]">
                                            <li className='font-bold mb-2'>Default Address</li>
                                            <li><span className="font-bold mb-1">Name : </span>{res.fullName}</li>
                                            <li><span className="font-bold mb-1">Street : </span> {res.street}</li>
                                            <li><span className="font-bold mb-1">City : </span> {res.city}</li>
                                            <li><span className="font-bold mb-1">State : </span>{res.state}</li>
                                            <li><span className="font-bold mb-1">Zip Code : </span>{res.zip}</li>
                                            <li><span className="font-bold mb-1">Country : </span>{res.country}</li>
                                        </ul>
                                    ))
                                }
                            </div>
                            <div className="font-bold">
                                <button className="w-[130px] mb-[21.2px] px-2 py-4 block bg-blue-950 rounded-lg text-white"><NavLink to={'/orders'}>Your Orders</NavLink></button>
                                <button className='w-[130px] mb-[21.2px] bg-slate-300 px-2 py-4 rounded-lg'><NavLink to={'/address'}>{userAddress.length === 0 ? 'Add Address' : 'Edit Address'}</NavLink></button>
                                <button
                                    className="w-[130px] px-2 py-4 block rounded-lg bg-black text-white"
                                    onClick={handleLogout}
                                >
                                    logout
                                </button>
                            </div>
                        </div>
                    </div>
                    :
                    <Loader />
            }
        </>
    )
};

export default UserProfile;
