import React from 'react'
import './resetButton.css'

export const ResetButton = ({resetBoard}) => {
  return (
    <button className='reset' onClick={resetBoard}>Start new game.</button>
  )
}
