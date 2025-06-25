import { useState, createContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { query, collection, getDocs, addDoc, where, serverTimestamp } from "firebase/firestore";
import { toast, Zoom } from 'react-toastify';

const StateContext = createContext();

function StateProvider({ children }) {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState(null);
    const [userAddress, setUserAddress] = useState([]);
    const [showOrders, setShowOrders] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [userProfile, setUserProfile] = useState(false);

    const truncateText = (text, maxLength) => {
        if (!text) return "";
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + "...";
    };

    const placeSingleItemOrder = async (itemId) => {

        const orderData = {
            userId: user.uid,
            items: selectedItem,
            // items: cart,
            // total: selectedItem.price,
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
        // if (saved) {
        setCart(JSON.parse(saved));
        // }
    }, []);

    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem("cartItems", JSON.stringify(cart));
        }
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

        // const updatedCart = [...cart, product];
        // setCart(updatedCart);

        setCart(prev => [...prev, { ...product, checked: false }]);

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
        console.log(UserData);

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
        console.log(Orders);
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
            FetchUserAddress, setProducts, products, user, setUser, cart, setCart, addToCart, userAddress, setUserAddress,
            placeSingleItemOrder, showOrders, setShowOrders, selectedItem, setSelectedItem, setQuantity, quantity, setTotalPrice, totalPrice,
            truncateText, userProfile, setUserProfile
        }}>
            {children}
        </StateContext.Provider>
    );
}

export { StateContext, StateProvider };
