import React, { useContext } from 'react'
import { StateContext } from '../states/StateProvider';
import { Link } from 'react-router-dom';

const OrderPage = () => {

    const { showOrders } = useContext(StateContext);

    return (

        <>
            <div className="p-10 bg-white shadow-md mx-10 rounded-lg mt-12 mb-24">
                <h1 className='text-[26px] font-semibold mb-9'>Your Orders</h1>
                {showOrders.map((product) => (
                    <Link key={product.id} to={`/product/${product.items.id}`}>
                        <div className="flex pt-4 pb-8 border-b border-[#172554] gap-9 mb-9">
                            <img
                                src={product.items.image}
                                alt="Product"
                                className="w-[20vw] h-[40vh] mix-blend-multiply"
                            />
                            <div>
                                <h2 className="text-lg font-semibold mb-2">{product.items.title}</h2>
                                <p className="text-lg mb-2">{product.items.description}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default OrderPage
