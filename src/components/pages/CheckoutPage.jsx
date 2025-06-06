import React, { useContext, useEffect } from 'react';
import { StateContext } from '../states/StateProvider';
import { MdCurrencyRupee } from "react-icons/md";
import { useParams } from 'react-router-dom';

const CheckoutPage = () => {
    const { placeSingleItemOrder, products, selectedItem, setSelectedItem } = useContext(StateContext);
    const { id } = useParams();

    // useEffect(() => {
    //     placeSingleItemOrder();
    // }, [selectedItem]);

    useEffect(() => {
        if (products && id) {
            const numericId = parseInt(id); // Convert id to number
            const foundProduct = products.find(
                (p) => p.id === numericId
            );
            setSelectedItem(foundProduct || null);
        }
    }, [id, products]);

    if (!selectedItem) {
        return <div className="p-10 text-center">Loading product...</div>;
    }

    return (
        <div className="p-10">
            <ul>
                <li key={selectedItem.id} className="flex pt-4 pb-8 border-b border-[#172554] gap-9 mb-9">
                    <img
                        src={selectedItem.image}
                        alt="Product"
                        className="w-[20vw] h-[40vh]"
                    />
                    <div>
                        <h2 className="text-lg font-semibold">{selectedItem.title}</h2>
                        <p className="flex items-center text-[21.5px] text-black">
                            <MdCurrencyRupee />
                            {selectedItem.price}
                        </p>
                        <button
                            onClick={() => placeSingleItemOrder(selectedItem)}
                            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
                        >
                            Place Order
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default CheckoutPage;
