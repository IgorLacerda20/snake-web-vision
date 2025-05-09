
// Game board size and cell dimensions
export const GRID_SIZE = 20;
export const CELL_SIZE = 20;
export const INITIAL_SNAKE_LENGTH = 3;
export const GAME_SPEED = 150; // milliseconds

// Game states
export enum GameStatus {
  IDLE = 'idle',
  RUNNING = 'running',
  PAUSED = 'paused',
  GAME_OVER = 'game-over'
}

// Direction constants
export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

// Snake cell types
export enum CellType {
  EMPTY = 'empty',
  SNAKE = 'snake',
  SNAKE_HEAD = 'snake-head',
  FOOD = 'food'
}

// Key mappings
export const KEY_MAPPINGS = {
  ArrowUp: Direction.UP,
  ArrowDown: Direction.DOWN,
  ArrowLeft: Direction.LEFT,
  ArrowRight: Direction.RIGHT,
  w: Direction.UP,
  s: Direction.DOWN,
  a: Direction.LEFT,
  d: Direction.RIGHT,
};
