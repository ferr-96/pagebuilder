export const footerBlockDefinition = {
  type: 'footer',
  label: 'Footer',
  icon: 'PanelBottom',
  category: 'navigation',
  fields: [
    { key: 'companyName', label: 'Company Name', type: 'text', defaultValue: 'My Company' },
    { key: 'copyright', label: 'Copyright Text', type: 'text', defaultValue: '© 2026 My Company. All rights reserved.' },
    { key: 'columns', label: 'Link Columns', type: 'items', defaultValue: [
      { title: 'Product', links: 'Features\nPricing\nDocs' },
      { title: 'Company', links: 'About\nCareers\nBlog' },
      { title: 'Support', links: 'Help Center\nContact\nStatus' },
    ], itemFields: [
      { key: 'title', label: 'Column Title', type: 'text', defaultValue: 'Links' },
      { key: 'links', label: 'Links (one per line)', type: 'textarea', defaultValue: 'Link 1\nLink 2' },
    ]},
    { key: 'socialLinks', label: 'Social Links', type: 'items', defaultValue: [
      { platform: 'Twitter', url: '#' },
      { platform: 'GitHub', url: '#' },
    ], itemFields: [
      { key: 'platform', label: 'Platform', type: 'text', defaultValue: 'Twitter' },
      { key: 'url', label: 'URL', type: 'url', defaultValue: '#' },
    ]},
    { key: 'bgColor', label: 'Background', type: 'color', defaultValue: '#0f1117' },
    { key: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#94a3b8' },
  ],
  defaultProps: {
    companyName: 'My Company',
    copyright: '© 2026 My Company. All rights reserved.',
    columns: [
      { title: 'Product', links: 'Features\nPricing\nDocs' },
      { title: 'Company', links: 'About\nCareers\nBlog' },
      { title: 'Support', links: 'Help Center\nContact\nStatus' },
    ],
    socialLinks: [
      { platform: 'Twitter', url: '#' },
      { platform: 'GitHub', url: '#' },
    ],
    bgColor: '#0f1117',
    textColor: '#94a3b8',
  },
  resizable: { width: false, height: false },
};
