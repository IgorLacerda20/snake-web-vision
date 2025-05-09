
import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  GRID_SIZE, 
  CELL_SIZE, 
  INITIAL_SNAKE_LENGTH, 
  GAME_SPEED, 
  Direction, 
  GameStatus, 
  KEY_MAPPINGS 
} from './constants';

export interface Position {
  x: number;
  y: number;
}

interface SnakeGameState {
  snake: Position[];
  food: Position;
  direction: Direction;
  nextDirection: Direction;
  status: GameStatus;
  score: number;
  highScore: number;
}

export const useSnakeGame = () => {
  const [state, setState] = useState<SnakeGameState>({
    snake: [],
    food: { x: 0, y: 0 },
    direction: Direction.RIGHT,
    nextDirection: Direction.RIGHT,
    status: GameStatus.IDLE,
    score: 0,
    highScore: 0
  });
  
  const gameLoopRef = useRef<number | null>(null);
  
  // Initialize the game
  const initGame = useCallback(() => {
    // Create initial snake in the middle of the board
    const initialSnake = Array.from({ length: INITIAL_SNAKE_LENGTH }).map((_, index) => ({
      x: Math.floor(GRID_SIZE / 2) - index,
      y: Math.floor(GRID_SIZE / 2)
    }));
    
    // Place food at a random position
    const food = getRandomFoodPosition(initialSnake);
    
    // Get high score from local storage
    const storedHighScore = localStorage.getItem('snakeHighScore');
    const highScore = storedHighScore ? parseInt(storedHighScore) : 0;
    
    setState({
      snake: initialSnake,
      food,
      direction: Direction.RIGHT,
      nextDirection: Direction.RIGHT,
      status: GameStatus.IDLE,
      score: 0,
      highScore
    });
  }, []);
  
  // Generate random position for food
  const getRandomFoodPosition = (snake: Position[]): Position => {
    const position: Position = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
    
    // Check if the position is occupied by the snake
    const isPositionOccupied = snake.some(segment => 
      segment.x === position.x && segment.y === position.y
    );
    
    if (isPositionOccupied) {
      return getRandomFoodPosition(snake);
    }
    
    return position;
  };
  
  // Check for collisions
  const checkCollision = (head: Position, snake: Position[]): boolean => {
    // Check for wall collision
    if (
      head.x < 0 || 
      head.y < 0 || 
      head.x >= GRID_SIZE || 
      head.y >= GRID_SIZE
    ) {
      return true;
    }
    
    // Check for self-collision (skip the head)
    for (let i = 1; i < snake.length; i++) {
      if (snake[i].x === head.x && snake[i].y === head.y) {
        return true;
      }
    }
    
    return false;
  };
  
  // Update the game state for each frame
  const updateGameState = useCallback(() => {
    setState(prevState => {
      // Skip updates if game is not running
      if (prevState.status !== GameStatus.RUNNING) {
        return prevState;
      }
      
      const { snake, food, nextDirection, score, highScore } = prevState;
      
      // Update direction
      const direction = nextDirection;
      
      // Calculate new head position
      const head = { ...snake[0] };
      switch (direction) {
        case Direction.UP:
          head.y -= 1;
          break;
        case Direction.DOWN:
          head.y += 1;
          break;
        case Direction.LEFT:
          head.x -= 1;
          break;
        case Direction.RIGHT:
          head.x += 1;
          break;
      }
      
      // Check for collision
      if (checkCollision(head, snake)) {
        // Update high score if needed
        const newHighScore = score > highScore ? score : highScore;
        if (newHighScore > highScore) {
          localStorage.setItem('snakeHighScore', newHighScore.toString());
        }
        
        return {
          ...prevState,
          status: GameStatus.GAME_OVER,
          highScore: newHighScore
        };
      }
      
      // Create new snake array with the new head
      const newSnake = [head, ...snake];
      
      // Check if snake ate the food
      let newFood = food;
      let newScore = score;
      
      if (head.x === food.x && head.y === food.y) {
        // Increase score
        newScore += 1;
        
        // Generate new food position
        newFood = getRandomFoodPosition(newSnake);
      } else {
        // Remove the tail if no food was eaten
        newSnake.pop();
      }
      
      return {
        ...prevState,
        snake: newSnake,
        food: newFood,
        direction,
        score: newScore
      };
    });
  }, []);
  
  // Start the game loop
  const startGame = useCallback(() => {
    if (state.status === GameStatus.RUNNING) return;
    
    // Initialize game if it's idle
    if (state.status === GameStatus.IDLE) {
      initGame();
    }
    
    setState(prevState => ({ ...prevState, status: GameStatus.RUNNING }));
  }, [state.status, initGame]);
  
  // Pause the game
  const pauseGame = useCallback(() => {
    if (state.status !== GameStatus.RUNNING) return;
    setState(prevState => ({ ...prevState, status: GameStatus.PAUSED }));
  }, [state.status]);
  
  // Resume the game
  const resumeGame = useCallback(() => {
    if (state.status !== GameStatus.PAUSED) return;
    setState(prevState => ({ ...prevState, status: GameStatus.RUNNING }));
  }, [state.status]);
  
  // Reset the game
  const resetGame = useCallback(() => {
    initGame();
  }, [initGame]);
  
  // Change direction of the snake
  const changeDirection = useCallback((newDirection: Direction) => {
    setState(prevState => {
      // Prevent 180-degree turns
      if (
        (prevState.direction === Direction.UP && newDirection === Direction.DOWN) ||
        (prevState.direction === Direction.DOWN && newDirection === Direction.UP) ||
        (prevState.direction === Direction.LEFT && newDirection === Direction.RIGHT) ||
        (prevState.direction === Direction.RIGHT && newDirection === Direction.LEFT)
      ) {
        return prevState;
      }
      
      return {
        ...prevState,
        nextDirection: newDirection
      };
    });
  }, []);
  
  // Handle keyboard controls
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const key = event.key;
    
    // Handle game controls (space, escape)
    if (key === ' ' || key === 'Spacebar') {
      event.preventDefault();
      if (state.status === GameStatus.RUNNING) {
        pauseGame();
      } else if (state.status === GameStatus.PAUSED || state.status === GameStatus.IDLE) {
        startGame();
      } else if (state.status === GameStatus.GAME_OVER) {
        resetGame();
        startGame();
      }
      return;
    }
    
    if (key === 'Escape') {
      pauseGame();
      return;
    }
    
    // Handle direction changes
    if (key in KEY_MAPPINGS) {
      event.preventDefault();
      changeDirection(KEY_MAPPINGS[key as keyof typeof KEY_MAPPINGS]);
    }
  }, [state.status, pauseGame, startGame, resetGame, changeDirection]);
  
  // Set up game loop and event listeners
  useEffect(() => {
    // Clear any existing game loop
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }
    
    // Set up keyboard event listener
    window.addEventListener('keydown', handleKeyDown);
    
    // Start game loop if game is running
    let lastTime = 0;
    let accumulator = 0;
    
    const gameLoop = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      
      accumulator += deltaTime;
      
      // Update game state at fixed intervals
      if (accumulator >= GAME_SPEED) {
        updateGameState();
        accumulator = 0;
      }
      
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };
    
    if (state.status === GameStatus.RUNNING) {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
    
    // Clean up
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [handleKeyDown, state.status, updateGameState]);
  
  // Initialize game on first render
  useEffect(() => {
    initGame();
  }, [initGame]);
  
  // Get the grid cells based on current state
  const getGrid = useCallback(() => {
    const { snake, food } = state;
    const grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));
    
    // Place food
    grid[food.y][food.x] = 'food';
    
    // Place snake
    snake.forEach((segment, index) => {
      if (segment.y >= 0 && segment.y < GRID_SIZE && segment.x >= 0 && segment.x < GRID_SIZE) {
        grid[segment.y][segment.x] = index === 0 ? 'head' : 'body';
      }
    });
    
    return grid;
  }, [state]);
  
  return {
    grid: getGrid(),
    score: state.score,
    highScore: state.highScore,
    status: state.status,
    startGame,
    pauseGame,
    resumeGame,
    resetGame,
    changeDirection
  };
};
