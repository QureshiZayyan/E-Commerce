import { useState, createContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

const StateContext = createContext();

function StateProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (CurrentUser) => {
            setUser(CurrentUser);
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