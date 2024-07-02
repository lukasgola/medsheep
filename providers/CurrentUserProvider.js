import * as React from 'react';

//Firebase
import { auth, db } from '../firebase/firebase-config';
import { getDoc, doc } from "firebase/firestore";

export const CurrentUserContext = React.createContext({
    currentUser: {
        email: 'none',
        name: 'none',
        lastName: 'none',
        avatar: 'https://firebasestorage.googleapis.com/v0/b/medsheep-4763c.appspot.com/o/default-user.jpg?alt=media&token=1a67afad-307b-410b-a6dc-977527c0cdab',
        birthdate: null,
        height: 'none',
        weight: 'none',
        blood: 'none'
    },
    setCurrentUser: () => {}
});

export const CurrentUserProvider = (props) => {

    const [currentUser, setCurrentUser] = React.useState({})

    const getCurrentUser = () => {
        getDoc(doc(db, "users", auth.currentUser.uid))
        .then(docSnap => {
        if (docSnap.exists()) {
            //console.log("Document data:", docSnap.data());
            const user = {
                ...docSnap.data()
            }


            const birthdate = user.birthdate.toDate();
            console.log(birthdate.getTime())

            setCurrentUser({
                name: user.name,
                email: user.email,
                avatar: user.avatar.downloadURL,
                lastName: user.lastName,
                birthdate: birthdate.getTime(),
                height: user.height,
                weight: user.weight,
                blood: user.blood
            })
        } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        }
        })
    }
    

    // Listening to changes of device appearance while in run-time
    React.useEffect(() => {
        if(auth.currentUser){
            getCurrentUser()
        }
    }, [auth.currentUser]);

    const user = {
        currentUser,
        setCurrentUser: setCurrentUser
    }

  return (
        <CurrentUserContext.Provider value={user}>
            {props.children}
        </CurrentUserContext.Provider>
    );
};

// Custom hook to get the theme object returns {isDark, colors, setScheme}
export const useCurrentUser = () => React.useContext(CurrentUserContext);