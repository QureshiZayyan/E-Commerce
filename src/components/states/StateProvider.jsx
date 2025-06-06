import { useState, createContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { query, collection, getDocs, addDoc, where, serverTimestamp } from "firebase/firestore";

const StateContext = createContext();

function StateProvider({ children }) {
    // const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState(null);
    const [userAddress, setUserAddress] = useState([]);
    const [orders, setOrders] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    const placeSingleItemOrder = async (itemId) => {

        if (!user) {
            alert("Please login to place order.");
            return;
        }

        // const selectedItem = cart.find(item => item.id === itemId);

        if (!selectedItem) {
            alert("Item not found in cart.");
            return;
        }

        const orderData = {
            userId: user.uid,
            items: [selectedItem],
            total: selectedItem.price * selectedItem.qty,
            createdAt: serverTimestamp(),
            shippingAddress: {
                // name: "Zayyan",
                // phone: "1234567890",
                // city: "Mumbai",
                // pincode: "400001"
                userAddress
            }
        };

        try {
            await addDoc(collection(db, "orders"), orderData);
            alert("✅ Order placed for one item!");

        } catch (err) {
            console.error("Error placing order:", err);
            alert("❌ Failed to place order.");
        } finally {
            // navigate('/checkout')
        }
    };

    // useEffect(() => {
    //     placeSingleItemOrder();
    // }, []);

    useEffect(() => {
        const saved = localStorage.getItem("cartItems");
        if (saved) {
            setCart(JSON.parse(saved));
        }
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

    // Add to cart function
    const addToCart = (product) => {
        const check = cart.some(item => item.id === product.id);
        if (check) return;

        const updatedCart = [...cart, product];
        setCart(updatedCart);
    };

    const FetchData = async () => {
        const q = query(
            collection(db, "addresses"),
            where("userId", "==", user.uid));

        const querySnapshot = await getDocs(q);
        const UserData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setUserAddress(UserData);
        console.log(UserData);
    };

    useEffect(() => {
        if (user?.uid) {
            FetchData();
        }
    }, [user]);


    const FetchOrderData = async () => {
        const q = query(
            collection(db, "addresses"),
            where("userId", "==", user.uid));

        const querySnapshot = await getDocs(q);
        const UserData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setOrders(UserData);
        // console.log(UserData);
    };

    useEffect(() => {
        if (user?.uid) {
            FetchOrderData();
        }
    }, [user]);


    return (
        <StateContext.Provider value={{
            FetchData, setProducts, products, user, setUser, cart, setCart, addToCart, userAddress, setUserAddress,
            placeSingleItemOrder, setOrders, orders, selectedItem, setSelectedItem
        }}>
            {children}
        </StateContext.Provider>
    );
}

export { StateContext, StateProvider };
