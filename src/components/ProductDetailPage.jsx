import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import { StateContext } from './StateProvider';
import { MdCurrencyRupee } from "react-icons/md";
import { MdStarRate } from "react-icons/md";
import Button from './Button';

const ProductDetailPage = () => {

    const { products } = useContext(StateContext);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        if (products) {
            const foundProduct = products.find((item) => item.id === parseInt(id));
            setSelectedProduct(foundProduct || null);
        }
    }, [id]);

    if (!selectedProduct) {
        return <p>Blog not found</p>;
    }
    return (
        <>
            <div className="p-16 flex justify-center md:flex-row gap-12">
                <div className='w-[38vw]'>
                    <img
                        src={selectedProduct.image}
                        alt="Product"
                        className="rounded-lg w-full h-[50vh] mix-blend-multiply"
                    />
                </div>

                <div className="w-[50vw]">
                    <h1 className="text-2xl font-bold mb-4">{selectedProduct.title}</h1>
                    <p className="text-black mb-4">
                        {selectedProduct.description}
                    </p>
                    <p className="my-3 flex"><MdStarRate className='mr-[2px]' size={18} />{selectedProduct.rating.rate}</p>
                    <p className="text-2xl flex items-center"><MdCurrencyRupee />{selectedProduct.price}</p>

                    <div className="flex items-center gap-4 mt-4">
                        <label className="font-medium">Quantity:</label>
                        <select className="border p-2 rounded-md">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>

                    <div className="flex items-center my-8 gap-3">
                        {/* <p className="text-lg font-semibold text-green-700">In Stock</p> */}
                        <Button />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetailPage
