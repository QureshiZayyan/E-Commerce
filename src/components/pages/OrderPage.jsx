import React, { useContext, useState } from 'react'
import { StateContext } from '../states/StateProvider';

const OrderPage = () => {

    const { showOrders, truncateText } = useContext(StateContext);

    return (
        <>
            {showOrders.length === 0 && (<h2 className='text-xl font-semibold text-center mt-[100px] text-[#172554]'>No Orders To Show</h2>)}

            {showOrders.length > 0 && <div id='Order-Container' className="p-10 bg-white w-[85vw] shadow-md mx-auto rounded-lg mt-12 mb-24">
                <h1 className='text-[26px] font-semibold mb-9 text-center text-blue-950'>Your Orders</h1>
                {showOrders.map((product) => (
                    product.items.length > 0 && product.items.map((products) =>
                        <div key={products.id} id='Orders' className="flex items-center pt-4 pb-8 border-b border-[#172554] gap-9 mb-9">
                            <img
                                src={products.image}
                                alt='product'
                                className="w-[22vw] h-[140px]"
                            />
                            <div>
                                <h2 className="text-lg font-semibold mb-2">{products.title}</h2>
                                <p className="text-md mb-2">{truncateText(products.description, 80)}</p>
                            </div>
                        </div>
                    ))
                )}

                {showOrders.map((product) => (
                    <div key={product.id} id='Orders' className="flex items-center pt-4 pb-8 border-b border-[#172554] gap-9 mb-9">
                        <img
                            src={product.items.image}
                            className="w-[22vw] h-[140px]"
                            alt='product'
                        />
                        <div>
                            <h2 className="text-lg font-semibold mb-2">{product.items.title}</h2>
                            <p className="text-md mb-2">{truncateText(product.items.description, 80)}</p>
                        </div>
                    </div>
                ))
                }
            </div>
            }
        </>
    )
}

export default OrderPage