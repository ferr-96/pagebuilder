export const spacerBlockDefinition = {
  type: 'spacer',
  label: 'Spacer',
  icon: 'SeparatorHorizontal',
  category: 'layout',
  fields: [
    { key: 'height', label: 'Height (px)', type: 'number', defaultValue: 48 },
    { key: 'showDivider', label: 'Show Divider Line', type: 'boolean', defaultValue: false },
    { key: 'dividerColor', label: 'Divider Color', type: 'color', defaultValue: '#363b52' },
  ],
  defaultProps: {
    height: 48,
    showDivider: false,
    dividerColor: '#363b52',
  },
  resizable: { width: false, height: true },
};
