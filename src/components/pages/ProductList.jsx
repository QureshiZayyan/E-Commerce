import { useEffect, useContext } from "react";
import { MdStarRate } from "react-icons/md";
import { MdCurrencyRupee } from "react-icons/md";
import { Link } from "react-router-dom";
import { StateContext } from "../states/StateProvider";
import Button from "../layout/Button";

const ProductList = () => {
  const { products, setProducts, addToCart } = useContext(StateContext);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  }

  const FetchData = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products`);
      if (!response.ok) throw new Error('Error fetching data');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <div id="cards-container" className="grid md:grid-cols-3 lg:grid-cols-4 md:mx-[10vw] lg:mx-[4vw] my-12">
      {
        products.map((product) => (
          <div key={product.id} id='card' className="card relative w-[40vw] xl:w-[18vw] md:w-[28vw] lg:w-[20.3vw] my-[22px] hover:opacity-[5] shadow-md bg-slate-100 rounded-[8px]">

            <Link to={`/product/${product.id}`}>
              <div id="card-img">
                <img src={product.image} alt="Article" id="newsimg" className="md:h-[130px] w-full p-[10px] rounded-[15px]" loading="lazy" />
              </div>
              <div className="h-[198px] text-black text-sm px-[9px] pt-[4px]">
                <h2 id="news-desc" className="font-[595]">{truncateText(product.title, 50)}</h2>
              </div>
            </Link>

            <div className="absolute bottom-[55px] px-[9px] text-black text-sm">
              <p className="my-3 flex"><MdStarRate size={18} className="mr-[2px]" />{product.rating.rate}</p>
              <p className="my-3 flex items-center"><MdCurrencyRupee />{product.price}</p>
            </div>

            <div className="gap-2 absolute bottom-[12.5px] px-[9px]">
              <Button addToCart={() => addToCart(product)} product={product} />
            </div>
          </div>
        ))}
    </div>
  )
}

export default ProductList;
