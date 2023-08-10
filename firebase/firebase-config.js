// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { collection, setDoc, getDoc, addDoc, doc, updateDoc } from "firebase/firestore"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiMPdlJ45nfnTbu4iEHHY97-iqr7ABFEk",
  authDomain: "medsheep-1888f.firebaseapp.com",
  projectId: "medsheep-1888f",
  storageBucket: "medsheep-1888f.appspot.com",
  messagingSenderId: "1066926977537",
  appId: "1:1066926977537:web:05074e5783cebe7d4fc600"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


export async function createUser(name, lastName, email, password) {
    return (
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            adduser(userCredential.user.uid, name, lastName, email, null)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            // ..
        })
    )
}


export async function signIn(email, password) {
    return (
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
        })
    )
}

export async function adduser(uid, name, lastName, email, avatar){
    try {
        await setDoc(doc(db, "users", uid), {
        name: name,
        lastName: lastName,
        email: email,
        avatar: avatar,
        birthdate: null,
        height: null,
        weight: null,
        blood: null
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function setPersonalData(uid, birth, height, weight, blood){
    try {
        await updateDoc(doc(db, "users", uid), {
            birthdate: birth,
            height: height,
            weight: weight,
            blood: blood
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function addToBasket(product, number, price){
    try {
      await addDoc(collection(db, `users/${auth.currentUser.uid}/basket`), {
        product: product,
        number: number,
        price: price
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  export async function addToCalendar(event){
    try {
      await addDoc(collection(db, `users/${auth.currentUser.uid}/calendar`), {
        title: event.title,
        freq: event.freq,
        dateStart: event.dateStart,
        dayStart: event.dayStart,
        monthStart: event.monthStart,
        yearStart: event.yearStart,
        dateEnd: event.dateEnd,
        dayStart: event.dayStart,
        monthEnd: event.monthEnd,
        yearEnd: event.yearEnd,
        timeHour: event.timeHour,
        timeMinutes: event.timeMinutes,
        dateStartString: event.dateStartString,
        dateEndString: event.dateEndString,
        startTimestamp: event.startTimestamp,
        endTimestamp: event.endTimestamp,
        takenArray: event.takenArray
      }).then(function(docRef) {
        console.log("Document written with ID: ", event.startTimestamp);
        for(var i=event.startTimestamp; i <= event.endTimestamp; i+=86400000){
          addDoc(collection(db, `users/${auth.currentUser.uid}/calendar/${docRef.id}/takenArray`), {
            id: i,
            taken: false
          });
        }
            
    })
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
