
import React, { useEffect } from 'react';
import GameBoard from '@/components/GameBoard';
import ScoreBoard from '@/components/ScoreBoard';
import GameControls from '@/components/GameControls';
import MobileControls from '@/components/MobileControls';
import GameOverModal from '@/components/GameOverModal';
import { useSnakeGame } from '@/lib/useSnakeGame';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const {
    grid,
    score,
    highScore,
    status,
    startGame,
    pauseGame,
    resumeGame,
    resetGame,
    changeDirection
  } = useSnakeGame();
  
  const isMobile = useIsMobile();
  const { toast } = useToast();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (status === 'running') {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [status]);
  
  useEffect(() => {
    if (score > 0 && score % 5 === 0) {
      toast({
        title: `Score: ${score}`,
        description: score % 10 === 0 ? "Great job! Keep going!" : "You're doing well!",
      });
    }
  }, [score, toast]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 px-4 py-8">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-center text-game-text">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            Snake Game
          </span>
        </h1>
        
        <div className="snake-game-container">
          <ScoreBoard score={score} highScore={highScore} status={status} />
          
          <div className="my-4 flex justify-center">
            <GameBoard grid={grid} />
          </div>
          
          <GameControls
            status={status}
            onStart={startGame}
            onPause={pauseGame}
            onResume={resumeGame}
            onReset={() => {
              resetGame();
              startGame();
            }}
          />
          
          {isMobile && (
            <MobileControls onDirectionChange={changeDirection} />
          )}
        </div>
        
        <GameOverModal
          status={status}
          score={score}
          highScore={highScore}
          onReset={() => {
            resetGame();
            startGame();
          }}
        />
      </div>
    </div>
  );
};

export default Index;
