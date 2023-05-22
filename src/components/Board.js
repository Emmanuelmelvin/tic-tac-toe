import React from 'react'
import './Board.css'
import { Box } from './Box'
export const Board = ({board , onClick}) => {
  return (
    <div className='board'>
    {
        board.map((value , id) => {
            return  <Box value={value}  key={id} onClick={()=> value == null && onClick(id)}/>
        })
    }
    </div>
  )
}
