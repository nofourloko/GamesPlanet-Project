import React , {useContext, useState} from 'react'
import Logowanie from './loginComponents/logowanie'
import Rejestracja from './loginComponents/rejestracja'
import { UzytkownikContext } from '../context/uzytkownikContext'
import Wyloguj from './loginComponents/wyloguj'





function Login() {
  const {uzytkownikZalogowany, currentUser} = useContext(UzytkownikContext)
  const [rejestracja , setRejestrcja] = useState(false)
  return (
    <div>
      {!uzytkownikZalogowany? 
      <div>
        {rejestracja ? 
        <div className='loginContainer'>
          <Rejestracja />  
         <p className='zmianaAutoryzacjiTekst'>Masz konto? <button  className="zmianaAutoryzacji" onClick={() => setRejestrcja(false)}>Zaloguj sie</button></p> 
        </div> : 
        <div className='loginContainer'>
          <Logowanie />
          <p className='zmianaAutoryzacjiTekst'>Nie masz konta? <button  className="zmianaAutoryzacji" onClick={() => setRejestrcja(true)}>Stwórz konto</button></p>
        </div>}
      </div> : <Wyloguj/>}
    </div>
  )
}

export default Login