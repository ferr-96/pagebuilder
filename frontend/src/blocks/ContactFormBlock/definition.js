export const contactFormBlockDefinition = {
  type: 'contactform',
  label: 'Contact Form',
  icon: 'Mail',
  category: 'content',
  fields: [
    { key: 'heading', label: 'Heading', type: 'text', defaultValue: 'Get in Touch' },
    { key: 'description', label: 'Description', type: 'text', defaultValue: 'We\'d love to hear from you. Send us a message!' },
    { key: 'fields', label: 'Form Fields', type: 'items', defaultValue: [
      { label: 'Name', fieldType: 'text', required: true },
      { label: 'Email', fieldType: 'email', required: true },
      { label: 'Message', fieldType: 'textarea', required: true },
    ], itemFields: [
      { key: 'label', label: 'Label', type: 'text', defaultValue: 'Field' },
      { key: 'fieldType', label: 'Type', type: 'select', defaultValue: 'text', options: [
        { label: 'Text', value: 'text' },
        { label: 'Email', value: 'email' },
        { label: 'Textarea', value: 'textarea' },
        { label: 'Phone', value: 'tel' },
      ]},
      { key: 'required', label: 'Required', type: 'boolean', defaultValue: false },
    ]},
    { key: 'submitText', label: 'Submit Button Text', type: 'text', defaultValue: 'Send Message' },
    { key: 'accentColor', label: 'Button Color', type: 'color', defaultValue: '#6366f1' },
  ],
  defaultProps: {
    heading: 'Get in Touch',
    description: 'We\'d love to hear from you. Send us a message!',
    fields: [
      { label: 'Name', fieldType: 'text', required: true },
      { label: 'Email', fieldType: 'email', required: true },
      { label: 'Message', fieldType: 'textarea', required: true },
    ],
    submitText: 'Send Message',
    accentColor: '#6366f1',
  },
  resizable: { width: true, height: false },
};
