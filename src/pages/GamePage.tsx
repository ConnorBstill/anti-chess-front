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
    data, 
    error, 
    refetch: fetchEval 
  } = useQuery({
    queryKey: ['stockfish_eval'],
    queryFn: () => fetchEvaluation(fen),
    enabled: false
  });

  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());

  const onDrop = (sourceSquare: any, targetSquare: any): any => {
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
      fetchEval();
    } catch (err) {
      console.log('ILLEGAL MOVE', err)
    }
  };

  const resetGame = () => {
    console.log('Board click')
    const newGame = new Chess();
    setGame(newGame);
    setFen(newGame.fen());
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
      <div style={{ height: '50%', width: '50%' }}>
        <Chessboard 
        // customBoardStyle={{ width: '50%'}}
        // boardWidth={500}
        position={fen} 
        onPieceDrop={onDrop} />
      </div>
      <button onClick={resetGame} style={{ marginTop: '20px' }}>Reset Game</button>
    </div>
  )
}

export default GamePage;
