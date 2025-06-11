import React, { useContext, useEffect } from 'react';
import { StateContext } from '../states/StateProvider';
import { MdCurrencyRupee } from "react-icons/md";
import { useParams } from 'react-router-dom';

const CheckoutPage = () => {
    const { placeSingleItemOrder, products, selectedItem, setSelectedItem, totalPrice, quantity, userAddress } = useContext(StateContext);
    const { id } = useParams();

    // useEffect(() => {
    //     placeSingleItemOrder();
    // }, [selectedItem]);

    useEffect(() => {
        if (products && id) {
            const numericId = parseInt(id);
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
        <div className="my-14 mx-14">
            <ul>
                <li key={selectedItem.id} className="flex pt-4 pb-8 border-b border-[#172554] gap-9 mb-9">
                    <img
                        src={selectedItem.image}
                        alt="Product"
                        className="w-[20vw] h-[40vh]"
                    />
                    <div>
                        <h2 className="text-lg font-semibold mb-2">{selectedItem.title}</h2>
                        <p className="flex items-center text-[20.5px] text-black">
                            Subtotal ({quantity} Items):  <MdCurrencyRupee />{totalPrice.toFixed(2)}
                        </p>
                        <button
                            onClick={() => placeSingleItemOrder(selectedItem)}
                            className="mt-4 bg-[#172554] text-white px-3 py-[6px] rounded-2xl"
                        >
                            Place Order
                        </button>
                    </div>
                </li>
            </ul>

            <div>
                <p className='font-bold mb-5'>Delivering To :</p>
                {userAddress.map((res) => (
                    <ul key={res.id} className="rounded-[8px] py-4 pr-7 pl-3 border-2 border-black w-[230px]">
                        <li className='mb-1 font-bold'>Default Address</li>
                        <li><span className="font-bold">Name : </span>{res.fullName}</li>
                        <li><span className="font-bold">Street : </span> {res.street}</li>
                        <li><span className="font-bold">City : </span> {res.city}</li>
                        <li><span className="font-bold">State : </span>{res.state}</li>
                        <li><span className="font-bold">Zip Code : </span>{res.zip}</li>
                        <li><span className="font-bold">Country : </span>{res.country}</li>
                    </ul>
                ))}
            </div>
        </div>
    );
};

export default CheckoutPage;
