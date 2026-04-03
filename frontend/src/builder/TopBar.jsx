import { Monitor, Tablet, Smartphone, Undo2, Redo2, Eye, Save, Pencil } from 'lucide-react';
import useBuilderStore from '../store/builderStore';
import { cn } from '../utils/cn';
import { useNavigate } from 'react-router-dom';

export default function TopBar() {
  const { viewport, setViewport, isDirty, pageName, setPageName } = useBuilderStore();
  const navigate = useNavigate();

  const undo = useBuilderStore.temporal.getState().undo;
  const redo = useBuilderStore.temporal.getState().redo;

  const handleSave = () => {
    const { blocks, pageName } = useBuilderStore.getState();
    const data = { blocks, pageName, savedAt: new Date().toISOString() };
    localStorage.setItem('pb:current-page', JSON.stringify(data));
    useBuilderStore.getState().setDirty(false);
  };

  const viewportOptions = [
    { key: 'desktop', icon: Monitor, label: 'Desktop' },
    { key: 'tablet', icon: Tablet, label: 'Tablet' },
    { key: 'mobile', icon: Smartphone, label: 'Mobile' },
  ];

  return (
    <div className="h-12 bg-canvas-light border-b border-border flex items-center justify-between px-4 shrink-0">
      {/* Left: Page name */}
      <div className="flex items-center gap-2">
        <Pencil className="w-3.5 h-3.5 text-text-muted" />
        <input
          type="text"
          value={pageName}
          onChange={e => setPageName(e.target.value)}
          className="bg-transparent text-sm font-medium text-text border-none focus:outline-none focus:ring-1 focus:ring-accent rounded px-1 w-48"
        />
        {isDirty && <span className="w-2 h-2 rounded-full bg-warning" title="Unsaved changes" />}
      </div>

      {/* Center: Viewport toggle */}
      <div className="flex items-center gap-1 bg-surface rounded-lg p-1">
        {viewportOptions.map(({ key, icon: Icon, label }) => (
          <button
            key={key}
            onClick={() => setViewport(key)}
            className={cn(
              'p-1.5 rounded-md transition-colors',
              viewport === key ? 'bg-accent text-white' : 'text-text-muted hover:text-text hover:bg-surface-hover'
            )}
            title={label}
          >
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <button onClick={undo} className="p-2 text-text-muted hover:text-text rounded hover:bg-surface transition-colors" title="Undo (Ctrl+Z)">
          <Undo2 className="w-4 h-4" />
        </button>
        <button onClick={redo} className="p-2 text-text-muted hover:text-text rounded hover:bg-surface transition-colors" title="Redo (Ctrl+Shift+Z)">
          <Redo2 className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-border mx-1" />
        <button
          onClick={() => navigate('/preview')}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-text-muted hover:text-text rounded-lg hover:bg-surface transition-colors"
        >
          <Eye className="w-4 h-4" />
          Preview
        </button>
        <button
          onClick={handleSave}
          className={cn(
            'flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium rounded-lg transition-colors',
            isDirty
              ? 'bg-accent text-white hover:bg-accent-hover'
              : 'bg-surface text-text-muted'
          )}
        >
          <Save className="w-4 h-4" />
          Save
        </button>
      </div>
    </div>
  );
}
