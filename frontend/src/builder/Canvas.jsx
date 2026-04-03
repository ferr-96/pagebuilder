import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Plus } from 'lucide-react';
import useBuilderStore from '../store/builderStore';
import BlockWrapper from './BlockWrapper';
import { cn } from '../utils/cn';

const viewportWidths = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
};

export default function Canvas() {
  const { blocks, viewport, selectBlock, moveBlock } = useBuilderStore();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      moveBlock(active.id, over.id);
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-canvas p-6" onClick={() => selectBlock(null)}>
      <div
        className={cn(
          'mx-auto bg-canvas-light min-h-[calc(100vh-6rem)] rounded-lg border border-border/50 transition-all duration-300',
          viewport !== 'desktop' && 'shadow-2xl'
        )}
        style={{ maxWidth: viewportWidths[viewport] }}
      >
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
            {blocks.length === 0 ? (
              <EmptyCanvas />
            ) : (
              <div className="space-y-0">
                {blocks.map(block => (
                  <BlockWrapper key={block.id} block={block} />
                ))}
              </div>
            )}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

function EmptyCanvas() {
  const addBlock = useBuilderStore(s => s.addBlock);
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="w-20 h-20 rounded-2xl bg-surface border-2 border-dashed border-border flex items-center justify-center">
        <Plus className="w-8 h-8 text-text-muted" />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-text mb-1">Start Building</h3>
        <p className="text-sm text-text-muted max-w-sm">
          Click any block from the left panel to add it to your page, or start with a template.
        </p>
      </div>
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => {
            addBlock('header');
            addBlock('hero');
            addBlock('text');
            addBlock('footer');
          }}
          className="px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover transition-colors"
        >
          Quick Start Template
        </button>
      </div>
    </div>
  );
}
