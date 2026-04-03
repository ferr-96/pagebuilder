export const testimonialBlockDefinition = {
  type: 'testimonial',
  label: 'Testimonials',
  icon: 'Quote',
  category: 'content',
  fields: [
    { key: 'heading', label: 'Section Heading', type: 'text', defaultValue: 'What People Say' },
    { key: 'items', label: 'Testimonials', type: 'items', defaultValue: [
      { quote: 'This product changed my workflow completely.', author: 'Jane Doe', role: 'CEO, Company', avatar: '' },
      { quote: 'Incredible experience. Highly recommended!', author: 'John Smith', role: 'Designer', avatar: '' },
    ], itemFields: [
      { key: 'quote', label: 'Quote', type: 'textarea', defaultValue: 'Great product!' },
      { key: 'author', label: 'Author', type: 'text', defaultValue: 'Name' },
      { key: 'role', label: 'Role', type: 'text', defaultValue: 'Role' },
      { key: 'avatar', label: 'Avatar URL', type: 'image', defaultValue: '' },
    ]},
    { key: 'cardBg', label: 'Card Background', type: 'color', defaultValue: '#232738' },
    { key: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#e2e8f0' },
  ],
  defaultProps: {
    heading: 'What People Say',
    items: [
      { quote: 'This product changed my workflow completely.', author: 'Jane Doe', role: 'CEO, Company', avatar: '' },
      { quote: 'Incredible experience. Highly recommended!', author: 'John Smith', role: 'Designer', avatar: '' },
    ],
    cardBg: '#232738',
    textColor: '#e2e8f0',
  },
  resizable: { width: false, height: false },
};
