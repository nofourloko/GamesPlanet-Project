import React, { useContext, useState ,useEffect } from "react";
import { PunktyContext } from "../context/punktyContext";
import { UzytkownikContext } from '../context/uzytkownikContext'
import HasłaTablica from "./graJedenComponents/hangmanHasłaTablica"
import Buttony from './graJedenComponents/buttons'
import '../styles/graJeden.css'
import img0 from "../assets/image0.jpg"
import img1 from "../assets/image1.jpg"
import img2 from "../assets/image2.jpg"
import img3 from "../assets/image3.jpg"
import img4 from "../assets/image4.jpg"
import img5 from "../assets/image5.jpg"
import img6 from "../assets/image6.jpg"
import wisielec from '../assets/Wisielec.png'

function GraJeden(){
        const images = [img0, img1, img2 , img3, img4, img5 ,img6]
        const [display, setDisplay] = useState(false)
        const [haslo, setHaslo] = useState(HasłaTablica[Math.floor(Math.random() * HasłaTablica.length)])
        const [proby , setProby] = useState(0)
        const [image, setImage] = useState(img0)
        const [disable , setDisable] = useState(false)
        const [literka, setLiterka] = useState(0) 
        const [id, setID] = useState("")
        const [endGameText, setEndGameText] = useState("")
        const [wynik, setWynik] = useState(false)
        const {zmienPunkty} = useContext(PunktyContext)
        const {fireBaseUserInfo, setFireBaseUserInfo, currentUser  } = useContext(UzytkownikContext)
        const [aktulaneHaslo, setAktualneHaslo] = useState()
console.log(zmienPunkty)
  useEffect(() =>{
    wygrales()
  },[literka])

  const obliczeniePunktów = async(punkty) =>{
    await zmienPunkty(fireBaseUserInfo, setFireBaseUserInfo, currentUser, punkty)
}

  const [hasloMapped, setHasloMapped] = useState(haslo.split("").map((el) => {
    return el = "*"
  }))

  const czyLiterkaZnajdujeSieWhasle = (e) =>{
    setAktualneHaslo(haslo)
    setID(e.target.name)
    if(!(haslo.includes(e.target.name))){
      if(proby < 6){
        setProby(prevValue => prevValue + 1)
        setImage(images[proby + 1])
      }if(proby === 5){
        setEndGameText("Przegrałes")
        obliczeniePunktów(-100)
        setDisplay(true)
        let random = Math.floor(Math.random() * HasłaTablica.length)
        setHaslo(HasłaTablica[random])
      }
    }else
      setHasloMapped(prevValue => prevValue.map((item,i) => {
        if(haslo[i] === e.target.name){
          setLiterka(prevValue => prevValue + 1)
          return item = e.target.name
        }else
          return item = prevValue[i]
      }))
    }

    const wygrales = async() => {
      if(literka === haslo.length){
        setDisplay(true)
        setEndGameText("Wygrałes")
        obliczeniePunktów(+100)
        let random = Math.floor(Math.random() * HasłaTablica.length)
        setHaslo(HasłaTablica[random])
      }
    }

    function nowaGra(){
      setLiterka(0)
      setProby(0)
      setDisplay(false)
      setDisable(false)
      setImage('../image0.jpg')
      setHasloMapped(haslo.split("").map((el) => {
        return el = "*"
      }))
      setAktualneHaslo(haslo)
    }
  return (
    <div className="graJedenMain">
      <p className='tytulGry'>WISIELEC<img className = "wisielecIcon"src={wisielec}/></p>
        {!display ?
        <div className='containerGraJeden' style={{display : wynik ? '' : 'none' }}>
          <img src= {image} alt = "wisielec" className='imgWiselec'></img>
          <p className='liczbaProb'>LICZBA PRÓB {proby}/6</p>
          <p className='hasloWisielec'>JEZYKI PROGRAMOWANIA</p>
          <p className='haslo'>{hasloMapped}</p>
        <Buttony  id = {id} disable = {disable} funkcja = {czyLiterkaZnajdujeSieWhasle}/>
      </div >:
      <div className='wynikGry'>
          <p className='endGamePText'>{endGameText}</p>
          <p >Hasło : {aktulaneHaslo} </p>
          <button className='endGameButton'onClick={nowaGra}>Nowa Gra</button>
      </div>}
        <button 
          style={{display : !wynik ? 'flex' : 'none' }} 
          onClick = {() => setWynik(true)}
          className='startGame'>ROZPOCZNIJ GRE</button>
    </div>
    )
}
export default GraJeden
