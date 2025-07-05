import { useEffect, useContext, useState } from "react";
import { MdStarRate, MdCurrencyRupee } from "react-icons/md";
import { data, Link } from "react-router-dom";
import { StateContext } from "../states/StateProvider";
import Loader from "../layout/Loader";
import { MdDone } from "react-icons/md";

const ProductList = () => {
  const { allProducts, setAllProducts, addToCart, truncateText, cart } = useContext(StateContext);
  const [dropDown, setDropDown] = useState(`All`);
  const [products, setProducts] = useState([]);

  const FetchData = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) throw new Error("Error fetching data");
      const data = await response.json();
      setAllProducts(data);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  useEffect(() => {

    if (products.length === 0 || !dropDown) return;
    // if (dropDown === 'All') {
    //   setAllProducts(products)
    // }
    const filtered = products.filter(item => item.category === dropDown);
    console.log(filtered);
    dropDown === 'All' ? setAllProducts(products) : setAllProducts(filtered)
    // setAllProducts(filtered);
  }, [dropDown])

  // useEffect(() => {

  //   if (products.length === 0 || !dropDown) return

  //   const filtered = products.filter(item => item.category === dropDown);
  //   console.log(filtered);

  //   // setAllProducts(filtered);
  // }, [dropDown, products])

  // useEffect(() => {
  //   const filtered = products.filter(item => item.category === dropDown);
  //   console.log(filtered);
  //   // setAllProducts(filtered);
  //   // }
  // }, [dropDown])

  return (
    <div id="Product-List-Container">
      <div className="flex items-center mx-14 gap-4 mt-7 font-semibold">
        Sort By Category
        <select className='bg-slate-200 py-2 px-1 rounded-md border-none' onChange={(e) => setDropDown(e.target.value)}>
          {['All', `men's clothing`, `women's clothing`, 'electronics'].map(qty => (
            <option key={qty} value={qty}>
              {qty}
            </option>
          ))}
        </select>
      </div>

      <div id="productCard-Container" className="grid mx-7 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center mt-9 mb-11">

        {allProducts?.length > 0 ?

          allProducts.map((product) => (
            <div
              key={product.id}
              id="productCard"
              className="bg-white mb-10 relative w-[25vw] md:w-[28vw] lg:w-[21.5vw] h-[370px] px-4 py-3 rounded-xl shadow-md flex flex-col"
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
          ))
          :
          (
            <Loader />
          )
        }
      </div>
    </div>
  );
};

export default ProductList;
