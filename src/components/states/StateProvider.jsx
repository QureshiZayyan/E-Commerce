import { useState, createContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

const StateContext = createContext();

function StateProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState(null);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (CurrentUser) => {
            setUser(CurrentUser);
        });

        return () => unsubscribe();
    }, []);

    return (
        <StateContext.Provider value={{
            setProducts, products, user, setUser, cart, setCart, addToCart
        }}>
            {children}
        </StateContext.Provider>
    );
}

export { StateContext, StateProvider };