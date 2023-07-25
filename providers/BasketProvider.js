import * as React from 'react';

//Firebase
import { auth, db } from '../firebase/firebase-config';
import { getDocs, collection } from "firebase/firestore";

export const BasketContext = React.createContext({
    basket: [],
    setBasket: () => {}
});

export const BasketProvider = (props) => {

    const [basket, setBasket] = React.useState([]);

    const getBasket = async () => {
        const querySnapshot = await getDocs(collection(db, "users", auth.currentUser.uid, "basket"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const data = {
                ...doc.data(),
                id: doc.id,
            }
            setBasket(old => [...old, data])
        });
    }
    

    // Listening to changes of device appearance while in run-time
    React.useEffect(() => {
        setBasket([]);
        if(auth.currentUser){
            getBasket();
        }
    }, []);

    const basketObject = {
        basket,
        setBasket: (data) =>  setBasket([...basket, data])
    }

  return (
        <BasketContext.Provider value={basketObject}>
            {props.children}
        </BasketContext.Provider>
    );
};

// Custom hook to get the theme object returns {isDark, colors, setScheme}
export const useBasket = () => React.useContext(BasketContext);