import React from 'react';
import { motion } from 'motion/react';
import { Play, Clock, Users, Award } from 'lucide-react';
import { FloatingPanel } from './FloatingPanel';
import { Button } from './ui/button';

interface Dataset {
  id: string;
  title: string;
  expert: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  thumbnail: string;
  description: string;
}

interface DatasetSelectionProps {
  onSelectDataset: (datasetId: string) => void;
}

const mockDatasets: Dataset[] = [
  {
    id: '1',
    title: 'Surgical Suturing Technique',
    expert: 'Dr. Sarah Chen',
    duration: '8:32',
    difficulty: 'Advanced',
    category: 'Medical',
    thumbnail: '🏥',
    description: 'Master the precise hand movements for interrupted suturing'
  },
  {
    id: '2',
    title: 'Aircraft Engine Inspection',
    expert: 'Mike Rodriguez',
    duration: '12:45',
    difficulty: 'Intermediate',
    category: 'Aviation',
    thumbnail: '✈️',
    description: 'Learn systematic visual and tactile inspection protocols'
  },
  {
    id: '3',
    title: 'Violin Bow Technique',
    expert: 'Elena Volkov',
    duration: '6:18',
    difficulty: 'Beginner',
    category: 'Music',
    thumbnail: '🎻',
    description: 'Fundamental bowing patterns and wrist movements'
  },
  {
    id: '4',
    title: 'Robotic Arm Calibration',
    expert: 'Dr. James Liu',
    duration: '15:22',
    difficulty: 'Advanced',
    category: 'Engineering',
    thumbnail: '🤖',
    description: 'Precision calibration sequence for industrial robots'
  }
];

export function DatasetSelection({ onSelectDataset }: DatasetSelectionProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'Advanced': return 'text-red-400 bg-red-400/20 border-red-400/30';
      default: return 'text-white/60 bg-white/10 border-white/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 p-8">
      {/* Header */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-white mb-4">Holos Replay</h1>
        <p className="text-white/70 max-w-2xl mx-auto">
          Select an expert training session to replay and learn from precise human motion capture data
        </p>
      </motion.div>

      {/* Dataset Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockDatasets.map((dataset, index) => (
          <motion.div
            key={dataset.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <FloatingPanel 
              className="p-6 cursor-pointer group hover:shadow-2xl transition-all duration-300"
              variant="primary"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">{dataset.thumbnail}</div>
                <div className="flex-1">
                  <h3 className="text-white mb-2">{dataset.title}</h3>
                  <p className="text-white/70 text-sm mb-3">{dataset.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {dataset.expert}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {dataset.duration}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded-full text-xs border ${getDifficultyColor(dataset.difficulty)}`}>
                        {dataset.difficulty}
                      </span>
                      <span className="text-white/50 text-xs">{dataset.category}</span>
                    </div>
                    
                    <Button
                      onClick={() => onSelectDataset(dataset.id)}
                      variant="ghost"
                      size="sm"
                      className="text-white/80 hover:text-white hover:bg-white/10 group-hover:bg-white/20"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Training
                    </Button>
                  </div>
                </div>
              </div>
            </FloatingPanel>
          </motion.div>
        ))}
      </div>

      {/* Stats Panel */}
      <motion.div
        className="max-w-2xl mx-auto mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <FloatingPanel className="p-6" variant="secondary">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-white mb-1">24</div>
              <div className="text-white/60 text-sm">Training Sessions</div>
            </div>
            <div>
              <div className="text-white mb-1">8.2h</div>
              <div className="text-white/60 text-sm">Total Content</div>
            </div>
            <div>
              <div className="text-white mb-1">94%</div>
              <div className="text-white/60 text-sm">Avg. Accuracy</div>
            </div>
          </div>
        </FloatingPanel>
      </motion.div>
    </div>
  );
}