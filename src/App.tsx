import { useState } from 'react'
import './App.css';

import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';

const App = () => {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());

  const onDrop = (sourceSquare: any, targetSquare: any): any => {
    console.log(sourceSquare, targetSquare)
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q' 
    });

    // console.log

    if (move === null) {
      // illegal move
      return false;
    } else {
      setFen(game.fen());
      console.log(game.fen())
      return true;
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
  );
};

export default App;