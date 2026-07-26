import React, { useState } from 'react';
import type { PlacementMetrics } from '@/services/placementService';
import { CheckSquare, Square, Target } from 'lucide-react';
import { Card, Badge } from '@/components/ui';

interface PlacementActionChecklistProps {
  items: PlacementMetrics['actionChecklist'];
}

export const PlacementActionChecklist: React.FC<PlacementActionChecklistProps> = ({ items: initialItems }) => {
  const [items, setItems] = useState(initialItems);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isCompleted: !item.isCompleted } : item))
    );
  };

  const completedCount = items.filter((i) => i.isCompleted).length;
  const totalCount = items.length;

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Target className="w-4 h-4 text-purple-400" /> Placement Action Plan & Milestones
          </h3>
          <p className="text-[11px] text-slate-400">Complete all milestones to achieve 100% placement readiness rating</p>
        </div>
        <span className="text-xs text-purple-300 font-mono font-bold">
          {completedCount} of {totalCount} Completed
        </span>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`w-full p-3.5 rounded-2xl text-left flex items-center justify-between transition-all select-none border ${
              item.isCompleted
                ? 'bg-slate-900/40 border-slate-800 text-slate-400 opacity-70'
                : 'bg-slate-900/90 border-slate-800 text-slate-200 hover:border-purple-500/40'
            }`}
          >
            <div className="flex items-center gap-3">
              {item.isCompleted ? (
                <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <Square className="w-4 h-4 text-slate-500 shrink-0" />
              )}
              <span className={`text-xs font-semibold ${item.isCompleted ? 'line-through' : 'text-white'}`}>
                {item.title}
              </span>
            </div>

            <Badge variant={item.isCompleted ? 'success' : 'primary'} size="sm">
              {item.category}
            </Badge>
          </button>
        ))}
      </div>
    </Card>
  );
};
