import { MdOutlineNavigation } from 'react-icons/md';

interface ControlsProps {
  onGetCurrentLocation: () => void;
  isLoading: boolean;
}

export function Controls({ onGetCurrentLocation, isLoading }: ControlsProps) {
  return (
    <div className="absolute right-1 top-1 z-10 flex gap-2 md:right-4 md:top-4">
      <button
        onClick={onGetCurrentLocation}
        className="flex items-center gap-1 rounded-md bg-white px-1 py-1 text-xs shadow-md transition-all disabled:opacity-50 md:gap-2 md:px-3 md:py-2 md:text-sm"
        disabled={isLoading}
      >
        <MdOutlineNavigation
          className={`md:h-4 md:w-4 ${isLoading ? 'animate-spin' : ''}`}
        />

        {isLoading ? 'Getting location...' : 'Current Location'}
      </button>
    </div>
  );
}
