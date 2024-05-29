import { useState } from 'react'

import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { useQuery } from '@tanstack/react-query'

import { fetchEvaluation,  } from '../services/StockfishService';

import '../App.css';

const GamePage = () => {

  const { 
    isRefetching, 
    isError, 
    // data: stockfishEval, 
    error, 
    refetch: fetchEval 
  } = useQuery({
    queryKey: ['stockfish_eval'],
    queryFn: () => fetchEvaluation(fen),
    enabled: false
  });

  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState<string>(game.fen());
  const [boardSide, setBoardSide] = useState<'white' | 'black'>('white');
  const [blackPiecesScore, setBlackPiecesScore] = useState(0);
  const [whitePiecesScore, setWhitePiecesScore] = useState(0);
  const [currentGameEval, setGameEvaluation] = useState(0);


  const onDrop = (sourceSquare: string, targetSquare: string): boolean => {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q' 
      });
      
      console.log(sourceSquare, targetSquare)
      console.log('MOVE', move)
      console.log('FEN', game.fen());
  
      setFen(game.fen());
      fetchEval().then(({ data }) => {
        if (data && data.evaluation) {
          console.log('stockfishEval', data.evaluation);

          if (move.color === 'w') {
            setWhitePiecesScore((prevScore) => calculateWhiteScore(prevScore, data.evaluation));
          } else if (move.color === 'b') {
            setBlackPiecesScore((prevScore) => calculateBlackScore(prevScore, data.evaluation));
          }
        }
      });


      return true;
    } catch (err) {
      console.log('ILLEGAL MOVE', err)
      return false;
    }
  }

  const calculateWhiteScore = (prevScore: number, newEval: number): number => {
    console.log('PREVSCORE', prevScore, newEval, currentGameEval)
    if (currentGameEval < newEval) return prevScore;
    if (currentGameEval > newEval) return (currentGameEval - newEval) + prevScore;

    return prevScore;
  }

  const calculateBlackScore = (prevScore: number, newEval: number) => {
    console.log('PREVSCORE', prevScore, newEval, currentGameEval)
    if (currentGameEval > newEval) return prevScore;
    if (currentGameEval < newEval) return (currentGameEval - newEval) + prevScore;

    return prevScore;
  }

  const resetGame = () => {
    console.log('Board click')
    const newGame = new Chess();
    setGame(newGame);
    setFen(newGame.fen());
  }

  const renderPlayerScore = () => {
    return boardSide === 'white' ? <span>{whitePiecesScore}</span> : <span>{blackPiecesScore}</span>;
  }

  const renderOpponentScore = () => {
    return boardSide === 'black' ? <span>{whitePiecesScore}</span> : <span>{blackPiecesScore}</span>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
      <div style={{ height: '50%', width: '50%' }}>
        <Chessboard 
        // customBoardStyle={{ width: '50%'}}
        // boardWidth={500}
        boardOrientation={boardSide}
        position={fen} 
        onPieceDrop={onDrop} />
      </div>
      {renderOpponentScore()}
      {renderPlayerScore()}
      <button onClick={resetGame} style={{ marginTop: '20px' }}>Reset Game</button>
    </div>
  )
}

export default GamePage;
