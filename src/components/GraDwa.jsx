import React, {useState, useContext} from "react"
import Field from "./graDwaComponents/Field"
import utility from "./graDwaComponents/utility"
import "../styles/graDwa.css"
import kolkokrzyzk from "../assets/kolkokrzyzk.png"
import { PunktyContext } from "../context/punktyContext"
import { UzytkownikContext } from '../context/uzytkownikContext'

function graDwa() {
    const [buttonField, setButtonField] = useState(allNewButtons())
    const [disable , setDisable] = useState(false)
    const [array , setArray] = useState(createArray())  
    const [idArray , setIdArray] = useState([]) 
    const [elementArray , setElementArray] = useState([])
    const [over , setOver] = useState(true)
    const [open , setOpen] = useState(false)
    const [winner , setWinner] = useState("")
    const [wynik, setWynik] = useState(false)
    const {zmienPunkty} = useContext(PunktyContext)
    const {fireBaseUserInfo, setFireBaseUserInfo, currentUser  } = useContext(UzytkownikContext)

    const obliczeniePunktów = async(punkty) =>{
      await zmienPunkty(fireBaseUserInfo, setFireBaseUserInfo, currentUser, punkty)
    }
   

    function allNewButtons() {
        const buttons = []
        for (let i = 0; i < 9; i++) {
            buttons.push({
                value: i,
                isHeld: false,
                isHeld2: false,
                id: i
            })
        }
        return buttons
    }

    function createArray(){
      const array = allNewButtons()
      return array.map(item => {
        return array.indexOf(item)
      })
    }

    function didYouWin(id,element){
      idArray.push(id)
      elementArray.push(element)
      if(utility(idArray)){
        setOpen(true)
        setWinner("Wygrałeś")
        obliczeniePunktów(+100)
        setOver(false)
      }
      else if(utility(elementArray)){
        setOpen(true)
        setWinner("Przegrałes")
        obliczeniePunktów(-100)
        setOver(false)
      }
      else if(array.length === 0 ){
        setWinner("Remis")
        setDisable(true)
        setOver(false)
      }
    } 

    function HoldButton(id) {
        setButtonField(item => item.map(item => {
          return item.id === id ? 
              {...item, isHeld: !item.isHeld } :
              item
      }))
        setDisable(true)
  
        array.splice(array.indexOf(id),1)
        let element = array[Math.floor(Math.random()*array.length)]
        setTimeout(() => {
          setButtonField(item => item.map(item => {
            return item.id === element ? 
                {...item, isHeld2: !item.isHeld2, disable: true} :
                item
        }))
        array.splice(array.indexOf(element),1)
        setDisable(false)
        didYouWin(id,element)
        },1000)
    }
    function newGame(){
      setOpen(false)
      setDisable(false)
      setOver(true)
      setButtonField(allNewButtons())
      setArray(createArray())
      setIdArray([])
      setElementArray([])
    }

    const buttons = buttonField.map(item => (
        <Field  
          className = {`button${item.id}`}
          disable = {disable}
          key={item.id} 
          value={item.value} 
          isHeld={item.isHeld} 
          isHeld2 = {item.isHeld2} 
          holdDice={() => HoldButton(item.id)} />
    ))
    
    return (
      <div className="divMain">
        <p className='tytulGry'>KÓŁKO I KRZYŻYK<img className = "kolkoKrzyzykIcon"src={kolkokrzyzk}/></p>
      {over ?
      <div style = {{display : wynik ? '' : 'none' }}>   
        <div className="name" >
          </div>
          <div className="containerButtony">
            {buttons}
          </div>
        </div> :
       <div className='wynikGry'>
          <p className='endGamePText'>{winner}</p>
          <button className = "endGameButton"onClick={newGame}>New Game</button>
        </div>}
          <button 
          style={{display : !wynik ? 'flex' : 'none' }} 
          onClick = {() => setWynik(true)}
          className='startGame'
          disabled = {!localStorage.getItem('user')}>ROZPOCZNIJ GRE</button>
          {!localStorage.getItem('user') && 
          <div className="userInfoStartGame">
            <p>Aby zagrac prosze wejsc w ikonke w prawym górnym rogu i sie zalogować</p>
          </div>}
      </div>

    )
}

export default graDwa