import * as React from 'react';

//Firebase
import { auth, db } from '../firebase/firebase-config';
import { getDocs, collection } from "firebase/firestore";

export const KitContext = React.createContext({
    kit: [],
    setKit: () => {}
});

export const KitProvider = (props) => {

    const [kit, setKit] = React.useState([]);

    const getKit = async () => {
        const querySnapshot = await getDocs(collection(db, "users", auth.currentUser.uid, "kit"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const data = {
                ...doc.data(),
                id: doc.id,
            }
            setKit(old => [...old, data])
        });
    }
    

    // Listening to changes of device appearance while in run-time
    React.useEffect(() => {
        setKit([]);
        if(auth.currentUser){
            getKit();
        }
    }, []);

    const kitObject = {
        kit,
        setKit: (data) =>  setKit([...kit, data]),
        setNewKit: (data) => setKit(data)
    }

  return (
        <KitContext.Provider value={kitObject}>
            {props.children}
        </KitContext.Provider>
    );
};

// Custom hook to get the theme object returns {isDark, colors, setScheme}
export const useKit = () => React.useContext(KitContext);