import React , {useContext} from 'react'
import { signOutUser , raniking} from '../../firebase/firebase.utils'
import { UzytkownikContext } from '../../context/uzytkownikContext'
import coins from '../../assets/crypto.png'
import {Link} from "react-router-dom"


export default function wyloguj() {
    const {fireBaseUserInfo, setFireBaseUserInfo, currentUser} = useContext(UzytkownikContext)
    const wyloguj = async () => {
        await signOutUser()
    } 
    
  return (
    <div className='profileAndLogout'>
        <p className='uzytkownik'>Witaj <strong>{fireBaseUserInfo.displayName}</strong></p>
        <p><img src={coins} className = "coins"/>{fireBaseUserInfo.points}</p>
        <button onClick={wyloguj} className = "buttonWyloguj">Wyloguj</button>
        <Link to = "/ranking" className = "buttonWyloguj">Ranking</Link>
    </div>
  )
}
