
import React, { useRef, useEffect } from 'react';
import { CELL_SIZE, GRID_SIZE } from '@/lib/constants';

interface GameBoardProps {
  grid: (string | null)[][];
}

const GameBoard: React.FC<GameBoardProps> = ({ grid }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid background
    ctx.fillStyle = '#1A1F2C';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid lines
    ctx.strokeStyle = 'rgba(42, 47, 60, 0.3)';
    ctx.lineWidth = 1;
    
    // Draw vertical lines
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE);
      ctx.stroke();
    }
    
    // Draw horizontal lines
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }
    
    // Draw cells
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const cellType = grid[y][x];
        if (!cellType) continue;
        
        const centerX = x * CELL_SIZE + CELL_SIZE / 2;
        const centerY = y * CELL_SIZE + CELL_SIZE / 2;
        
        if (cellType === 'food') {
          // Draw food as circle
          ctx.fillStyle = '#F97316';
          ctx.beginPath();
          ctx.arc(centerX, centerY, CELL_SIZE / 2 - 2, 0, Math.PI * 2);
          ctx.fill();
          
          // Add glow effect
          ctx.shadowColor = '#F97316';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(centerX, centerY, CELL_SIZE / 2 - 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        } else if (cellType === 'head') {
          // Draw snake head
          ctx.fillStyle = '#7E69AB';
          ctx.fillRect(
            x * CELL_SIZE + 1, 
            y * CELL_SIZE + 1, 
            CELL_SIZE - 2, 
            CELL_SIZE - 2
          );
          
          // Draw eyes
          ctx.fillStyle = '#fff';
          ctx.beginPath();
          ctx.arc(centerX - 3, centerY - 2, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(centerX + 3, centerY - 2, 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (cellType === 'body') {
          // Draw snake body
          ctx.fillStyle = '#9b87f5';
          ctx.fillRect(
            x * CELL_SIZE + 1, 
            y * CELL_SIZE + 1, 
            CELL_SIZE - 2, 
            CELL_SIZE - 2
          );
        }
      }
    }
  }, [grid]);
  
  return (
    <canvas
      ref={canvasRef}
      width={GRID_SIZE * CELL_SIZE}
      height={GRID_SIZE * CELL_SIZE}
      className="rounded-md shadow-lg border border-gray-700"
    />
  );
};

export default GameBoard;
