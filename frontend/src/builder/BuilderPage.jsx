import { useEffect } from 'react';
import TopBar from './TopBar';
import Toolbar from './Toolbar';
import Canvas from './Canvas';
import PropertiesPanel from './PropertiesPanel';
import useBuilderStore from '../store/builderStore';
import '../blocks';

export default function BuilderPage() {
  const selectedBlockId = useBuilderStore(s => s.selectedBlockId);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('pb:current-page');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.blocks?.length) {
          useBuilderStore.getState().loadBlocks(data.blocks);
          if (data.pageName) useBuilderStore.getState().setPageName(data.pageName);
        }
      }
    } catch (e) {
      console.warn('Failed to load saved page:', e);
    }
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    const unsub = useBuilderStore.subscribe(
      (state) => state.blocks,
      (blocks) => {
        const { pageName } = useBuilderStore.getState();
        const data = { blocks, pageName, savedAt: new Date().toISOString() };
        localStorage.setItem('pb:current-page', JSON.stringify(data));
      },
      { fireImmediately: false }
    );
    return unsub;
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      const { selectedBlockId, removeBlock, duplicateBlock, moveBlockUp, moveBlockDown, selectBlock } = useBuilderStore.getState();
      const temporal = useBuilderStore.temporal.getState();

      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT' || e.target.isContentEditable) return;

      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedBlockId) { e.preventDefault(); removeBlock(selectedBlockId); }
      }
      if (e.key === 'd' && (e.ctrlKey || e.metaKey)) {
        if (selectedBlockId) { e.preventDefault(); duplicateBlock(selectedBlockId); }
      }
      if (e.key === 'z' && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
        e.preventDefault(); temporal.undo();
      }
      if (e.key === 'z' && (e.ctrlKey || e.metaKey) && e.shiftKey) {
        e.preventDefault(); temporal.redo();
      }
      if (e.key === 'Escape') {
        selectBlock(null);
      }
      if (e.key === 'ArrowUp' && e.altKey && selectedBlockId) {
        e.preventDefault(); moveBlockUp(selectedBlockId);
      }
      if (e.key === 'ArrowDown' && e.altKey && selectedBlockId) {
        e.preventDefault(); moveBlockDown(selectedBlockId);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Toolbar />
        <Canvas />
        {selectedBlockId && <PropertiesPanel />}
      </div>
    </div>
  );
}
