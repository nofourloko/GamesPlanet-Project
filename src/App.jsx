import {Route, Routes} from 'react-router-dom'
import "./styles/app.css"
import Header from "./components/Header"
import Home from './components/Home'
import GraJeden from './components/GraJeden'
import GraDwa from './components/GraDwa'
import Login from './components/Login'
import GraTrzy from './components/GraTrzy'
import Ranking from "./components/Ranking"
function App() {
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
      </div>
  )
}

export default App
