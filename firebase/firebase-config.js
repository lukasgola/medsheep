// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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


export async function createUser(email, password) {
    return (
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
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
        })
    )
}