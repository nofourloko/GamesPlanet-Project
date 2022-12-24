import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    collection,
    getDocs
} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyAJkH9Zf3brZQoV0foTq_qqzRxJcLr_qiM",
    authDomain: "gamesplanet-auth.firebaseapp.com",
    projectId: "gamesplanet-auth",
    storageBucket: "gamesplanet-auth.appspot.com",
    messagingSenderId: "783704533206",
    appId: "1:783704533206:web:db19e6bb31f5e4cccd4177"
  }

const firebaseapp = initializeApp(firebaseConfig)
export const auth = getAuth()


export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth , dodatkoweInformacje = {}) => {
    if(!userAuth) return

    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef)

    if(!userSnapshot.exists()){
        const {displayName , email } = userAuth
        const createdAt = new Date()


        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...dodatkoweInformacje
            })
        }catch(error){
            console.log("error podczas tworzenia użytkownika", error.message)
        }
    }
    return userDocRef
}

export const createAuthWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return

    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return

    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth) 

export const onAuthStateChangedListener = (callback) => 
    onAuthStateChanged(auth, callback )


export const getDocument = async (uid,) => {
    const userDocRef = doc(db, 'users', uid)
    const userDoc =  await getDoc(userDocRef)

    if(userDoc.exists())  return userDoc.data()
    return

}

export const updatePoints = async (value , uid) => {
    const docRef = doc(db, "users", uid)
    const userDoc =  await getDoc(docRef)
    console.log(userDoc)
    if(userDoc.exists()){
        try{
            updateDoc(docRef, value)
        }catch(error){
            console.log(error)
        }
    }
}

export const raniking = async () =>  {
    const docRef = collection(db, 'users')
    const docsSnap = await getDocs(docRef);
    let tablica = []
    docsSnap.forEach(doc => {
        tablica.push(doc.data())
    })
    return tablica
}
