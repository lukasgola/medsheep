// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";

import { deleteDoc, getFirestore } from "firebase/firestore";
import { collection, setDoc, getDocs, addDoc, doc, updateDoc, query, where, increment } from "firebase/firestore"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
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



export async function addToBasket(product, number, price, basket, setBasket, setNewBasket){

    const result = basket.filter((element) => element.product.name == product.name);
        
    if(result.length !== 0){
        try {
            const q = query(collection(db, "users", auth.currentUser.uid, "basket"), where("product", "==", product));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                const data = {
                    ...doc.data(),
                    id: doc.id,
                }

                let tempBasket = [...basket];

                for(let i = 0; i < tempBasket.length; i++){
                    if(tempBasket[i].id == doc.id){
                        tempBasket[i].number = parseFloat(data.number) + parseFloat(number);
                        tempBasket[i].price = parseFloat(data.price) + parseFloat(price);
                    }
                }

                setNewBasket(tempBasket);

      
                updateDoc(doc.ref, {
                  number: parseFloat(data.number) + parseFloat(number),
                  price: parseFloat(data.price) + parseFloat(price)
                });
                
            });
      
          } catch (e) {
            console.error("Error updating document: ", e);
          }
    }
    else{
        try {
            await addDoc(collection(db, `users/${auth.currentUser.uid}/basket`), {
                product: product,
                number: number,
                price: price
            }).then(function(docRef) {
                setBasket({id: docRef.id, product: product, number: number, price: price})
            });
            } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
  }

  export async function removeFromBasket(id){
    try {
      await deleteDoc(doc(db, `users/${auth.currentUser.uid}/basket/${id}`))
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  }

  export async function addToKit(item, amount, kit, setKit, setNewKit){

    const result = kit.filter((element) => element.product.name == item.name);
        
    if(result.length !== 0){
      console.log('dziala 1');
        try {
            const q = query(collection(db, "users", auth.currentUser.uid, "kit"), where("product", "==", item));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                const data = {
                    ...doc.data(),
                    id: doc.id,
                }

                let tempKit = [...kit];

                for(let i = 0; i < tempKit.length; i++){
                    if(tempKit[i].id == doc.id){
                        tempKit[i].pillNumber = parseFloat(data.pillNumber) + amount;
                    }
                }

                setNewKit(tempKit);

      
                updateDoc(doc.ref, {
                  pillNumber: parseFloat(data.pillNumber) + amount,
                });
                
            });
      
          } catch (e) {
            console.error("Error updating document: ", e);
          }
    }
    else{
      console.log('dziala 2');
        try {
            await addDoc(collection(db, `users/${auth.currentUser.uid}/kit`), {
                product: item,
                pillNumber: amount,
            }).then(function(docRef) {
                setKit({id: docRef.id, product: item, pillNumber: amount})
            });
            } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    
  }

  export async function removeFromKit(id){
    try {
      await deleteDoc(doc(db, `users/${auth.currentUser.uid}/kit/${id}`))
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  export async function addToCalendar(event){
    try {
      await addDoc(collection(db, `users/${auth.currentUser.uid}/events`), {
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
        itemId: event.itemId
      }).then(function(docRef) {
        setDates(docRef.id, event)
    })
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }


  export async function setDates(id, event){
    try {
      for(var i=event.startTimestamp; i <= event.endTimestamp; i+=((event.freq+1) * 86400000)){
        await addDoc(collection(db, `users/${auth.currentUser.uid}/events/${id}/calendar`), {
          id: i,
          taken: false
        });
      }
    }
    catch (e) {
      console.error("Error adding document: ", e);
    }
  }


  export async function setTaken(id, takenId, itemId){
    try {
      
      const q = query(collection(db, "users", auth.currentUser.uid, "events", id, "calendar"), where("id", "==", takenId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots

          updateDoc(doc.ref, {
            taken: true
          });
          
      });

      const q2 = doc(db, "users", auth.currentUser.uid, "kit", itemId);

      await updateDoc(q2, {
        pillNumber: increment(-1)
    });

    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }
