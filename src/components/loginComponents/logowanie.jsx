import React, {useState }from 'react'
import man from "../../assets/man.png"
import '../../styles/login.css'
import { signInAuthWithEmailAndPassword , } from '../../firebase/firebase.utils'
const defaultForm = {
    email : '',
    password: ""
} 

export default function logowanie() {
    const [polaForm, setPolaForm] = useState(defaultForm)
    const { email, password } = polaForm

    const wyczyscFormularz = () =>{
        setPolaForm(defaultForm)
    }

    const zaloguj = async (event) => {
        event.preventDefault()
        try{
            const {user} = await signInAuthWithEmailAndPassword(email, password)
            wyczyscFormularz()
        }catch(error){
           switch(error.code){
                case 'auth/wrong-password':
                    alert("Twoje haslo jest niepoprawne")
                break
                case 'auth/user-not-found':
                    alert("Twoje dane są niepoprawane. Nie ma konta powiązanego z tym mailem")
                break
                default:
                    console.log(error)
           }
        }
    }


    const handleChange = (event) => {
        const {name, value} = event.target
        setPolaForm(prevValue => ({...prevValue, [name] : value }))
    }
  return (
    <div className='logowanieContainer'>
        <form onSubmit={zaloguj}>
            <p className='loginTekst'>LOGOWANIE<img className = "man" src={man}/></p>
            <label>E-MAIL</label>
            <input  
                type = "email" 
                name = "email"  
                autoComplete='off' 
                required 
                onChange={(e) => handleChange(e)} 
                value = {email}/>
            <label>HASŁO</label>
            <input 
                type = "password" 
                name = "password" 
                autoComplete='off' 
                required 
                onChange={(e) => handleChange(e)} 
                value = {password}/>
            <input className = "submit" type="submit" value="ZALOGUJ"/>
        </form>
    </div>
  )
}
