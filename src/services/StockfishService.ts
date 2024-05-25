import { StockfishResponse } from '../types/stockfish.types';

export const fetchEvaluation = async (fen: string): Promise<StockfishResponse | void> => {
  try {
    const response = await fetch(
      `https://stockfish.online/api/s/v2.php?fen=${fen}&depth=10`,
      {
        method: 'GET'
      }
    );

    const data =  await response.json();
    console.log('fetchEvaluation', data);

    return data
  } catch (err) {
    console.log('fetchEvaluation ERROR', err)
  }
}
