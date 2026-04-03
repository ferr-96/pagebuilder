export const textBlockDefinition = {
  type: 'text',
  label: 'Text',
  icon: 'Type',
  category: 'content',
  fields: [
    { key: 'content', label: 'Content', type: 'textarea', defaultValue: 'Enter your text here...' },
    { key: 'fontSize', label: 'Font Size', type: 'select', defaultValue: 'base', options: [
      { label: 'Small', value: 'sm' },
      { label: 'Base', value: 'base' },
      { label: 'Large', value: 'lg' },
      { label: 'XL', value: 'xl' },
      { label: '2XL', value: '2xl' },
      { label: '3XL', value: '3xl' },
    ]},
    { key: 'alignment', label: 'Alignment', type: 'select', defaultValue: 'left', options: [
      { label: 'Left', value: 'left' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'right' },
    ]},
    { key: 'fontWeight', label: 'Font Weight', type: 'select', defaultValue: 'normal', options: [
      { label: 'Normal', value: 'normal' },
      { label: 'Medium', value: '500' },
      { label: 'Semibold', value: '600' },
      { label: 'Bold', value: 'bold' },
    ]},
    { key: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#e2e8f0' },
  ],
  defaultProps: {
    content: 'Enter your text here...',
    fontSize: 'base',
    alignment: 'left',
    fontWeight: 'normal',
    textColor: '#e2e8f0',
  },
  resizable: { width: true, height: false },
};
