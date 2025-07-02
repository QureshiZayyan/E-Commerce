import React, { useContext, useEffect } from 'react'
import { StateContext } from '../states/StateProvider'
import { MdCurrencyRupee } from "react-icons/md";
import { toast, Zoom } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, user, setCart, quantity, setQuantity, checkedItems, setCheckedItems } = useContext(StateContext);

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
  }

  const handleQuantityChange = (e) => {
    const qty = parseInt(e.target.value);
    setQuantity(qty);
  };

  const toggleAll = (checked) => {
    setCart(prev =>
      prev.map(item => ({ ...item, checked }))
    );
  };

  // const toggleCheck = (id) => {
  //   setCart(prev =>
  //     prev.map(item =>
  //       item.id === id ? { ...item, checked: !item.checked } : item
  //     )
  //   );
  // };

  const toggleCheck = (id) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    )
    );
  };

  const handleBuyNow = (product) => {
    if (!user) {
      toast.info("Please login to place the order.", {
        position: 'top-center',
        bodyClassName: 'txt',
        autoClose: 2000,
        hideProgressBar: true,
        theme: 'light',
        closeOnClick: true,
        transition: Zoom,
      });
      return;
    }
    navigate(checkedItems.length > 0 ? '/checkout' : `/item/${product.id}`);
  };

  const allSelected = cart.every(item => item.checked);

  useEffect(() => {

    if (cart.length > 0) {
      const filteredCheckedItems = cart.filter(item => item.checked);
      setCheckedItems(filteredCheckedItems);
      console.log("Checked Items =", filteredCheckedItems);
    }
  }, [cart])

  return (
    <div id='cart-container' className="my-10">
      {cart.length === 0 ? (<p className='text-center text-[#172554] font-semibold text-xl mt-[100px]'>Your Cart is Empty</p>)
        :
        <div id='cart' className="mx-auto rounded-lg py-10 px-10 w-[85vw] shadow-md bg-white">
          <h1 className="text-2xl font-bold mb-11 text-center text-[#172554]">Your Shopping Cart</h1>

          {allSelected ? (<button className='font-semibold text-lg' onClick={() => toggleAll(false)}>Unselect All</button>)
            : (<button className='font-semibold text-lg' onClick={() => toggleAll(true)}>Select All</button>)}

          <ul className='mt-4'>
            {cart.map((item) => (

              <li key={item.id} className="flex pt-4 pb-8 border-b-[0.2px] border-[#172554] gap-9 mb-9">

                <input width={100} height={500}
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleCheck(item.id)}
                />

                <Link to={`/product/${item.id}`} className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt="Product"
                    className="w-[180px] h-[32vh]"
                    loading="lazy"
                  />
                </Link>

                <div>
                  <Link to={`/product/${item.id}`}>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="flex items-center my-2 text-[20.5px] text-black">
                      <MdCurrencyRupee />
                      {item.price}
                    </p>
                  </Link>

                  <div className="flex items-center gap-4 mt-4">
                    <select className='bg-slate-200 py-2 h-[40px] w-[45px] px-1 rounded-md' value={quantity} onChange={handleQuantityChange}>
                      {[1, 2, 3, 4, 5].map(qty => (
                        <option key={qty} value={qty}>
                          {qty}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className='mt-3'>
                    <button
                      onClick={() => handleBuyNow(item)}
                      className="text-[13px] font-semibold bg-[#172554] text-white mt-3 py-[6px] px-[10.2px] rounded-2xl"
                    >
                      Buy Now
                    </button>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[13px] font-semibold mx-2 bg-black text-white mt-3 py-[6px] px-[10.2px] rounded-2xl"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {checkedItems.length > 0 && <Link to={'/checkout'} className='text-[14px] font-semibold mx-2 bg-[#172554] text-white mt-3 py-[6px] px-[10.2px] rounded-2xl'>Proceed to Buy</Link>}
        </div>
      }
    </div >
  );
};

export default Cart;
