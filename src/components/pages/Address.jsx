import React, { useState, useContext } from 'react';
import { db } from "../../firebase";
import { StateContext } from "../states/StateProvider";
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { toast, Zoom } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Address = () => {

    const navigate = useNavigate();
    const { user, userAddress } = useContext(StateContext);

    const [address, setAddress] = useState({
        fullName: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
    });

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (userAddress.length === 0) {
                await addDoc(collection(db, "addresses"), {
                    ...address,
                    userId: user?.uid,
                    createdAt: new Date()
                });
            } else {
                // Update existing address (assumes only one per user)
                const addressDocId = userAddress[0].id; // first address
                const addressRef = doc(db, "addresses", addressDocId);
                await updateDoc(addressRef, {
                    ...address,
                    updatedAt: new Date()
                });
                toast.success(userAddress.length === 0 ? "Address Saved" : "Address Updated", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    theme: 'light',
                    closeOnClick: true,
                    transition: Zoom,
                    limit: 1,
                });
            }
        } catch (err) {
            console.error("Error saving address:", err);
        }
    }

    return (
        <div className="flex items-center justify-center my-12">
            <div
                id='form' className="transition-all duration-500 transform scale-100 opacity-100 bg-black shadow-xl rounded-2xl p-6 w-[35vw]"
            >
                <h2 className="text-xl font-semibold mb-4 text-white">{userAddress.length !== 0 ? 'Edit' : 'Add'} Address</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        name="fullName"
                        placeholder="Full Name"
                        className="w-full mb-2 p-2 border rounded"
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="street"
                        placeholder="Street"
                        className="w-full mb-2 p-2 border rounded"
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="city"
                        placeholder="City"
                        className="w-full mb-2 p-2 border rounded"
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="state"
                        placeholder="State"
                        className="w-full mb-2 p-2 border rounded"
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="zip"
                        placeholder="ZIP Code"
                        className="w-full mb-2 p-2 border rounded"
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="country"
                        placeholder="Country"
                        className="w-full mb-4 p-2 border rounded"
                        onChange={handleChange}
                        required
                    />

                    <div className="flex justify-between font-semibold">
                        <button
                            type="submit"
                            className="bg-slate-200 text-black px-4 py-2 rounded hover:bg-slate-300">
                            {userAddress.length === 0 ? 'Save' : 'Update'}
                        </button>

                        <button onClick={() => navigate('/userprofile')}
                            type="button"
                            className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-900"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Address;