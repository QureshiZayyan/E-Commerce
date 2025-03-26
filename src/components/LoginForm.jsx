import { useState} from "react";
import { auth } from "../firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import Input from "./Input";

const LoginForm = () => {
    // const {} = useContext(StateContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);
    const navigate = useNavigate();

    const handleAuth = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            if (isSignUp) {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);

                await updateProfile(userCredential.user, { displayName: name });
                alert("User Registered!");
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                alert("Logged In Successfully!");
            }
            navigate('/')
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen mt-14 mb-14">
            <div className="bg-black p-8 rounded-2xl shadow-lg w-96">
                <h2 className="text-2xl font-bold text-white text-center">
                    {isSignUp ? "Sign Up" : "Sign In"}
                </h2>

                <form className="mt-6 space-y-4" onSubmit={handleAuth}>

                    {isSignUp ?
                        <label className="block text-white">Name
                            <Input placeholder={'Name'} onChange={((e) => setName(e.target.value))} />
                        </label>

                        :
                        null
                    }

                    <label className="block text-white">Email
                        <Input type={'email'} placeholder={'E-Mail'} onChange={((e) => setEmail(e.target.value))} />
                    </label>

                    <label className="block text-white">Password
                        <Input placeholder={'Password'} type={'password'} onChange={((e) => setPassword(e.target.value))} />
                    </label>

                    {error && <p className="text-red-500">{error}</p>}

                    <button
                        type="submit"
                        className={`w-full bg-[#172554] text-white py-2 rounded-lg ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (isSignUp ? "Signing Up..." : "Signing In...") : (isSignUp ? "Sign Up" : "Sign In")}
                    </button>
                </form>
                <p className="text-white text-center mt-4">
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}
                    <span
                        className="text-blue-400 cursor-pointer ml-2"
                        onClick={() => setIsSignUp(!isSignUp)}
                    >
                        {isSignUp ? "Sign In" : "Sign Up"}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
