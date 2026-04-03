export const gridBlockDefinition = {
  type: 'grid',
  label: 'Grid / Columns',
  icon: 'Columns3',
  category: 'layout',
  fields: [
    { key: 'columns', label: 'Columns', type: 'select', defaultValue: 3, options: [
      { label: '2 Columns', value: 2 },
      { label: '3 Columns', value: 3 },
      { label: '4 Columns', value: 4 },
    ]},
    { key: 'gap', label: 'Gap (px)', type: 'number', defaultValue: 16 },
    { key: 'equalHeight', label: 'Equal Height', type: 'boolean', defaultValue: true },
  ],
  defaultProps: {
    columns: 3,
    gap: 16,
    equalHeight: true,
  },
  resizable: { width: false, height: false },
};
