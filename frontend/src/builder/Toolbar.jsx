import { registry } from '../blocks/registry';
import useBuilderStore from '../store/builderStore';
import * as Icons from 'lucide-react';
import { cn } from '../utils/cn';

const categoryLabels = {
  navigation: 'Navigation',
  content: 'Content',
  media: 'Media',
  layout: 'Layout',
  commerce: 'Commerce',
};

const categoryOrder = ['navigation', 'content', 'media', 'layout', 'commerce'];

export default function Toolbar() {
  const addBlock = useBuilderStore(s => s.addBlock);
  const allDefs = registry.getAllDefinitions();

  const grouped = categoryOrder
    .map(cat => ({
      category: cat,
      label: categoryLabels[cat] || cat,
      blocks: allDefs.filter(d => d.category === cat),
    }))
    .filter(g => g.blocks.length > 0);

  return (
    <div className="w-56 bg-canvas-light border-r border-border h-full overflow-y-auto py-4 px-3 shrink-0">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-4 px-1">Blocks</h2>
      {grouped.map(group => (
        <div key={group.category} className="mb-5">
          <h3 className="text-[10px] font-semibold uppercase tracking-wider text-text-muted/60 mb-2 px-1">
            {group.label}
          </h3>
          <div className="grid grid-cols-2 gap-1.5">
            {group.blocks.map(def => {
              const Icon = Icons[def.icon] || Icons.Box;
              return (
                <button
                  key={def.type}
                  onClick={() => addBlock(def.type)}
                  className={cn(
                    'flex flex-col items-center gap-1.5 p-3 rounded-lg',
                    'bg-surface/50 hover:bg-surface-hover border border-transparent hover:border-border',
                    'transition-all duration-150 cursor-pointer group'
                  )}
                  title={`Add ${def.label}`}
                >
                  <Icon className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors" />
                  <span className="text-[10px] text-text-muted group-hover:text-text transition-colors leading-tight text-center">
                    {def.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
