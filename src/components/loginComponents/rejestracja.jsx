import React , {useState }from 'react'
import {createAuthWithEmailAndPassword, createUserDocumentFromAuth, } from '../../firebase/firebase.utils'

const deafaultowePolaForm = {
    displayName : '',
    email : '',
    password: ''
}

export default function rejestracja({zmiana}) {
    const [polaForm, setPolaForm] = useState(deafaultowePolaForm)
    const { displayName, email, password } = polaForm 



    const wyczyscFormularz = () =>{
        setPolaForm(deafaultowePolaForm)
    }

    const signUp = async (event) => {
        event.preventDefault()

        try{
            const { user } = await createAuthWithEmailAndPassword(email, password)
            await createUserDocumentFromAuth(user, {displayName : displayName, points : 1000})
            window.location.reload()
            wyczyscFormularz()
        }catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert("Podaj inny email ten juz jest zajety")
            }
            console.log("Nie udało sie stworzyć użytkownika", error)
        }
    }


    const handleChange = (event) => {
        const {name, value} = event.target
        setPolaForm(prevValue => ({...prevValue, [name] : value }))
    }
  return (
    <div className='logowanieContainer'>
        <p className='loginTekst'>ZAJERESTRUJ SIE</p>
        <form onSubmit={signUp}>
            <label>Nazwa</label>
            <input 
                type="text" 
                required 
                name = "displayName" 
                onChange={(e) => handleChange(e)} 
                autoComplete = "off"
                value = {displayName}/>
            <label>E-MAIL</label>
            <input 
                type="email" 
                required 
                name = "email" 
                onChange={(e) => handleChange(e)} 
                autoComplete = "off"
                value = {email}/>
            <label>HASŁO</label>
            <input 
                type="password" 
                required 
                name = "password" 
                onChange={(e) => handleChange(e)} 
                autoComplete = "off"
                value = {password}/>
            <button type='submit' className="submit">ZAJERESTRUJ SIE</button>
        </form>
    </div>
  )
}
