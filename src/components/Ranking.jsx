import React, {useState, useEffect} from 'react'
import { raniking}  from '../firebase/firebase.utils'
import '../styles/Ranking.css'
export default function Ranking() {
    const [tablicaWynikow, setTablicaWynikow] = useState([])
    const [tablica, setTablica] = useState([])
    
    useEffect(()=>{
        const getData = async() => {
            const promise = raniking();
            const value = await promise;
            const result = value.forEach(el => {
              tablicaWynikow.push(el)
            });
            setTablicaWynikow(tablicaWynikow.sort((a,b) => b.points - a.points ))
            console.log(tablicaWynikow)
            setTablica(tablicaWynikow.map((item, i) => {
              return <p key={i}><b>{i+1}</b>. {item.displayName} - {item.points}</p>
            }))
          }
          getData()
        },[])
 return(
    <div className='tablicaWynikowContainer'>
      <p>Tablica Wynikow</p>
      <div className='tablicaWynikow'>
        {tablica}
      </div>
    </div>
 )
}
