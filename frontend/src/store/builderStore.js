import { create } from 'zustand';
import { temporal } from 'zundo';
import { immer } from 'zustand/middleware/immer';
import { generateId } from '../utils/id';
import { registry } from '../blocks/registry';

const useBuilderStore = create(
  temporal(
    immer((set, get) => ({
      blocks: [],
      selectedBlockId: null,
      hoveredBlockId: null,
      viewport: 'desktop',
      isDirty: false,
      pageName: 'Untitled Page',

      setPageName(name) {
        set(state => { state.pageName = name; });
      },

      addBlock(type, index) {
        const def = registry.getDefinition(type);
        if (!def) return;
        const block = {
          id: generateId(),
          type,
          props: { ...def.defaultProps },
          style: {
            width: '100%',
            minHeight: def.minHeight ? `${def.minHeight}px` : undefined,
            padding: '16px',
            margin: '0',
            backgroundColor: '',
            backgroundImage: '',
          },
          children: type === 'grid' ? [[], [], []] : undefined,
          order: 0,
        };
        set(state => {
          const idx = index !== undefined ? index : state.blocks.length;
          state.blocks.splice(idx, 0, block);
          state.blocks.forEach((b, i) => { b.order = i; });
          state.selectedBlockId = block.id;
          state.isDirty = true;
        });
        return block.id;
      },

      removeBlock(id) {
        set(state => {
          state.blocks = state.blocks.filter(b => b.id !== id);
          state.blocks.forEach((b, i) => { b.order = i; });
          if (state.selectedBlockId === id) state.selectedBlockId = null;
          state.isDirty = true;
        });
      },

      moveBlock(activeId, overId) {
        set(state => {
          const oldIndex = state.blocks.findIndex(b => b.id === activeId);
          const newIndex = state.blocks.findIndex(b => b.id === overId);
          if (oldIndex === -1 || newIndex === -1) return;
          const [moved] = state.blocks.splice(oldIndex, 1);
          state.blocks.splice(newIndex, 0, moved);
          state.blocks.forEach((b, i) => { b.order = i; });
          state.isDirty = true;
        });
      },

      updateBlockProps(id, props) {
        set(state => {
          const block = state.blocks.find(b => b.id === id);
          if (block) {
            Object.assign(block.props, props);
            state.isDirty = true;
          }
        });
      },

      updateBlockStyle(id, style) {
        set(state => {
          const block = state.blocks.find(b => b.id === id);
          if (block) {
            Object.assign(block.style, style);
            state.isDirty = true;
          }
        });
      },

      duplicateBlock(id) {
        set(state => {
          const idx = state.blocks.findIndex(b => b.id === id);
          if (idx === -1) return;
          const original = state.blocks[idx];
          const clone = JSON.parse(JSON.stringify(original));
          clone.id = generateId();
          if (clone.children) {
            clone.children = clone.children.map(col =>
              col.map(child => ({ ...child, id: generateId() }))
            );
          }
          state.blocks.splice(idx + 1, 0, clone);
          state.blocks.forEach((b, i) => { b.order = i; });
          state.selectedBlockId = clone.id;
          state.isDirty = true;
        });
      },

      selectBlock(id) {
        set(state => { state.selectedBlockId = id; });
      },

      setHoveredBlock(id) {
        set(state => { state.hoveredBlockId = id; });
      },

      setViewport(vp) {
        set(state => { state.viewport = vp; });
      },

      moveBlockUp(id) {
        set(state => {
          const idx = state.blocks.findIndex(b => b.id === id);
          if (idx <= 0) return;
          [state.blocks[idx - 1], state.blocks[idx]] = [state.blocks[idx], state.blocks[idx - 1]];
          state.blocks.forEach((b, i) => { b.order = i; });
          state.isDirty = true;
        });
      },

      moveBlockDown(id) {
        set(state => {
          const idx = state.blocks.findIndex(b => b.id === id);
          if (idx === -1 || idx >= state.blocks.length - 1) return;
          [state.blocks[idx], state.blocks[idx + 1]] = [state.blocks[idx + 1], state.blocks[idx]];
          state.blocks.forEach((b, i) => { b.order = i; });
          state.isDirty = true;
        });
      },

      loadBlocks(blocks) {
        set(state => {
          state.blocks = blocks;
          state.isDirty = false;
          state.selectedBlockId = null;
        });
      },

      setDirty(dirty) {
        set(state => { state.isDirty = dirty; });
      },

      // Grid block: add child to a column
      addChildBlock(parentId, columnIndex, type, index) {
        const def = registry.getDefinition(type);
        if (!def) return;
        set(state => {
          const parent = state.blocks.find(b => b.id === parentId);
          if (!parent || !parent.children) return;
          const child = {
            id: generateId(),
            type,
            props: { ...def.defaultProps },
            style: { width: '100%', padding: '8px' },
          };
          const col = parent.children[columnIndex] || [];
          const idx = index !== undefined ? index : col.length;
          col.splice(idx, 0, child);
          parent.children[columnIndex] = col;
          state.selectedBlockId = child.id;
          state.isDirty = true;
        });
      },

      removeChildBlock(parentId, columnIndex, childId) {
        set(state => {
          const parent = state.blocks.find(b => b.id === parentId);
          if (!parent || !parent.children) return;
          parent.children[columnIndex] = parent.children[columnIndex].filter(c => c.id !== childId);
          if (state.selectedBlockId === childId) state.selectedBlockId = null;
          state.isDirty = true;
        });
      },

      updateChildBlockProps(parentId, columnIndex, childId, props) {
        set(state => {
          const parent = state.blocks.find(b => b.id === parentId);
          if (!parent || !parent.children) return;
          const child = parent.children[columnIndex]?.find(c => c.id === childId);
          if (child) {
            Object.assign(child.props, props);
            state.isDirty = true;
          }
        });
      },
    })),
    { limit: 50 }
  )
);

export default useBuilderStore;
