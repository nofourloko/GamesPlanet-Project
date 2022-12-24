import { useState, useContext} from 'react'
import "../styles/Home.css"
import {Link} from 'react-router-dom'
import coins from "../assets/crypto.png"
import { UzytkownikContext } from '../context/uzytkownikContext'

function Home(){
   const {uzytkownikZalogowany, fireBaseUserInfo} = useContext(UzytkownikContext)
    return(
      <div className='homeContainer'>
        <div className="homeGamesContainer">
             <div className="gra1">
                <p>GRA 1</p>
                <img className="gameZdjecie" src="https://cdn.imgbin.com/7/24/19/imgbin-line-angle-line-SGSEv6WT29pAyaXu0b29f7aUy.jpg" />
                <Link className = "wybierzGreTekst" to = "/gra1">WYBIERZ</Link>
             </div>
             <div className="gra2">
                <p>GRA 2</p>
                <img className="gameZdjecie" src="https://w7.pngwing.com/pngs/1015/816/png-transparent-tic-tac-toe-pens-tic-tac-toe-angle-furniture-rectangle.png" />
                <Link className = "wybierzGreTekst" to = "/gra2">WYBIERZ</Link>
             </div>
             <div className="gra3">
                <p>GRA 3</p>
                <img className="gameZdjecie" src="https://w7.pngwing.com/pngs/127/466/png-transparent-blackjack-casino-playing-card-gambling-blackjack-forum-game-online-casino-croupier-thumbnail.png" />
                <Link className = "wybierzGreTekst" to = "/gra3">WYBIERZ</Link>
             </div>
        </div>
        {uzytkownikZalogowany && 
               <div className='uzytkownikInfo'>
                  <p className='uzytkownik'>Witaj <strong>{fireBaseUserInfo.displayName}</strong></p>
                  <p><img src={coins} className = "coinsMain"/>{fireBaseUserInfo.points}</p>
               </div>}
      </div>
    )
}

export default Home