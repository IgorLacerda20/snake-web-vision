
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { GameStatus } from '@/lib/constants';

interface GameOverModalProps {
  status: GameStatus;
  score: number;
  highScore: number;
  onReset: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({
  status,
  score,
  highScore,
  onReset
}) => {
  const isNewHighScore = score > 0 && score >= highScore;
  
  return (
    <Dialog open={status === GameStatus.GAME_OVER}>
      <DialogContent className="bg-game-background border-gray-700 text-game-text">
        <DialogTitle className="text-center text-2xl">Game Over!</DialogTitle>
        <DialogDescription className="text-center">
          {isNewHighScore ? (
            <div className="text-yellow-400 font-bold text-lg">
              New High Score!
            </div>
          ) : (
            <div>Better luck next time!</div>
          )}
        </DialogDescription>
        
        <div className="grid grid-cols-2 gap-4 my-4">
          <div className="bg-gray-800 p-4 rounded-md text-center">
            <div className="text-sm opacity-80">Score</div>
            <div className="text-2xl font-bold">{score}</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-md text-center">
            <div className="text-sm opacity-80">Best</div>
            <div className="text-2xl font-bold">{highScore}</div>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            onClick={onReset} 
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            Play Again
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameOverModal;
