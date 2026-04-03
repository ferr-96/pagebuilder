export const imageBlockDefinition = {
  type: 'image',
  label: 'Image',
  icon: 'Image',
  category: 'media',
  fields: [
    { key: 'src', label: 'Image URL', type: 'image', defaultValue: '' },
    { key: 'alt', label: 'Alt Text', type: 'text', defaultValue: 'Image' },
    { key: 'caption', label: 'Caption', type: 'text', defaultValue: '' },
    { key: 'objectFit', label: 'Fit', type: 'select', defaultValue: 'cover', options: [
      { label: 'Cover', value: 'cover' },
      { label: 'Contain', value: 'contain' },
      { label: 'Fill', value: 'fill' },
    ]},
    { key: 'borderRadius', label: 'Rounded', type: 'select', defaultValue: '8px', options: [
      { label: 'None', value: '0' },
      { label: 'Small', value: '4px' },
      { label: 'Medium', value: '8px' },
      { label: 'Large', value: '16px' },
      { label: 'Full', value: '9999px' },
    ]},
    { key: 'maxHeight', label: 'Max Height (px)', type: 'number', defaultValue: 400 },
  ],
  defaultProps: {
    src: '',
    alt: 'Image',
    caption: '',
    objectFit: 'cover',
    borderRadius: '8px',
    maxHeight: 400,
  },
  resizable: { width: true, height: true },
  minHeight: 100,
};
