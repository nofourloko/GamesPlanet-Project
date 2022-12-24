import React, {useState} from "react";
import "../styles/Header.css"
import {Link} from "react-router-dom"
import logo from "../assets/woman.png"
import sword from "../assets/sword.png"

export default function Header({blur, changeBlurEnter , changeBlurLeave}){
    
    return(
        <div >
            <div className="Header" >
                <p className="tytuł">GAMES PLANET<img src={sword} className ="logo2"/></p>
                <Link  className = "game1" to = "/gra1">GRA1 </Link>
                <Link  className = "game2" to = "/gra2">GRA2</Link>
                <Link  className = "game3" to = "/gra3">GRA3</Link>
                <Link  className = "stronaGłówna" to = "/">STRONA GŁÓWNA</Link>
            </div>
        <div className="account">
            <Link to = "/login"><img src={logo} className = "profileIcon" /></Link>
        </div>
        </div>
        
    )
}

