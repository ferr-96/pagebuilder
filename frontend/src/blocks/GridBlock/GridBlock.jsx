import { Plus } from 'lucide-react';

export default function GridBlock({ block }) {
  const { columns, gap } = block.props;
  const cols = Number(columns) || 3;
  const children = block.children || Array.from({ length: cols }, () => []);

  return (
    <div
      className="w-full grid"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: `${gap}px`,
      }}
    >
      {Array.from({ length: cols }).map((_, colIdx) => (
        <div
          key={colIdx}
          className="min-h-[80px] rounded-lg border-2 border-dashed border-border/50 p-3 flex flex-col items-center justify-center gap-2"
        >
          {children[colIdx]?.length > 0 ? (
            children[colIdx].map((child, i) => (
              <div key={child.id || i} className="w-full text-text-muted text-sm p-2 bg-surface/50 rounded">
                {child.type}: {child.props?.content || child.props?.text || child.props?.heading || '(block)'}
              </div>
            ))
          ) : (
            <>
              <Plus className="w-5 h-5 text-text-muted/50" />
              <span className="text-xs text-text-muted/50">Column {colIdx + 1}</span>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
