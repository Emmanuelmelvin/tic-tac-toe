import { WIN_CONDITIONS } from "../App";

export const TicTacAi = ({ board }) => {
  const aiPlayer = 'O'; // AI player symbol
  const availableMoves = getAvailableMoves(board);

  // Find the best move using the minimax algorithm with alpha-beta pruning
  const bestMoveIndex = findBestMove(board, aiPlayer, aiPlayer).move;
  return bestMoveIndex;
};

const getAvailableMoves = (board) => {
  const availableMoves = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      availableMoves.push(i);
    }
  }
  return availableMoves;
};

const evaluateBoard = (board, aiPlayer) => {
  for (let i = 0; i < WIN_CONDITIONS.length; i++) {
    const [a, b, c] = WIN_CONDITIONS[i];
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      if (board[a] === aiPlayer) {
        return 1; // AI wins
      }
    }
  }
  return 0; // Draw or human win
};

const findBestMove = (board, currentPlayer, aiPlayer) => {
  let bestMove = null;
  let bestScore = currentPlayer === aiPlayer ? -Infinity : Infinity;

  const availableMoves = getAvailableMoves(board);

  for (let i = 0; i < availableMoves.length; i++) {
    const move = availableMoves[i];
    board[move] = currentPlayer;

    const score = evaluateBoard(board, aiPlayer);

    if ((currentPlayer === aiPlayer && score > bestScore) || (currentPlayer !== aiPlayer && score < bestScore)) {
      bestScore = score;
      bestMove = move;
    }

    board[move] = null;
  }

  return { move: bestMove };
};
