import { useState, useContext} from 'react'
import {Route, Routes} from 'react-router-dom'
import "./styles/app.css"
import Header from "./components/Header"
import Home from './components/Home'
import GraJeden from './components/GraJeden'
import GraDwa from './components/GraDwa'
import Login from './components/Login'
import GraTrzy from './components/GraTrzy'
import Ranking from "./components/Ranking"
import coins from "./assets/crypto.png"
import { UzytkownikContext } from './context/uzytkownikContext'
function App() {
  const {uzytkownikZalogowany, fireBaseUserInfo} = useContext(UzytkownikContext)


 
  return (
      <div className='containerApp'>
        <Header />
        <Routes >
            <Route path= "/" element = {<Home />} />
            <Route path="/gra1" element = {<GraJeden />} />
            <Route path="/gra2" element = {<GraDwa />} />
            <Route path="/gra3" element = {<GraTrzy />} />
            <Route path="/login" element = {<Login />}/>
            <Route path='/ranking' element = {<Ranking/>}/>
        </Routes>
        {uzytkownikZalogowany && 
          <div className='uzytkownikInfo'>
            <p className='uzytkownik'>Witaj <strong>{fireBaseUserInfo.displayName}</strong></p>
            <p><img src={coins} className = "coinsMain"/>{fireBaseUserInfo.points}</p>
          </div>
        }
      </div>
  )
}

export default App
