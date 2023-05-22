import { useMemo, useState } from 'react';
import { Board } from './components/Board';
import { ScoreBoard } from './components/scoreBoard';
import { ResetButton } from './components/ResetButton';
import { TicTacAi } from './components/TicTacAi';


export const WIN_CONDITIONS = [
  [0,1,2],
  [0,3,6],
  [0,4,8],
  [1,4,7],
  [2,4,6],
  [2,5,8],
  [3,4,5],
  [6,7,8]
  ]

function App() {

  const [board , setBoard] = useState(Array(9).fill(null))
  const  [xPlaying, setxPlaying] = useState(true)
  const [gameOver , setGameOver] = useState(false)

  const [score , setScore] = useState({xScore: 0 , oScore: 0})
  const handleBoxClick = (index) => {
    if(xPlaying & !gameOver){
      const updateBoard = board.map((value , id) => {
        if (index === id) {
         return 'X';
        }else {
         return value;
        }
       })
     
      const winner = checkWinner(updateBoard)
      if(winner){
       if (winner === 'X') {
         let {xScore} = score
         xScore += 1;
         setScore({...score , xScore}) 
       } else {
         let {oScore} = score
         oScore += 1
         setScore({...score , oScore})
       }
      }

       setBoard(updateBoard)
       setxPlaying(false)
    }
  }
  
  const bestMove = TicTacAi({board})
  if(!xPlaying & !gameOver){
    setTimeout(() => {
      let legitVal
      const callBackBoard = []
      board.forEach((value , index) => {
        if(value == null){
          callBackBoard.push(index)
          const numVal = callBackBoard
          const randomIndex = Math.floor(Math.random() * numVal.length);
           legitVal = numVal[randomIndex];
          }
      })
      const computerBoxUpdate = board.map((value , id) => {
        if (id === bestMove) {
         return 'O';
        }else {
         return value;
        }
       })
     
      const comWinner = checkWinner(computerBoxUpdate)
      if(comWinner){
       if (comWinner === 'X') {
         let {xScore} = score
         xScore += 1;
         setScore({...score , xScore}) 
       } else {
         let {oScore} = score
         oScore += 1
         setScore({...score , oScore})
       }
      }
     
       setBoard(computerBoxUpdate)
       setxPlaying(true)
    }, 2000);
  }
  
  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x,y,z] = WIN_CONDITIONS[i]
      if(board[x] && board[x] === board[y] && board[y] === board[z]){
       setGameOver(true)
        return [board[x],x,y,z]
      }
      
    }
  }

  const resetBoard = () => {
    setGameOver(false)
    setBoard(Array(9).fill(null))
  }
  return (
   <div>
   <ScoreBoard score={score} xPlaying={xPlaying}/>
  <Board board={board} onClick={gameOver? resetBoard:handleBoxClick}/>
  <ResetButton resetBoard = {resetBoard}/>
   </div>
  );
}

export default App;
