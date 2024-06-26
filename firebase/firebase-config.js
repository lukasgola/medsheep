// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";

import { deleteDoc, getFirestore } from "firebase/firestore";
import { collection, setDoc, getDoc, getDocs, addDoc, doc, updateDoc, query, where, increment, writeBatch } from "firebase/firestore"; 

//Storage
import { getStorage, ref, getDownloadURL, uploadBytes, uploadBytesResumable, } from "firebase/storage";


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
export const storage = getStorage(app);


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
            throw new Error(errorCode)
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
            throw new Error(errorCode)
            //console.log(errorMessage)
        })
    )
}

export async function adduser(uid, name, lastName, email, avatar){
    try {
        await setDoc(doc(db, "users", uid), {
        name: name,
        lastName: lastName,
        email: email,
        avatar: { downloadURL: 'https://firebasestorage.googleapis.com/v0/b/medsheep-4763c.appspot.com/o/default-user.jpg?alt=media&token=1a67afad-307b-410b-a6dc-977527c0cdab'},
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

  export async function addToCalendar(event, takenArray){
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
        itemId: event.itemId,
        dose: event.dose,
        doseUnit: event.doseUnit,
      }).then(function(docRef) {
        setDates(docRef.id, takenArray)
    })
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }


  export async function getNotID(id){
    const result = []
    const q = query(collection(db, "users", auth.currentUser.uid, "events", id, "calendar"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
          
        const data = doc.data();

        result.push(data.notID)
          
      });

      return result
  }


  export async function removeEvent(eventId) {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('No user is currently authenticated.');
    }
  
    const eventRef = doc(db, `users/${user.uid}/events/${eventId}`);
    const subcollectionRef = collection(db, `users/${user.uid}/events/${eventId}/calendar`);
  
    try {
      // Step 1: Delete all documents in the subcollection
      const subcollectionSnapshot = await getDocs(subcollectionRef);
      const batch = writeBatch(db);
  
      subcollectionSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
  
      await batch.commit();
  
      // Step 2: Delete the event document itself
      await deleteDoc(eventRef);
  
      console.log(`Event with ID ${eventId} and its subcollection have been deleted successfully`);
    } catch (e) {
      console.error('Error deleting event and its subcollection: ', e);
    }
  }


  export async function setDates(id, takenArray){
    try {
      for(let i = 0; i < takenArray.length; i++){
        await addDoc(collection(db, `users/${auth.currentUser.uid}/events/${id}/calendar`), {
          id: takenArray[i].id,
          taken: false,
          notID: takenArray[i].notID
        });
      }
    }
    catch (e) {
      console.error("Error adding document: ", e);
    }
  }


  export async function setTaken(id, takenId, itemId, dose){
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
        pillNumber: dose
      });

    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }


  export async function getKitItem(itemId){
      try {
          // Create a reference to the document
          const docRef = doc(db, `/users/${auth.currentUser.uid}/kit/`, itemId);
          
          // Get the document
          const docSnap = await getDoc(docRef);
  
          // Check if the document exists
          if (docSnap.exists()) {
              // Document data
              return docSnap.data();
          } else {
              // Document does not exist
              throw new Error("No such document!");
          }
      } catch (error) {
          // Handle any errors
          console.error("Error getting document:", error);
          throw error;
      }
  }


  export async function getKit() {
    const querySnapshot = await getDocs(collection(db, "users", auth.currentUser.uid, "kit"));
    const data = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
    }));

    return data;
  }


  export async function uploadImage(uid, avatar, type, progressCallback) {

    const metadata = {};
  
    
    const response = await fetch(avatar);
    const blob = await response.blob();
  
    const directory = type == 'quickActions' ? 'quickActions/' : 'profilePictures/';
  
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, directory + Date.now());
    const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
  
    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progressCallback(progress);
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            console.log(snapshot.state)
            break;
        }
      }, 
      (error) => {
        // Handle errors and log them
        reject(error)
      },
      async () => {
        // Upload completed successfully, now we can get the download URL
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        resolve({
          downloadURL,
          metadata: []
        })
      }
    );
    })
  }

  export async function updateAvatar(uid, avatar){
    try {
      // Set the "capital" field of the city 'DC'
      await updateDoc(doc(db, "users", uid), {
        avatar: avatar
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }