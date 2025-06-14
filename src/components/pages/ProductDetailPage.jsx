import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import { MdCurrencyRupee } from "react-icons/md";
import { MdStarRate } from "react-icons/md";
import Button from '../layout/Button';
import { StateContext } from '../states/StateProvider';

const ProductDetailPage = () => {

    const { products, addToCart, selectedItem, quantity, setQuantity, totalPrice, setTotalPrice } = useContext(StateContext);
    const [selectedProduct, setSelectedProduct] = useState([]);
    const { id } = useParams();

    const handleQuantityChange = (e) => {
        const qty = parseInt(e.target.value);
        setQuantity(qty);
    };

    useEffect(() => {
        if (products) {
            const foundProduct = products.find((item) => item.id === parseInt(id));
            setSelectedProduct(foundProduct || null);
        }
    }, [id])

    useEffect(() => {
        if (selectedProduct) {
            setTotalPrice(selectedProduct.price * quantity);
        }
    }, [selectedProduct, quantity]);

    if (!selectedProduct) {
        return <p>Blog not found</p>;
    }
    return (
        <>
            <div id="Product-Detail-Page" className="p-16 flex justify-center md:flex-row gap-12">
                <div className='w-[30vw]'>
                    <img
                        src={selectedProduct.image}
                        alt="Product"
                        className="rounded-lg w-full h-[200px]"
                        loading='lazy'
                    />
                </div>

                <div className="w-[50vw]">
                    <h1 className="text-2xl font-bold mb-4">{selectedProduct.title}</h1>
                    <p className="text-black mb-4">
                        {selectedProduct.description}
                    </p>
                    {/* <p className="my-3 flex"><MdStarRate className='mr-[2px]' size={18} />{selectedProduct.rating.rate}</p> */}
                    <p className="text-2xl flex items-center"><MdCurrencyRupee />{selectedProduct.price}</p>

                    <div className="flex items-center gap-4 mt-4">
                        <select className='bg-slate-200 py-2 w-[50px] px-1 rounded-md' value={quantity} onChange={handleQuantityChange}>
                            {[1, 2, 3, 4, 5].map(qty => (
                                <option key={qty} value={qty}>
                                    {qty}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center my-8 gap-3">
                        {/* <p className="text-lg font-semibold text-green-700">In Stock</p> */}
                        <Button addToCart={() => addToCart(selectedProduct)} product={selectedProduct} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetailPage
