
import React from 'react';
import { Button } from '@/components/ui/button';
import { Direction } from '@/lib/constants';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface MobileControlsProps {
  onDirectionChange: (direction: Direction) => void;
}

const MobileControls: React.FC<MobileControlsProps> = ({ onDirectionChange }) => {
  return (
    <div className="grid grid-cols-3 gap-2 max-w-[180px] mx-auto mt-4 md:hidden">
      <div className="col-start-2">
        <Button
          variant="outline"
          className="w-full aspect-square border-gray-600 text-gray-300 hover:bg-gray-700"
          onClick={() => onDirectionChange(Direction.UP)}
          aria-label="Move Up"
        >
          <ArrowUp size={24} />
        </Button>
      </div>
      <div className="col-start-1 row-start-2">
        <Button
          variant="outline"
          className="w-full aspect-square border-gray-600 text-gray-300 hover:bg-gray-700"
          onClick={() => onDirectionChange(Direction.LEFT)}
          aria-label="Move Left"
        >
          <ArrowLeft size={24} />
        </Button>
      </div>
      <div className="col-start-2 row-start-2">
        <div className="w-full aspect-square bg-gray-800 rounded-md flex items-center justify-center">
          <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
        </div>
      </div>
      <div className="col-start-3 row-start-2">
        <Button
          variant="outline"
          className="w-full aspect-square border-gray-600 text-gray-300 hover:bg-gray-700"
          onClick={() => onDirectionChange(Direction.RIGHT)}
          aria-label="Move Right"
        >
          <ArrowRight size={24} />
        </Button>
      </div>
      <div className="col-start-2 row-start-3">
        <Button
          variant="outline"
          className="w-full aspect-square border-gray-600 text-gray-300 hover:bg-gray-700"
          onClick={() => onDirectionChange(Direction.DOWN)}
          aria-label="Move Down"
        >
          <ArrowDown size={24} />
        </Button>
      </div>
    </div>
  );
};

export default MobileControls;
