export const videoBlockDefinition = {
  type: 'video',
  label: 'Video',
  icon: 'Play',
  category: 'media',
  fields: [
    { key: 'url', label: 'Video URL (YouTube/Vimeo)', type: 'url', defaultValue: '' },
    { key: 'aspectRatio', label: 'Aspect Ratio', type: 'select', defaultValue: '16/9', options: [
      { label: '16:9', value: '16/9' },
      { label: '4:3', value: '4/3' },
      { label: '1:1', value: '1/1' },
    ]},
    { key: 'borderRadius', label: 'Rounded', type: 'select', defaultValue: '8px', options: [
      { label: 'None', value: '0' },
      { label: 'Small', value: '4px' },
      { label: 'Medium', value: '8px' },
      { label: 'Large', value: '16px' },
    ]},
  ],
  defaultProps: {
    url: '',
    aspectRatio: '16/9',
    borderRadius: '8px',
  },
  resizable: { width: true, height: false },
};
