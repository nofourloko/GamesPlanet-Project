import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener , getDocument} from "../firebase/firebase.utils";

export const UzytkownikContext = createContext({
    currentUser: null,
    setcurrentUser: () => null,
    uzytkownikZalogowany: false,
    setUzytkownikZalogowany: () => false,
    fireBaseUserInfo : null,
    setFireBaseUserInfo : () => null,
})

export const UzytkownikProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [uzytkownikZalogowany, setUzytkownikZalogowany] = useState(false)
    const [fireBaseUserInfo, setFireBaseUserInfo] = useState(null)
    const value = {
        currentUser, 
        setCurrentUser, 
        uzytkownikZalogowany , 
        setUzytkownikZalogowany, 
        fireBaseUserInfo, 
        setFireBaseUserInfo , 
    }
    
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener(async (user) => {
            if(user){
                const info = await getDocument(user.uid)
                setFireBaseUserInfo(info)
                setCurrentUser(user)
                localStorage.setItem('user', true)
                setUzytkownikZalogowany(true)
            }else{
                localStorage.removeItem('user')
                setUzytkownikZalogowany(false)
                setFireBaseUserInfo(null)
            } 
        })

        return unsubscribe
    }, [])

    return (
        <UzytkownikContext.Provider value= { value }>
            {children}
        </UzytkownikContext.Provider>
    )
}
