import React from 'react';
import { motion } from 'motion/react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Rewind, 
  FastForward,
  Camera,
  Eye 
} from 'lucide-react';
import { FloatingPanel } from './FloatingPanel';
import { Button } from './ui/button';
import { Slider } from './ui/slider';

interface PlaybackControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackSpeed: number;
  viewMode: 'first-person' | 'third-person';
  onPlayPause: () => void;
  onRestart: () => void;
  onRewind: () => void;
  onFastForward: () => void;
  onSeek: (time: number) => void;
  onSpeedChange: (speed: number) => void;
  onViewModeToggle: () => void;
}

export function PlaybackControls({
  isPlaying,
  currentTime,
  duration,
  playbackSpeed,
  viewMode,
  onPlayPause,
  onRestart,
  onRewind,
  onFastForward,
  onSeek,
  onSpeedChange,
  onViewModeToggle
}: PlaybackControlsProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <FloatingPanel className="p-6" variant="primary">
      {/* Timeline */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/80 text-sm">{formatTime(currentTime)}</span>
          <span className="text-white/60 text-sm">{formatTime(duration)}</span>
        </div>
        <Slider
          value={[currentTime]}
          max={duration}
          step={0.1}
          onValueChange={(value) => onSeek(value[0])}
          className="w-full"
        />
      </div>

      {/* Main Controls */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={onRestart}
          className="text-white/80 hover:text-white hover:bg-white/10 h-10 w-10"
        >
          <RotateCcw className="h-5 w-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onRewind}
          className="text-white/80 hover:text-white hover:bg-white/10 h-10 w-10"
        >
          <Rewind className="h-5 w-5" />
        </Button>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            size="icon"
            onClick={onPlayPause}
            className="text-white hover:text-white hover:bg-white/20 h-12 w-12 rounded-full bg-white/10 border border-white/20"
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6 ml-0.5" />
            )}
          </Button>
        </motion.div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onFastForward}
          className="text-white/80 hover:text-white hover:bg-white/10 h-10 w-10"
        >
          <FastForward className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onViewModeToggle}
          className="text-white/80 hover:text-white hover:bg-white/10 h-10 w-10"
        >
          {viewMode === 'first-person' ? (
            <Eye className="h-5 w-5" />
          ) : (
            <Camera className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Speed Control */}
      <div className="flex items-center gap-4">
        <span className="text-white/80 text-sm min-w-fit">Speed</span>
        <Slider
          value={[playbackSpeed]}
          min={0.25}
          max={2}
          step={0.25}
          onValueChange={(value) => onSpeedChange(value[0])}
          className="flex-1"
        />
        <span className="text-white/80 text-sm min-w-fit">{playbackSpeed}x</span>
      </div>
    </FloatingPanel>
  );
}