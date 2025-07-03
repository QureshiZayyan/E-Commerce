
import React, { useContext, useEffect } from 'react';
import { StateContext } from '../states/StateProvider';
import { MdCurrencyRupee } from "react-icons/md";
import { useParams } from 'react-router-dom';

const CheckoutPage = () => {
    const { placeOrders, products, truncateText, cart, selectedItem, setSelectedItem, userAddress, checkedItems } = useContext(StateContext);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const numericId = parseInt(id);
            const foundProduct = cart.find(
                (p) => p.id === numericId
            );
            setSelectedItem(foundProduct);
        } else {
            setSelectedItem(null)
        }
    }, [id]);

    const total = checkedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalIems = checkedItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div id='Checkout-Container' className="my-10 mx-auto py-8 w-[85vw] bg-white rounded-lg px-10 shadow-md">
            <h1 className='text-2xl font-semibold mb-12 text-center text-[#172554]'>Confirm Your Order</h1>
            <ul>
                {selectedItem ?
                    <li key={selectedItem.id} className="Checkout flex items-center pt-4 pb-8 border-b border-[#172554] gap-14 mb-9">
                        <img
                            src={selectedItem.image}
                            alt="Product"
                            className="w-[20vw] h-[32vh]"
                            loading="lazy"
                        />
                        <div>
                            <h2 className="text-[18px] font-semibold mb-2">{selectedItem.title}</h2>
                            <p className="flex items-center text-[18px] text-black">
                                Quantity : {selectedItem.quantity} X <MdCurrencyRupee className="ml-2" />
                                <span className='font-semibold'>{(selectedItem.price).toFixed(2)}</span>
                            </p>
                        </div>
                    </li>
                    :
                    checkedItems.map((product) => (
                        <li key={product.id} className="Checkout flex items-center mb-9 pt-4 pb-8 border-b border-[#172554] gap-9 mt-7">
                            <img
                                src={product.image}
                                alt="Product"
                                className="w-[200px] h-[28vh]"
                            />
                            <div className='ml-4'>
                                <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
                                {/* <p className="text-md mb-2">{truncateText(product.description, 80)}</p> */}
                                {/* <p className="flex items-center text-[18px] text-black">
                                    (Quantity {quantity}):  <MdCurrencyRupee /><span className='font-semibold'>{totalPrice.toFixed(2)}</span>
                                </p> */}
                                <p className="flex items-center text-[18px] text-black">
                                    Quantity : {product.quantity} X <MdCurrencyRupee className="ml-2" />
                                    <span className='font-semibold'>{(product.price).toFixed(2)}</span>
                                </p>
                            </div>
                        </li>
                    ))
                }

                {/* {selectedItem ?
                    (<p className='text-[18px] flex items-center mb-5'>Subtotal ({totalIems} Items) : <span className='font-semibold flex items-center'><MdCurrencyRupee className="ml-2" />{total}</span></p>)
                    :
                    (<p className='text-[18px] flex items-center mb-5'>Subtotal ({selectedItem.quantity} Items) : <span className='font-semibold flex items-center'><MdCurrencyRupee className="ml-2" /></span></p>)
                } */}

                {selectedItem ? (<button
                    onClick={() => placeOrders(selectedItem)}
                    className="font-semibold bg-[#172554] text-white px-3 py-[6px] rounded-2xl"
                >
                    Place Order
                </button>)
                    :
                    (<button
                        onClick={() => placeOrders(checkedItems)}
                        className="font-semibold bg-[#172554] text-white px-3 py-[6px] rounded-2xl"
                    >
                        Place Order
                    </button>)
                }
            </ul>

            <div className='border-t-[0.2px] border-[#000000] mt-7'>
                <p className='font-bold mb-5 mt-7'>Delivering To :</p>
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
