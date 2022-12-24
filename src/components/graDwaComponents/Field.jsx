import React from "react"
import x from '../../assets/cancel.png'
import kolko from '../../assets/oval.png'
export default function Field(props) {
    function styles(){
        const obj = {}
        if(props.isHeld){
            Object.assign(obj , {backgroundImage: `url(${x})`, backgroundSize: 'cover'})
        }else if(props.isHeld2){
            Object.assign(obj , {backgroundImage: `url(${kolko})`, backgroundSize: 'cover'})
        }
        else{
            Object.assign(obj , {backgroundColor: "transparent"})
        }
        return obj
    }
    const color = styles()
    return (
        <div className="fieldButtons">
        <button
            disabled = {props.isHeld? true : props.isHeld2? true : props.disable}
            className= {props.className} 
            style={color}
            onClick={props.holdDice}
        >
        </button>
        </div>
    )
}