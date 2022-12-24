import  React from 'react'

function graTrzyWidok(props){
  return (
    <>
            <div className='krupierBlackJack'>
              <div className='krupierBlackJackInfo'>
                <p className='blackJackUser'>KRUPIER</p>
                <p className='ponints'>{props.krupier}</p>
              </div>
                {props.kartyKrupier}
            </div>
            <div className='graczBlackJack'>
              <div className='graczBlackJackInfo'>
                <p  className='blackJackUser'>GRACZ</p>
                <p className='ponints'>{props.gracz}</p>
              </div>
                {props.kartyGracz}
            </div>
            <div className='buttonsBlackJack'>
                <button className= "Dobierz" disabled = {props.buttonDobierz} onClick={() => props.Dobierz()}> DOBIERZ</button>
                <button className= "Spasuj" disabled = {props.buttonSpasuj} onClick={() => props.Spasuj()}> SPASUJ</button>
            </div>
    </>
  )
}

export default graTrzyWidok
