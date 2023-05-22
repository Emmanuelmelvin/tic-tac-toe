import React from 'react'
import './scoreBoard.css'

export const ScoreBoard = ({score , xPlaying}) => {
    const {oScore , xScore} = score
  return (
    <div className='scoreboard'>
        <span className={`score x-score ${!xPlaying && 'inactive'}`}> X - {xScore}</span>
        <span className={`score o-score ${xPlaying && 'inactive'}`}> O - {oScore}</span>
    </div>
  )
}
