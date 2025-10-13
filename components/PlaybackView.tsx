import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, RotateCw, MessageSquare, Bookmark } from 'lucide-react';
import { Avatar3D } from './Avatar3D';
import { PlaybackControls } from './PlaybackControls';
import { FloatingPanel } from './FloatingPanel';
import { Button } from './ui/button';

interface PlaybackViewProps {
  datasetId: string;
  onBack: () => void;
}

export function PlaybackView({ datasetId, onBack }: PlaybackViewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [viewMode, setViewMode] = useState<'first-person' | 'third-person'>('third-person');
  const [showNarration, setShowNarration] = useState(true);
  
  const duration = 512; // 8:32 in seconds
  const currentStep = Math.floor((currentTime / duration) * 5) + 1;

  // Mock dataset info
  const datasetInfo = {
    title: 'Surgical Suturing Technique',
    expert: 'Dr. Sarah Chen',
    step: `Step ${currentStep}: Hand positioning and needle grip`
  };

  const narrationSteps = [
    { time: 0, text: "Begin by positioning your dominant hand with the needle holder at a 45-degree angle..." },
    { time: 102, text: "Notice the precise wrist rotation as we pierce the tissue at the optimal entry point..." },
    { time: 205, text: "The key is maintaining consistent tension while drawing the suture through..." },
    { time: 308, text: "Observe the finger positioning during the instrument tie formation..." },
    { time: 410, text: "Final step: securing the knot with controlled pressure and release..." }
  ];

  const currentNarration = narrationSteps
    .filter(step => step.time <= currentTime)
    .pop()?.text || narrationSteps[0].text;

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleRestart = () => setCurrentTime(0);
  const handleRewind = () => setCurrentTime(Math.max(0, currentTime - 10));
  const handleFastForward = () => setCurrentTime(Math.min(duration, currentTime + 10));
  const handleSeek = (time: number) => setCurrentTime(time);
  const handleSpeedChange = (speed: number) => setPlaybackSpeed(speed);
  const handleViewModeToggle = () => {
    setViewMode(viewMode === 'first-person' ? 'third-person' : 'first-person');
  };

  // Simulate time progression when playing
  React.useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + playbackSpeed;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, playbackSpeed, duration]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 p-8">
      {/* Header */}
      <motion.div 
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-white/80 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-white">{datasetInfo.title}</h2>
            <p className="text-white/70 text-sm">{datasetInfo.expert}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowNarration(!showNarration)}
            className="text-white/80 hover:text-white hover:bg-white/10"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Narration
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white/80 hover:text-white hover:bg-white/10"
          >
            <Bookmark className="h-4 w-4 mr-2" />
            Bookmark
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Main Avatar Display */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Avatar3D 
            isPlaying={isPlaying}
            viewMode={viewMode}
            currentTime={currentTime}
          />

          {/* Current Step Indicator */}
          <motion.div className="mt-4">
            <FloatingPanel className="p-4" variant="secondary">
              <div className="flex items-center justify-between">
                <span className="text-white">{datasetInfo.step}</span>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((step) => (
                      <div
                        key={step}
                        className={`w-2 h-2 rounded-full ${
                          step <= currentStep ? 'bg-blue-400' : 'bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-white/60 text-sm ml-2">{currentStep}/5</span>
                </div>
              </div>
            </FloatingPanel>
          </motion.div>
        </motion.div>

        {/* Side Panel */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Playback Controls */}
          <PlaybackControls
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            playbackSpeed={playbackSpeed}
            viewMode={viewMode}
            onPlayPause={handlePlayPause}
            onRestart={handleRestart}
            onRewind={handleRewind}
            onFastForward={handleFastForward}
            onSeek={handleSeek}
            onSpeedChange={handleSpeedChange}
            onViewModeToggle={handleViewModeToggle}
          />

          {/* Narration Panel */}
          {showNarration && (
            <FloatingPanel className="p-4" variant="secondary">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white/80 text-sm">Live Narration</span>
              </div>
              <p className="text-white/90 text-sm leading-relaxed">
                {currentNarration}
              </p>
            </FloatingPanel>
          )}

          {/* Action Markers */}
          <FloatingPanel className="p-4" variant="secondary">
            <h4 className="text-white mb-3">Key Actions</h4>
            <div className="space-y-2">
              {[
                { time: '1:42', action: 'Initial needle positioning', color: 'bg-yellow-400' },
                { time: '3:25', action: 'Tissue penetration', color: 'bg-green-400' },
                { time: '5:08', action: 'Suture threading', color: 'bg-blue-400' },
                { time: '6:51', action: 'Knot formation', color: 'bg-purple-400' }
              ].map((marker, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                  <div className={`w-2 h-2 rounded-full ${marker.color}`} />
                  <span className="text-white/60">{marker.time}</span>
                  <span className="text-white/80">{marker.action}</span>
                </div>
              ))}
            </div>
          </FloatingPanel>
        </motion.div>
      </div>
    </div>
  );
}