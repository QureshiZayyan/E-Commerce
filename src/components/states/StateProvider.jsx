import { useState, createContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { query, collection, getDocs, addDoc, where, serverTimestamp } from "firebase/firestore";
import { toast, Zoom } from 'react-toastify';

const StateContext = createContext();

function StateProvider({ children }) {

    const [allProducts, setAllProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState(null);
    const [userAddress, setUserAddress] = useState([]);
    const [showOrders, setShowOrders] = useState([]);
    const [selectedItem, setSelectedItem] = useState();
    const [userProfile, setUserProfile] = useState(false);
    const [checkedItems, setCheckedItems] = useState([]);
    const [dropDown, setDropDown] = useState('All');
    const [products, setProducts] = useState([]);
    const totalPrice = checkedItems.length > 0 && checkedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = checkedItems.length > 0 && checkedItems.reduce((sum, item) => sum + item.quantity, 0);

    const truncateText = (text, maxLength) => {
        if (!text) return "";
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + "...";
    };

    const placeOrders = async (itemId) => {

        const orderData = {
            userId: user.uid,
            items: selectedItem || checkedItems,
            PriceTotal: selectedItem?.price * selectedItem?.quantity || totalPrice,
            quantity: selectedItem?.quantity || totalItems,
            userAddress,
        };

        try {
            await addDoc(collection(db, "orders"), orderData);
            toast.success("Order Placed", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                theme: 'light',
                closeOnClick: true,
                transition: Zoom,
                Limit: 1,
            });
        } catch (err) {
            console.error("Error placing order:", err);
            toast.error("Oops Something Went Wrong", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                theme: 'light',
                closeOnClick: true,
                transition: Zoom,
                Limit: 1,
            });
        }
    };

    useEffect(() => {
        const saved = localStorage.getItem("cartItems");
        if (saved) {
            setCart(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (CurrentUser) => {
            setUser(CurrentUser);
        });

        return () => unsubscribe();
    }, []);

    const addToCart = (product) => {
        const check = cart.some(item => item.id === product.id);
        if (check) return;

        const updatedCart = [...cart, { ...product, checked: true, quantity: 1 }];
        setCart(updatedCart);
        // setCart(prev => [...prev, { ...product, checked: false }]);
    }

    const FetchUserAddress = async () => {
        const q = query(
            collection(db, "addresses"),
            where("userId", "==", user.uid));

        const response = await getDocs(q);
        const UserData = response.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setUserAddress(UserData);
        setUserProfile(true);
    };

    const FetchUserOrders = async () => {
        const q = query(
            collection(db, "orders"),
            where("userId", "==", user.uid));

        const response = await getDocs(q);
        const Orders = response.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setShowOrders(Orders);
        // console.log(Orders);
    };

    useEffect(() => {
        const fetchDataAndOrders = async () => {
            if (user?.uid) {
                await FetchUserAddress();
                await FetchUserOrders();
            }
        };

        fetchDataAndOrders();
    }, [user]);

    return (
        <StateContext.Provider value={{
            FetchUserAddress, setAllProducts, allProducts, user, setUser, cart, setCart, addToCart, userAddress, setUserAddress,
            placeOrders, showOrders, setShowOrders, selectedItem, setSelectedItem, totalPrice, totalItems,dropDown, setDropDown,
            truncateText, userProfile, setUserProfile, checkedItems, setCheckedItems, setProducts, products
        }}>
            {children}
        </StateContext.Provider>
    );
}

export { StateContext, StateProvider };
