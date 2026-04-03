import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Copy, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '../utils/cn';
import useBuilderStore from '../store/builderStore';
import BlockRenderer from './BlockRenderer';
import { registry } from '../blocks/registry';
import { useState, useCallback } from 'react';

export default function BlockWrapper({ block }) {
  const { selectedBlockId, hoveredBlockId, selectBlock, setHoveredBlock, duplicateBlock, removeBlock, moveBlockUp, moveBlockDown } = useBuilderStore();
  const isSelected = selectedBlockId === block.id;
  const isHovered = hoveredBlockId === block.id;
  const def = registry.getDefinition(block.type);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    backgroundColor: block.style?.backgroundColor || undefined,
    backgroundImage: block.style?.backgroundImage ? `url(${block.style.backgroundImage})` : undefined,
    padding: block.style?.padding || undefined,
    margin: block.style?.margin || undefined,
    width: block.style?.width || '100%',
    minHeight: block.style?.minHeight || undefined,
  };

  // Resize state
  const [isResizing, setIsResizing] = useState(false);

  const handleResizeStart = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsResizing(true);
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = e.target.closest('[data-block-wrapper]')?.offsetWidth || 0;
    const startHeight = e.target.closest('[data-block-wrapper]')?.offsetHeight || 0;
    const store = useBuilderStore.getState();

    const onMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      const newWidth = Math.max(100, startWidth + dx);
      const newHeight = Math.max(40, startHeight + dy);
      const updates = {};
      if (def?.resizable?.width) updates.width = `${newWidth}px`;
      if (def?.resizable?.height) updates.minHeight = `${newHeight}px`;
      if (Object.keys(updates).length) store.updateBlockStyle(block.id, updates);
    };

    const onUp = () => {
      setIsResizing(false);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }, [block.id, def]);

  return (
    <div
      ref={setNodeRef}
      data-block-wrapper
      style={style}
      className={cn(
        'relative group transition-all duration-150',
        isSelected && 'ring-2 ring-accent z-10',
        isHovered && !isSelected && 'ring-1 ring-border-focus/50',
        isDragging && 'z-50',
      )}
      onClick={(e) => { e.stopPropagation(); selectBlock(block.id); }}
      onMouseEnter={() => setHoveredBlock(block.id)}
      onMouseLeave={() => setHoveredBlock(null)}
    >
      {/* Type label */}
      {(isSelected || isHovered) && (
        <div className="absolute -top-6 left-0 bg-accent text-white text-[10px] font-semibold px-2 py-0.5 rounded-t-md z-20">
          {def?.label || block.type}
        </div>
      )}

      {/* Drag handle */}
      {(isSelected || isHovered) && (
        <div
          className="absolute -left-8 top-1/2 -translate-y-1/2 bg-surface border border-border rounded p-1 cursor-grab active:cursor-grabbing z-20 opacity-0 group-hover:opacity-100 transition-opacity"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="w-4 h-4 text-text-muted" />
        </div>
      )}

      {/* Mini toolbar */}
      {isSelected && (
        <div className="absolute -top-6 right-0 flex gap-1 z-20">
          <button onClick={(e) => { e.stopPropagation(); moveBlockUp(block.id); }} className="bg-surface border border-border rounded p-1 hover:bg-surface-hover" title="Move Up">
            <ChevronUp className="w-3 h-3 text-text-muted" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); moveBlockDown(block.id); }} className="bg-surface border border-border rounded p-1 hover:bg-surface-hover" title="Move Down">
            <ChevronDown className="w-3 h-3 text-text-muted" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); duplicateBlock(block.id); }} className="bg-surface border border-border rounded p-1 hover:bg-surface-hover" title="Duplicate">
            <Copy className="w-3 h-3 text-text-muted" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); removeBlock(block.id); }} className="bg-surface border border-danger/50 rounded p-1 hover:bg-danger/20" title="Delete">
            <Trash2 className="w-3 h-3 text-danger" />
          </button>
        </div>
      )}

      {/* Block content */}
      <BlockRenderer block={block} />

      {/* Resize handle */}
      {isSelected && (def?.resizable?.width || def?.resizable?.height) && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-20 group/resize"
          onPointerDown={handleResizeStart}
        >
          <svg viewBox="0 0 16 16" className="w-4 h-4 text-accent">
            <path d="M14 14L14 6M14 14L6 14" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </div>
      )}
    </div>
  );
}
