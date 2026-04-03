export const buttonBlockDefinition = {
  type: 'button',
  label: 'Button',
  icon: 'MousePointerClick',
  category: 'content',
  fields: [
    { key: 'text', label: 'Button Text', type: 'text', defaultValue: 'Click Me' },
    { key: 'url', label: 'URL', type: 'url', defaultValue: '#' },
    { key: 'variant', label: 'Style', type: 'select', defaultValue: 'solid', options: [
      { label: 'Solid', value: 'solid' },
      { label: 'Outline', value: 'outline' },
      { label: 'Ghost', value: 'ghost' },
    ]},
    { key: 'size', label: 'Size', type: 'select', defaultValue: 'md', options: [
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
    ]},
    { key: 'color', label: 'Color', type: 'color', defaultValue: '#6366f1' },
    { key: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#ffffff' },
    { key: 'alignment', label: 'Alignment', type: 'select', defaultValue: 'center', options: [
      { label: 'Left', value: 'left' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'right' },
    ]},
    { key: 'fullWidth', label: 'Full Width', type: 'boolean', defaultValue: false },
  ],
  defaultProps: {
    text: 'Click Me',
    url: '#',
    variant: 'solid',
    size: 'md',
    color: '#6366f1',
    textColor: '#ffffff',
    alignment: 'center',
    fullWidth: false,
  },
  resizable: { width: true, height: false },
};
