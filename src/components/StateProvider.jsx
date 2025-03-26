import { useState, createContext, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const StateContext = createContext();

function StateProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState(null);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    return (
        <StateContext.Provider value={{ setProducts, products, user, setUser }}>
            {children}
        </StateContext.Provider>
    );
}

export { StateContext, StateProvider };