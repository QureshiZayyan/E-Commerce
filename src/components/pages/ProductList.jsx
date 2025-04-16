import { useEffect, useContext } from "react";
import { MdStarRate } from "react-icons/md";
import { MdCurrencyRupee } from "react-icons/md";
import { Link } from "react-router-dom";
import Button from "../layout/Button";
import { StateContext } from "../states/StateProvider";

const ProductList = () => {
  const { products, setProducts, addToCart, cart } = useContext(StateContext);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  }

  const FetchData = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products`);
      if (!response.ok) throw new Error('Error fetching data');
      const data = await response.json();
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <div id="cards-container" className="grid md:grid-cols-3 lg:grid-cols-4 md:mx-[10vw] lg:mx-[4vw] place-items-center my-10">
      {
        products.map((product) => (
          <div key={product.id} id='card' className="card relative xl:w-[18vw] md:w-[28vw] lg:w-[20.3vw] my-[22px] hover:opacity-[5] shadow-xl bg-slate-200 rounded-[8px] overflow-hidden">
            <Link to={`/product/${product.id}`}>
              <div id="card-img">
                <img src={product.image} alt="Article" id="newsimg" className="md:h-[130px] w-full p-[10px] rounded-[15px]" />
              </div>
              <div className="h-[198px] text-black text-sm px-[9px] pt-[4px]">
                <h2 id="news-desc" className="font-[595]">{truncateText(product.title, 50)}</h2>
                <div id="rating-price" className="absolute bottom-[55px]">
                  <p className="my-3 flex"><MdStarRate size={18} className="mr-[2px]" />{product.rating.rate}</p>
                  <p className="my-3 flex items-center"><MdCurrencyRupee />{product.price}</p>
                </div>
                <div className="flex items-center gap-2 absolute bottom-[12.5px]">
                  <Button addToCart={() => {
                    if (cart.find(item => item.id === product.id)) return;
                    addToCart(product)
                  }} />
                </div>
              </div>
            </Link>
          </div>
        ))
      }
    </div>
  )
};

export default ProductList;
