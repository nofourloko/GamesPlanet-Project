import React , {useContext} from 'react'
import Logowanie from './loginComponents/logowanie'
import Rejestracja from './loginComponents/rejestracja'
import { UzytkownikContext } from '../context/uzytkownikContext'
import Wyloguj from './loginComponents/wyloguj'




function Login() {
  const {uzytkownikZalogowany, currentUser} = useContext(UzytkownikContext)
  return (
    <div>
      {!uzytkownikZalogowany? 
      <div className='loginContainer'>
        <Rejestracja />
        <Logowanie />
      </div> : <Wyloguj/>}
    </div>
  )
}

export default Login