import { createContext} from "react";
import { updatePoints , getDocument} from '../firebase/firebase.utils'

export const PunktyContext = createContext()
export const PunktyProvider = ({children}) => {
  const zmienPunkty = async (fireBaseUserInfo, setFireBaseUserInfo, currentUser, punkty) => {
    await updatePoints({points : (fireBaseUserInfo.points + punkty)}, currentUser.uid)
    const response = await getDocument(currentUser.uid)
    setFireBaseUserInfo(response)
  }
  return (
    <PunktyContext.Provider value={{zmienPunkty : zmienPunkty}}>
      {children}
    </PunktyContext.Provider>
  )
}
