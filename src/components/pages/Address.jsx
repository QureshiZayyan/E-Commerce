import React, { useState, useContext } from 'react';
import { db } from "../../firebase";
import { StateContext } from "../states/StateProvider";
import { addDoc, collection } from 'firebase/firestore';
import { toast, Zoom } from 'react-toastify';

const Address = () => {

    const { user } = useContext(StateContext);

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
            if (!address) return;
            await addDoc(collection(db, "addresses"), {
                ...address,
                userId: user?.uid,
                createdAt: new Date()
            });
            toast.success("Address Saved", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                theme: 'light',
                closeOnClick: true,
                transition: Zoom,
                Limit: 1,
            });
            setAddress({});
        } catch (err) {
            console.error("Error saving address:", err);
        }
    }

    return (
        <div className="flex items-center justify-center my-12">
            <div
                className="transition-all duration-500 transform scale-100 opacity-100 bg-slate-200 shadow-xl rounded-2xl p-6 w-[35vw]"
            >
                <h2 className="text-xl font-semibold mb-4">Address</h2>

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

                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="bg-black text-white px-4 py-2 rounded hover:bg-neutral-900"
                        >
                            Save
                        </button>

                        <button
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