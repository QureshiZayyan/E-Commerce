import { useEffect, useContext, useState } from "react";
import { MdStarRate, MdCurrencyRupee, MdDone } from "react-icons/md";
import { Link } from "react-router-dom";
import { StateContext } from "../states/StateProvider";
import Loader from "../layout/Loader";

const ProductList = () => {
  const { allProducts, setAllProducts, addToCart, truncateText, cart, setProducts, products, dropDown, setDropDown } = useContext(StateContext);

  const FetchData = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) throw new Error("Error fetching data");
      const data = await response.json();
      setProducts(data);
      setAllProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  useEffect(() => {
    if (products.length === 0) return;

    if (dropDown === 'All') {
      setAllProducts(products);
    } else {
      const filtered = products.filter(item => item.category === dropDown);
      setAllProducts(filtered);
    }
  }, [dropDown]);

  return (
    <div id="Product-List-Container">
      {
        allProducts?.length > 0 ? (
          <>
            <div id="select-parent" className="flex items-center mx-14 gap-4 mt-7 font-semibold">
              Sort By Category
              <select
                className="bg-slate-200 border border-[#172554] rounded-2xl px-2 py-2 focus:outline-none"
                onChange={(e) => setDropDown(e.target.value)}
                value={dropDown}
              >
                {['All', `men's clothing`, `women's clothing`, 'electronics'].map(qty => (
                  <option key={qty} value={qty}>
                    {qty}
                  </option>
                ))}
              </select>
            </div>

            <div id="productCard-Container" className="grid place-items-center mt-9 mb-9">
              {allProducts.map((product) => (
                <div
                  key={product.id}
                  id="productCard"
                  className="bg-white mb-10 relative w-[30vw] h-[370px] px-4 py-3 rounded-xl shadow-md flex flex-col"
                >
                  <Link to={`product/${product.id}`}>
                    <img
                      loading="lazy"
                      src={product.image}
                      alt={product.title}
                      className="w-[95%] mx-auto h-[120px] mb-4"
                    />
                    <h2 className="text-base font-semibold">
                      {truncateText(product.title, 24)}
                    </h2>
                  </Link>

                  <div className="absolute bottom-[20px] left-4">
                    <Link to={`product/${product.id}`}>
                      <p className="text-yellow-500 mb-2">
                        <MdStarRate className="mr-1 inline" color="#EAB308" />
                        {product.rating?.rate}
                      </p>
                      <p className="font-semibold mb-4">
                        <MdCurrencyRupee className="inline" />
                        {product.price}
                      </p>
                    </Link>

                    <button
                      onClick={() => addToCart(product)}
                      className="flex items-center text-[13px] bg-[#172554] text-white font-semibold py-[6px] px-[10.2px] rounded-2xl"
                    >
                      {
                        cart.some(item => item.id === product.id) ? (
                          <span className="flex items-center gap-1 text-white">
                            <MdDone color="white" size={18} /> Added
                          </span>
                        ) : (
                          'Add to Cart'
                        )
                      }
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <Loader />
        )
      }
    </div>
  );
};

export default ProductList;
