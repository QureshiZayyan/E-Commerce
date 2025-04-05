import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../states/StateProvider";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const UserProfile = () => {
    const navigate = useNavigate();
    const { user } = useContext(StateContext);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* <h2 className="text-2xl font-bold">Welcome {user.email}</h2> */}
            <h2 className="text-2xl font-bold">Welcome {user.displayName}</h2>
            {user ? (
                <>
                    {/* <p>Your Email: {user.email}</p> */}
                    <button
                        className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UserProfile;
