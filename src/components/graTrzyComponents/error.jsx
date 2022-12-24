import React from 'react'

export default function error() {
  return (
    <div className='error'>
        <h1>coś poszło nie tak</h1>
        <button onClick={() => console.log("Refresh")}>spróbuj ponownie</button>
    </div> )
}


