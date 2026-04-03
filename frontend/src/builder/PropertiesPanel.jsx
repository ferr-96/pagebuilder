import { X } from 'lucide-react';
import useBuilderStore from '../store/builderStore';
import { registry } from '../blocks/registry';
import FieldRenderer from './FieldRenderer';
import { cn } from '../utils/cn';
import { useState } from 'react';

export default function PropertiesPanel() {
  const { selectedBlockId, blocks, selectBlock, updateBlockProps, updateBlockStyle } = useBuilderStore();
  const [activeTab, setActiveTab] = useState('content');

  const block = blocks.find(b => b.id === selectedBlockId);
  if (!block) return null;

  const def = registry.getDefinition(block.type);
  if (!def) return null;

  const handlePropChange = (key, value) => {
    updateBlockProps(block.id, { [key]: value });
  };

  const handleStyleChange = (key, value) => {
    updateBlockStyle(block.id, { [key]: value });
  };

  return (
    <div className="w-72 bg-canvas-light border-l border-border h-full overflow-y-auto shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-sm font-semibold text-text">{def.label}</h3>
        <button onClick={() => selectBlock(null)} className="text-text-muted hover:text-text p-1 rounded hover:bg-surface">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        {['content', 'style'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'flex-1 py-2 text-xs font-medium capitalize transition-colors',
              activeTab === tab ? 'text-accent border-b-2 border-accent' : 'text-text-muted hover:text-text'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-4 space-y-4">
        {activeTab === 'content' && (
          <>
            {def.fields.map(field => (
              <FieldRenderer
                key={field.key}
                field={field}
                value={block.props[field.key]}
                onChange={val => handlePropChange(field.key, val)}
              />
            ))}
          </>
        )}

        {activeTab === 'style' && (
          <>
            <FieldRenderer
              field={{ key: 'width', label: 'Width', type: 'text', defaultValue: '100%' }}
              value={block.style?.width || '100%'}
              onChange={val => handleStyleChange('width', val)}
            />
            <FieldRenderer
              field={{ key: 'minHeight', label: 'Min Height', type: 'text', defaultValue: '' }}
              value={block.style?.minHeight || ''}
              onChange={val => handleStyleChange('minHeight', val)}
            />
            <FieldRenderer
              field={{ key: 'padding', label: 'Padding', type: 'text', defaultValue: '16px' }}
              value={block.style?.padding || '16px'}
              onChange={val => handleStyleChange('padding', val)}
            />
            <FieldRenderer
              field={{ key: 'margin', label: 'Margin', type: 'text', defaultValue: '0' }}
              value={block.style?.margin || '0'}
              onChange={val => handleStyleChange('margin', val)}
            />
            <FieldRenderer
              field={{ key: 'backgroundColor', label: 'Background Color', type: 'color', defaultValue: '' }}
              value={block.style?.backgroundColor || ''}
              onChange={val => handleStyleChange('backgroundColor', val)}
            />
            <FieldRenderer
              field={{ key: 'backgroundImage', label: 'Background Image URL', type: 'image', defaultValue: '' }}
              value={block.style?.backgroundImage || ''}
              onChange={val => handleStyleChange('backgroundImage', val)}
            />
          </>
        )}
      </div>
    </div>
  );
}
