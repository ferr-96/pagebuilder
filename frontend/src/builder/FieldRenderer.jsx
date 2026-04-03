import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { cn } from '../utils/cn';

export default function FieldRenderer({ field, value, onChange }) {
  const [showColorPicker, setShowColorPicker] = useState(false);

  switch (field.type) {
    case 'text':
      return (
        <div>
          <label className="block text-xs font-medium text-text-muted mb-1">{field.label}</label>
          <input
            type="text"
            value={value || ''}
            onChange={e => onChange(e.target.value)}
            className="w-full bg-surface border border-border rounded-md px-3 py-2 text-sm text-text focus:outline-none focus:border-accent"
          />
        </div>
      );

    case 'textarea':
      return (
        <div>
          <label className="block text-xs font-medium text-text-muted mb-1">{field.label}</label>
          <textarea
            value={value || ''}
            onChange={e => onChange(e.target.value)}
            rows={3}
            className="w-full bg-surface border border-border rounded-md px-3 py-2 text-sm text-text focus:outline-none focus:border-accent resize-y"
          />
        </div>
      );

    case 'number':
      return (
        <div>
          <label className="block text-xs font-medium text-text-muted mb-1">{field.label}</label>
          <input
            type="number"
            value={value ?? ''}
            onChange={e => onChange(Number(e.target.value))}
            className="w-full bg-surface border border-border rounded-md px-3 py-2 text-sm text-text focus:outline-none focus:border-accent"
          />
        </div>
      );

    case 'url':
      return (
        <div>
          <label className="block text-xs font-medium text-text-muted mb-1">{field.label}</label>
          <input
            type="url"
            value={value || ''}
            onChange={e => onChange(e.target.value)}
            placeholder="https://..."
            className="w-full bg-surface border border-border rounded-md px-3 py-2 text-sm text-text focus:outline-none focus:border-accent"
          />
        </div>
      );

    case 'image':
      return (
        <div>
          <label className="block text-xs font-medium text-text-muted mb-1">{field.label}</label>
          <input
            type="url"
            value={value || ''}
            onChange={e => onChange(e.target.value)}
            placeholder="Image URL..."
            className="w-full bg-surface border border-border rounded-md px-3 py-2 text-sm text-text focus:outline-none focus:border-accent"
          />
          {value && (
            <img src={value} alt="Preview" className="mt-2 w-full h-20 object-cover rounded border border-border" />
          )}
        </div>
      );

    case 'color':
      return (
        <div className="relative">
          <label className="block text-xs font-medium text-text-muted mb-1">{field.label}</label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="w-8 h-8 rounded border border-border shrink-0"
              style={{ backgroundColor: value || '#000' }}
            />
            <input
              type="text"
              value={value || ''}
              onChange={e => onChange(e.target.value)}
              className="flex-1 bg-surface border border-border rounded-md px-3 py-2 text-sm text-text focus:outline-none focus:border-accent"
            />
          </div>
          {showColorPicker && (
            <div className="absolute z-50 mt-2">
              <div className="fixed inset-0" onClick={() => setShowColorPicker(false)} />
              <div className="relative">
                <HexColorPicker color={value || '#000'} onChange={onChange} />
              </div>
            </div>
          )}
        </div>
      );

    case 'select':
      return (
        <div>
          <label className="block text-xs font-medium text-text-muted mb-1">{field.label}</label>
          <select
            value={value ?? field.defaultValue}
            onChange={e => {
              const v = e.target.value;
              onChange(isNaN(v) ? v : Number(v));
            }}
            className="w-full bg-surface border border-border rounded-md px-3 py-2 text-sm text-text focus:outline-none focus:border-accent"
          >
            {field.options?.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      );

    case 'boolean':
      return (
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-text-muted">{field.label}</label>
          <button
            onClick={() => onChange(!value)}
            className={cn(
              'w-10 h-6 rounded-full transition-colors relative',
              value ? 'bg-accent' : 'bg-surface border border-border'
            )}
          >
            <div className={cn(
              'w-4 h-4 rounded-full bg-white absolute top-1 transition-transform',
              value ? 'translate-x-5' : 'translate-x-1'
            )} />
          </button>
        </div>
      );

    case 'items':
      return <ItemsField field={field} value={value} onChange={onChange} />;

    default:
      return (
        <div>
          <label className="block text-xs font-medium text-text-muted mb-1">{field.label}</label>
          <input
            type="text"
            value={String(value ?? '')}
            onChange={e => onChange(e.target.value)}
            className="w-full bg-surface border border-border rounded-md px-3 py-2 text-sm text-text focus:outline-none focus:border-accent"
          />
        </div>
      );
  }
}

function ItemsField({ field, value, onChange }) {
  const items = Array.isArray(value) ? value : [];
  const subFields = field.itemFields || [];

  const addItem = () => {
    const newItem = {};
    subFields.forEach(sf => { newItem[sf.key] = sf.defaultValue; });
    onChange([...items, newItem]);
  };

  const removeItem = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (index, key, val) => {
    const updated = items.map((item, i) =>
      i === index ? { ...item, [key]: val } : item
    );
    onChange(updated);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-medium text-text-muted">{field.label}</label>
        <button onClick={addItem} className="text-accent hover:text-accent-hover p-1 rounded hover:bg-surface">
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="bg-canvas/50 border border-border/50 rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-text-muted/50">Item {i + 1}</span>
              <button onClick={() => removeItem(i)} className="text-danger/60 hover:text-danger p-0.5">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
            {subFields.map(sf => (
              <FieldRenderer
                key={sf.key}
                field={sf}
                value={item[sf.key]}
                onChange={val => updateItem(i, sf.key, val)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
