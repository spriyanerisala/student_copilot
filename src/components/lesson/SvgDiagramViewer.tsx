import React from 'react';
import { Layers } from 'lucide-react';
import { Card } from '@/components/ui';

interface SvgDiagramViewerProps {
  svgDiagram?: string;
  title?: string;
}

export const SvgDiagramViewer: React.FC<SvgDiagramViewerProps> = ({ svgDiagram }) => {
  if (!svgDiagram) return null;

  return (
    <Card className="p-6 space-y-3 bg-slate-900/90 border border-purple-500/20">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-4 h-4 text-purple-400" /> Architectural SVG Diagram
        </h4>
        <span className="text-[10px] text-purple-300 font-mono">Interactive View</span>
      </div>

      <div
        className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-x-auto shadow-inner"
        dangerouslySetInnerHTML={{ __html: svgDiagram }}
      />
    </Card>
  );
};
