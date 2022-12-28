import React, { useState, useContext} from 'react'
import {CardElement , useStripe, useElements} from '@stripe/react-stripe-js'
import '../../styles/koszyk.css'
import { UzytkownikContext } from '../../context/uzytkownikContext'
import { PunktyContext } from '../../context/punktyContext'
import { useNavigate } from 'react-router-dom';
import "../../styles/spinner.css"

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
      iconColor: "white",
      color: '#fff',
      fontWeight: '500',
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '20px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883',
      },
      '::placeholder': {
        color: "white",
      },
		},
		invalid: {
			iconColor: "white",
			color: "white"
		}
	}
}

export default function Koszyk() {
  const navigate = useNavigate()

  const stripe = useStripe()
  const elements = useElements()

  const [buttonDisable, setButtonDisable] = useState(false)
  const [liczbaPunktow, setLiczbaPunktow] = useState(10000)
  const [Isloading, setIsLoading] = useState(false)

  const {zmienPunkty} = useContext(PunktyContext)
  const {fireBaseUserInfo, setFireBaseUserInfo, currentUser  } = useContext(UzytkownikContext)

  const obliczeniePunktów = async (punkty) =>{
    await zmienPunkty(fireBaseUserInfo, setFireBaseUserInfo, currentUser, punkty)
  }

  const platnosc = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    if (!stripe || !elements) {
      return;
    }
    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: liczbaPunktow / 10 }),
    }).then((res) => {
      return res.json()
    });
    const { paymentIntent: {client_secret}} = response

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method : {
        card: elements.getElement(CardElement),
        billing_details : {
          name : fireBaseUserInfo.displayName
        }
      }
    })
    if(paymentResult.error){
      alert("Prosze podac dane karty")
      setIsLoading(false)
    }else{
      if(paymentResult.paymentIntent.status === "succeeded"){
        setIsLoading(false)
        setButtonDisable(false)
        obliczeniePunktów(+liczbaPunktow)
        navigate("/login")
      }
    }
  }

  return (
    <div>
        <form className='zakupPuntków' onSubmit={platnosc}>
          <h1>Payment : </h1>
          <div className='zakupPuntkówIlosc'>
            <label>Ilosc punktow</label>
            <input 
            type="tel"
            defaultValue = {liczbaPunktow}
            className='iloscPunktow'/>
          </div>
          <CardElement options={CARD_OPTIONS}/>
          <p className='suma'>Suma : {liczbaPunktow / 1000} zł</p>
          {Isloading ? 
          <div className="spinner-container">
            <div className="loading-spinner">
            </div>
          </div>:
          <input type='submit' disabled = {buttonDisable} value={
             `Kup - ${liczbaPunktow} punktow` }/>
          }
          </form>
    </div>
  )
}
