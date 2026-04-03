import { useState, useEffect } from 'react';
import { ArrowLeft, Monitor, Tablet, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useBuilderStore from '../store/builderStore';
import BlockRenderer from '../builder/BlockRenderer';
import { cn } from '../utils/cn';
import '../blocks';

const viewportWidths = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
};

export default function PreviewPage() {
  const navigate = useNavigate();
  const blocks = useBuilderStore(s => s.blocks);
  const [viewport, setViewport] = useState('desktop');

  // Load from localStorage if store is empty (direct navigation/reload)
  useEffect(() => {
    if (blocks.length === 0) {
      try {
        const saved = localStorage.getItem('pb:current-page');
        if (saved) {
          const data = JSON.parse(saved);
          if (data.blocks?.length) {
            useBuilderStore.getState().loadBlocks(data.blocks);
          }
        }
      } catch (e) {
        console.warn('Failed to load saved page:', e);
      }
    }
  }, []);

  const viewportOptions = [
    { key: 'desktop', icon: Monitor },
    { key: 'tablet', icon: Tablet },
    { key: 'mobile', icon: Smartphone },
  ];

  return (
    <div className="h-screen flex flex-col bg-canvas">
      {/* Preview bar */}
      <div className="h-12 bg-canvas-light border-b border-border flex items-center justify-between px-4 shrink-0">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm text-text-muted hover:text-text transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Editor
        </button>
        <div className="flex items-center gap-1 bg-surface rounded-lg p-1">
          {viewportOptions.map(({ key, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setViewport(key)}
              className={cn(
                'p-1.5 rounded-md transition-colors',
                viewport === key ? 'bg-accent text-white' : 'text-text-muted hover:text-text'
              )}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
        <div className="w-24" />
      </div>

      {/* Preview content */}
      <div className="flex-1 overflow-auto p-6">
        <div
          className={cn(
            'mx-auto bg-white min-h-full transition-all duration-300',
            viewport !== 'desktop' && 'shadow-2xl rounded-lg'
          )}
          style={{ maxWidth: viewportWidths[viewport] }}
        >
          {blocks.map(block => (
            <div key={block.id} style={{
              padding: block.style?.padding,
              backgroundColor: block.style?.backgroundColor || undefined,
              width: block.style?.width || '100%',
              minHeight: block.style?.minHeight || undefined,
            }}>
              <BlockRenderer block={block} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
