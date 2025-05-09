
import React from 'react';
import { Button } from '@/components/ui/button';
import { GameStatus } from '@/lib/constants';

interface GameControlsProps {
  status: GameStatus;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({ 
  status, 
  onStart, 
  onPause, 
  onResume, 
  onReset 
}) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4 justify-center">
      {status === GameStatus.IDLE && (
        <Button 
          onClick={onStart}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          Start Game
        </Button>
      )}
      
      {status === GameStatus.RUNNING && (
        <Button 
          onClick={onPause}
          className="bg-yellow-600 hover:bg-yellow-700 text-white"
        >
          Pause
        </Button>
      )}
      
      {status === GameStatus.PAUSED && (
        <>
          <Button 
            onClick={onResume}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Resume
          </Button>
          <Button 
            onClick={onReset}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Reset
          </Button>
        </>
      )}
      
      {status === GameStatus.GAME_OVER && (
        <Button 
          onClick={onReset}
          className="bg-red-600 hover:bg-red-700 text-white animate-game-over-pulse"
        >
          Play Again
        </Button>
      )}
      
      <div className="w-full mt-2 text-center text-sm text-gray-400">
        <p>Use arrow keys or WASD to control snake</p>
        <p>Press Space to start/pause/resume</p>
      </div>
    </div>
  );
};

export default GameControls;
