import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { StateContext } from "../states/StateProvider";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const UserProfile = () => {
    const navigate = useNavigate();
    const { user, userAddress } = useContext(StateContext);

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
            <div className="mt-[62px] mb-[75px]">
                {/* <h2 className="text-2xl font-bold">Welcome {user.email}</h2> */}
                <h2 className="text-2xl font-bold mx-10 mb-10 text-center">👋 Hello {user ? user.displayName : 'User'} !</h2>

                <div id="UserPorfile" className="flex justify-center gap-4">
                    <div id="Address">
                        {
                            userAddress.map((res) => (
                                <ul key={res.id} className="rounded-[8px] py-4 pr-7 pl-3 border-2 border-black w-[230px]">
                                    <li className='mb-1 font-bold'>Default Address</li>
                                    <li><span className="font-bold">Name : </span>{res.fullName}</li>
                                    <li><span className="font-bold">Street : </span> {res.street}</li>
                                    <li><span className="font-bold">City : </span> {res.city}</li>
                                    <li><span className="font-bold">State : </span>{res.state}</li>
                                    <li><span className="font-bold">Zip Code : </span>{res.zip}</li>
                                    <li><span className="font-bold">Country : </span>{res.country}</li>
                                </ul>
                            ))
                        }
                    </div>
                    <div className="font-bold">
                        <button className="w-[124px] mb-[19px] px-2 py-4 block bg-blue-950 rounded-lg text-white"><NavLink to={'/orders'}>Your Orders</NavLink></button>
                        <button className='w-[124px] mb-[19px] bg-slate-200 px-2 py-4 rounded-lg'><NavLink to={'/address'}>Edit Address</NavLink></button>
                        <button
                            className="w-[124px] px-2 py-4 block rounded-lg bg-black text-white"
                            onClick={handleLogout}
                        >
                            logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default UserProfile;
