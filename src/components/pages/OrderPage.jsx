import React, { useContext } from 'react'
import { StateContext } from '../states/StateProvider';
import { Link } from 'react-router-dom';
import Loader from '../layout/Loader';

const OrderPage = () => {

    const { showOrders, truncateText } = useContext(StateContext);

    return (
        <>
            {showOrders.length !== 0 ?
                <div id='Order-Container' className="p-10 bg-white w-[90vw] shadow-md mx-auto rounded-lg mt-12 mb-24">
                    <h1 className='text-[26px] font-semibold mb-9 text-center text-blue-950'>Your Orders</h1>
                    {showOrders.map((product) => (
                        <Link key={product.id} to={`/product/${product.items.id}`}>
                            <div id='Orders' className="flex items-center pt-4 pb-8 border-b border-[#172554] gap-9 mb-9">
                                <img
                                    src={product.items.image}
                                    alt="Product"
                                    className="w-[25vw] h-[40vh]"
                                />
                                <div>
                                    <h2 className="text-lg font-semibold mb-2">{product.items.title}</h2>
                                    <p className="text-md mb-2">{truncateText(product.items.description, 80)}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                :
                <Loader />
            }
        </>
    )
}

export default OrderPage
