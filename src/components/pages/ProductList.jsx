import { useEffect, useContext } from "react";
import { MdStarRate } from "react-icons/md";
import { MdCurrencyRupee } from "react-icons/md";
import { Link } from "react-router-dom";
import { StateContext } from "../states/StateProvider";

const ProductList = () => {
  const { products, setProducts, addToCart } = useContext(StateContext);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const FetchData = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) throw new Error("Error fetching data");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <div id="productCard-Container" className="grid mx-7 place-items-center grid-cols-2 sm:grid-cols-2 md:grid-cols-4 my-10">
      {products.map((product) => (
        <div
          key={product.id}
          id="productCard"
          className="bg-white mb-10 relative w-[22vw] h-[370px] px-4 py-3 rounded-xl shadow-md flex flex-col"
        >
          <Link to={`product/${product.id}`}>
            <img
              loading="lazy"
              src={product.image}
              alt={product.title}
              className="w-[200px] mx-auto h-40 mb-4"
            />
            <h2 className="text-base font-semibold">
              {truncateText(product.title, 24)}
            </h2>
          </Link>

          {/* Bottom Content Container */}
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
              className="text-[13px] bg-[#172554] text-white font-semibold py-[6px] px-[10.2px] rounded-2xl"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>

  );
};

export default ProductList;