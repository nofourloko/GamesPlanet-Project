import React, {useState}from "react";
import './Styles.graJeden/buttons.css'

export default function buttony({funkcja, disable, id}){
    const[buttony, setButtony] = useState(["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"])

    const [button, setButton] = useState(buttony.map((item,i) => {
        return {
            nazwa : item,
            disable : false,
            color : "white"
        }
    }))

    const wszystkieButtony = button.map((item,i) => {
            return <button className="buttonRow" disabled = {item.disable} name = {item.nazwa} key={i} style = {{color : item.color}}
            onClick={(event) => {
                funkcja(event) 
                sprawdzenie(event)}}>{item.nazwa}</button>
    })

    function sprawdzenie(e){
        console.log(e.target.name)
        setButton(prevValue => buttony.map((item,i) => {
            if(e.target.name === item){
                return {
                    nazwa : item,
                    disable : true,
                    color : "black"
                }
            }else
                return item = prevValue[i]
        }))
    }
    return(
        <div className="containerButtons">
            <div className="Row">
                {wszystkieButtony}
            </div>
        </div>
    )
}