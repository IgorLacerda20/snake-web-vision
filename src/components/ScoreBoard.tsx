
import React from 'react';
import { GameStatus } from '@/lib/constants';

interface ScoreBoardProps {
  score: number;
  highScore: number;
  status: GameStatus;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, highScore, status }) => {
  return (
    <div className="flex justify-between items-center w-full p-4 bg-game-background rounded-md shadow-md border border-gray-700 text-game-text">
      <div className="flex flex-col">
        <span className="text-sm opacity-80">Score</span>
        <span className="text-2xl font-bold">{score}</span>
      </div>
      
      <div className="flex flex-col items-center">
        <span className={`text-sm ${status === GameStatus.RUNNING ? 'text-green-400' : status === GameStatus.PAUSED ? 'text-yellow-400' : status === GameStatus.GAME_OVER ? 'text-red-400' : 'text-blue-400'}`}>
          {status === GameStatus.RUNNING ? 'Playing' : 
           status === GameStatus.PAUSED ? 'Paused' : 
           status === GameStatus.GAME_OVER ? 'Game Over' : 'Ready'}
        </span>
      </div>
      
      <div className="flex flex-col items-end">
        <span className="text-sm opacity-80">Best</span>
        <span className="text-2xl font-bold">{highScore}</span>
      </div>
    </div>
  );
};

export default ScoreBoard;
