import React from 'react'

export default function Wygrana({rozpocznijNowaGre, wynik}) {
  return (
    <div className='wynikGry'>
      <p className='endGamePText'>{wynik}</p>
      <button onClick={() => rozpocznijNowaGre()}>NOWA GRA</button>
    </div>
  )
}
