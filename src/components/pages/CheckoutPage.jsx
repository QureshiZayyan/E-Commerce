import React, { useContext, useEffect } from 'react';
import { StateContext } from '../states/StateProvider';
import { MdCurrencyRupee } from "react-icons/md";
import { useParams } from 'react-router-dom';

const CheckoutPage = () => {
    const { placeSingleItemOrder, products, selectedItem, setSelectedItem, totalPrice, quantity, userAddress } = useContext(StateContext);
    const { id } = useParams();

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
        <div id='Checkout-Container' className="my-10 mx-auto py-8 w-[85vw] bg-white rounded-lg px-10 shadow-md">
            <h1 className='text-2xl font-semibold mb-12 text-center text-[#172554]'>Confirm Your Order</h1>
            <ul>
                <li id='Checkout' key={selectedItem.id} className="flex items-center pt-4 pb-8 border-b border-[#172554] gap-14 mb-9">
                    <img
                        src={selectedItem.image}
                        alt="Product"
                        className="w-[20vw] h-[32vh]"
                        loading="lazy"
                    />
                    <div>
                        <h2 className="text-[18px] font-semibold mb-2">{selectedItem.title}</h2>
                        <p className="flex items-center text-[18px] text-black">
                            Subtotal ({quantity} Quantity):  <MdCurrencyRupee /><span className='font-semibold'>{totalPrice.toFixed(2)}</span>
                        </p>
                        <button
                            onClick={() => placeSingleItemOrder(selectedItem)}
                            className="mt-4 font-semibold bg-[#172554] text-white px-3 py-[6px] rounded-2xl"
                        >
                            Place Order
                        </button>
                    </div>
                </li>
            </ul>

            <div>
                <p className='font-bold mb-5'>Delivering To :</p>
                {userAddress.map((res) => (
                    <>
                        <p className="font-semibold">{res.fullName}, {res.street}, {res.city} {res.zip}, {res.state}, {res.country}</p>
                    </>
                ))}
            </div>
        </div >
    );
};

export default CheckoutPage;
