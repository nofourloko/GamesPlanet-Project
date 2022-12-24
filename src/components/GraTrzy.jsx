import React, {useState, useEffect, useContext} from 'react'
import '../styles/graTrzy.css'
import cardIcon from "../assets/poker-cards.png"
import Error from './graTrzyComponents/error'
import GraTrzyWidok from "./graTrzyComponents/graTrzyWidok"
import Wynik from './graTrzyComponents/Wynik'
import { PunktyContext } from "../context/punktyContext"
import { UzytkownikContext } from '../context/uzytkownikContext'

var zmienna = 0
var indexNowychKart = 3

function GraTrzy() {
    const [startGame, setStartGame] = useState(true)
    const [gracz , setGracz] = useState(0)
    const [krupier ,setKrupier] = useState(0)
    const [error , setError] = useState(false)
    const [kartyGracz, setKartyGracz] = useState([])
    const [kartyKrupier, setKartyKrupier] = useState([])
    const [talia, setTalia] = useState("")
    const [wynik, setWynik] = useState(false)
    const [wynikNapis, setWynikNapis] = useState("")
    const [nowaGra, setNowaGra] = useState(false)
    const [buttonDobierz , setButtonDobierz] =  useState(false)
    const [buttonSpasuj, setButtonSpasuj] = useState(false)
    const [nowaTalia ,setNowaTalia] = useState(0)
    const {zmienPunkty} = useContext(PunktyContext)
    const {fireBaseUserInfo, setFireBaseUserInfo, currentUser  } = useContext(UzytkownikContext)
    



    useEffect(() =>{
        fetch('https://www.deckofcardsapi.com/api/deck/new/draw/?count=12')
            .then(response => { 
                if(response.ok) {
                    return response.json();
              }else{
                setError(true)
                throw new Error("Nie udało sie zrobic fetcha")
            }})
            .then(data => {
                console.log("ok")
                setTalia(data)              
                przypiszPierwszeKarty(data)})
    },[nowaTalia])
    
    const obliczeniePunktów = async(punkty) =>{
        await zmienPunkty(fireBaseUserInfo, setFireBaseUserInfo, currentUser, punkty)
    }
    function przypiszPierwszeKarty(data){
        setKartyKrupier(prevValue => [...prevValue, data.cards[0].images.png])
        setKartyGracz(prevValue => [...prevValue, data.cards[1].images.png, data.cards[2].images.png])
        setKrupier(prevValue => prevValue += ilePunktówDac(data.cards[0].value))
        setGracz(prevValue => prevValue += ilePunktówDac(data.cards[1].value) + ilePunktówDac(data.cards[2].value))
    }

    function ilePunktówDac(data){
        if(data / 1){
            return +data
        }else if(data === "ACE"){
            return 11
        }else
            return 10
    }

    const  dobierz = async () =>{
        indexNowychKart++
        let zmienna = gracz
        zmienna += ilePunktówDac(talia.cards[indexNowychKart].value)
        setGracz(zmienna)
        setKartyGracz(prevValue => [...prevValue, talia.cards[indexNowychKart].images.png])
        
        if(zmienna > 21){
            setButtonDobierz(true)
            setTimeout(() => {
                setWynik(true)
                setWynikNapis("PRZEGRAŁEŚ")
                obliczeniePunktów((-100)) 
            }, 1500);
        }
    }

    const podliczenieWynikow = (krupier) => {
        setTimeout(() => {
            setWynik(true)
            if(krupier > gracz && krupier < 22 || krupier === gracz || gracz > 21){
                setWynikNapis("PRZEGRAŁEŚ")
                obliczeniePunktów((-100)) 
            }else
                setWynikNapis("Wygrałeś")
                obliczeniePunktów((100)) 
        },1500)
    }

    function spasuj(){
        zmienna = krupier
        let krupierPunkty = [zmienna]
        let krupierKarty = kartyKrupier
        setButtonDobierz(true)
        setButtonSpasuj(true)

        const test = () => {
                krupierPunkty.map((item,index) => {
                    if(index > 0){
                        setTimeout(() => {
                            setKrupier(prevValue => prevValue += item)
                        },1000 * index)                      
                    } 
                })
                krupierKarty.map((item,index) => {
                    if(index > 0){
                        setTimeout(() => {
                            setKartyKrupier(prevValue => [...prevValue, item])
                            if(krupierKarty.length - 1 === index){
                                podliczenieWynikow(krupierPunkty.reduce((accumulator, value) => {
                                    return accumulator + value;
                                  }, 0))
                            }
                        },1000 * index)
                    }
                })
                
        }

        while(zmienna < 16){
            indexNowychKart++
            zmienna += ilePunktówDac(talia.cards[indexNowychKart].value)
            krupierPunkty = [...krupierPunkty, ilePunktówDac(talia.cards[indexNowychKart].value)]
            krupierKarty  = [...krupierKarty, talia.cards[indexNowychKart].images.png]
        }
        test()
    }

    function rozpocznijNowaGre(){
        setTalia("")
        setGracz(0)
        setKrupier(0)
        setKartyGracz([])
        setKartyKrupier([])
        setNowaGra(true)
        setWynik(false)
        setButtonSpasuj(false)
        setButtonDobierz(false)
        indexNowychKart = 2
        setNowaTalia(prevValue => prevValue + 1)
    }
    


    const kartyGraczMapped = kartyGracz.map((item,i)=> {
        return <img key = {i} src={item} className = "kartaImage"/>
    })

    const kartyKrupierMapped = kartyKrupier.map((item,i)=> {
        return <img key = {i} src={item} className = "kartaImage"/>
    })

  return (
    <div className='containerGra'>

        <p className='tytulGry'>BLACKJACK<img className='cardIcon' src={cardIcon}/></p>

        {error ? <Error /> :
            !startGame ? 
                <>
                    <div style={{display : !wynik ? '' : 'none' }}>
                        <GraTrzyWidok 
                            krupier = {krupier} 
                            gracz = {gracz} 
                            Dobierz = {dobierz} 
                            kartyGracz = {kartyGraczMapped} 
                            kartyKrupier = {kartyKrupierMapped}
                            Spasuj = {spasuj} 
                            buttonDobierz = {buttonDobierz}
                            buttonSpasuj = {buttonSpasuj}/> 
                    </div>

                    <div style={{display : wynik ? 'flex' : 'none' }}><Wynik rozpocznijNowaGre = {rozpocznijNowaGre} wynik = {wynikNapis}/></div>
                </>
            :
                <>
                    <button className='startGame' onClick={() => setStartGame(false)}> ROZPOCZNIJ GRE</button>
                </>
        }
    </div>
  )
}

export default GraTrzy
