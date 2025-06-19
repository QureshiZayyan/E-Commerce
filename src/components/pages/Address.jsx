import React, { useState, useContext, useEffect } from 'react';
import { db } from "../../firebase";
import { StateContext } from "../states/StateProvider";
import {
    collection,
    query,
    where,
    getDocs,
    updateDoc,
    addDoc,
    doc,
} from 'firebase/firestore';

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

    const [docId, setDocId] = useState(null); // Track document ID if address exists
    const [showForm, setShowForm] = useState(false);
    const [showBtn, setShowBtn] = useState(true);

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const ShowForm = () => {
        setShowForm(true);
        setShowBtn(false);
    };

    const HideForm = () => {
        setShowForm(false);
        setShowBtn(true);
    };

    const fetchAddress = async () => {
        if (!user) return;
        const q = query(collection(db, "addresses"), where("userId", "==", user.uid));
        const res = await getDocs(q);
        if (!res.empty) {
            const docData = res.docs[0];
            setDocId(docData.id);
            setAddress(docData.data());
        }
    };

    useEffect(() => {
        fetchAddress();
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (docId) {
                // Edit existing address
                const addressRef = doc(db, "addresses", docId);
                await updateDoc(addressRef, address);
                alert("Address updated!");
            } else {
                // Add new address
                const docRef = await addDoc(collection(db, "addresses"), {
                    ...address,
                    userId: user?.uid,
                    createdAt: new Date()
                });
                setDocId(docRef.id);
                alert("Address saved!");
            }
            setShowForm(false);
            setShowBtn(true);
        } catch (err) {
            console.error("Error saving address:", err);
        }
    };

    return (
        <div className="flex items-center justify-center my-12">
            <div className="transition-all duration-500 transform scale-100 opacity-100 bg-black shadow-xl rounded-2xl p-6 w-[35vw]">
                <h2 className="text-xl font-semibold mb-7 text-white">
                    {docId ? "Edit Address" : "Add Address"}
                </h2>

                {showBtn && (
                    <button
                        onClick={ShowForm}
                        className="mb-4 text-white bg-blue-700 px-4 py-2 rounded"
                    >
                        {docId ? "Edit Address" : "Add Address"}
                    </button>
                )}

                {showForm && (
                    <form onSubmit={handleSubmit}>
                        <input name="fullName" placeholder="Full Name" value={address.fullName} onChange={handleChange} className="w-full mb-4 p-2 border rounded" required />
                        <input name="street" placeholder="Street" value={address.street} onChange={handleChange} className="w-full mb-4 p-2 border rounded" required />
                        <input name="city" placeholder="City" value={address.city} onChange={handleChange} className="w-full mb-4 p-2 border rounded" required />
                        <input name="state" placeholder="State" value={address.state} onChange={handleChange} className="w-full mb-4 p-2 border rounded" required />
                        <input name="zip" placeholder="ZIP Code" value={address.zip} onChange={handleChange} className="w-full mb-4 p-2 border rounded" required />
                        <input name="country" placeholder="Country" value={address.country} onChange={handleChange} className="w-full mb-6 p-2 border rounded" required />

                        <div className="flex justify-between font-semibold">
                            <button type="submit" className="bg-slate-300 text-black px-4 py-2 rounded hover:bg-neutral-900">
                                Save
                            </button>
                            <button type="button" onClick={HideForm} className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-900">
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Address;
