export const headerBlockDefinition = {
  type: 'header',
  label: 'Header / Nav',
  icon: 'PanelTop',
  category: 'navigation',
  fields: [
    { key: 'siteName', label: 'Site Name', type: 'text', defaultValue: 'My Website' },
    { key: 'logoUrl', label: 'Logo URL', type: 'image', defaultValue: '' },
    { key: 'navLinks', label: 'Nav Links', type: 'items', defaultValue: [
      { label: 'Home', url: '#' },
      { label: 'About', url: '#about' },
      { label: 'Contact', url: '#contact' },
    ], itemFields: [
      { key: 'label', label: 'Label', type: 'text', defaultValue: 'Link' },
      { key: 'url', label: 'URL', type: 'url', defaultValue: '#' },
    ]},
    { key: 'sticky', label: 'Sticky Header', type: 'boolean', defaultValue: false },
    { key: 'bgColor', label: 'Background', type: 'color', defaultValue: '#0f1117' },
    { key: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#e2e8f0' },
  ],
  defaultProps: {
    siteName: 'My Website',
    logoUrl: '',
    navLinks: [
      { label: 'Home', url: '#' },
      { label: 'About', url: '#about' },
      { label: 'Contact', url: '#contact' },
    ],
    sticky: false,
    bgColor: '#0f1117',
    textColor: '#e2e8f0',
  },
  resizable: { width: false, height: false },
};
