export const pricingBlockDefinition = {
  type: 'pricing',
  label: 'Pricing',
  icon: 'CreditCard',
  category: 'commerce',
  fields: [
    { key: 'heading', label: 'Section Heading', type: 'text', defaultValue: 'Pricing Plans' },
    { key: 'plans', label: 'Plans', type: 'items', defaultValue: [
      { name: 'Starter', price: '$9', period: '/mo', features: 'Feature 1\nFeature 2\nFeature 3', ctaText: 'Get Started', ctaUrl: '#', highlighted: false },
      { name: 'Pro', price: '$29', period: '/mo', features: 'Everything in Starter\nFeature 4\nFeature 5\nPriority Support', ctaText: 'Go Pro', ctaUrl: '#', highlighted: true },
      { name: 'Enterprise', price: '$99', period: '/mo', features: 'Everything in Pro\nCustom Features\nDedicated Support\nSLA', ctaText: 'Contact Us', ctaUrl: '#', highlighted: false },
    ], itemFields: [
      { key: 'name', label: 'Plan Name', type: 'text', defaultValue: 'Plan' },
      { key: 'price', label: 'Price', type: 'text', defaultValue: '$0' },
      { key: 'period', label: 'Period', type: 'text', defaultValue: '/mo' },
      { key: 'features', label: 'Features (one per line)', type: 'textarea', defaultValue: 'Feature 1\nFeature 2' },
      { key: 'ctaText', label: 'Button Text', type: 'text', defaultValue: 'Get Started' },
      { key: 'ctaUrl', label: 'Button URL', type: 'url', defaultValue: '#' },
      { key: 'highlighted', label: 'Highlighted', type: 'boolean', defaultValue: false },
    ]},
    { key: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#6366f1' },
  ],
  defaultProps: {
    heading: 'Pricing Plans',
    plans: [
      { name: 'Starter', price: '$9', period: '/mo', features: 'Feature 1\nFeature 2\nFeature 3', ctaText: 'Get Started', ctaUrl: '#', highlighted: false },
      { name: 'Pro', price: '$29', period: '/mo', features: 'Everything in Starter\nFeature 4\nFeature 5\nPriority Support', ctaText: 'Go Pro', ctaUrl: '#', highlighted: true },
      { name: 'Enterprise', price: '$99', period: '/mo', features: 'Everything in Pro\nCustom Features\nDedicated Support\nSLA', ctaText: 'Contact Us', ctaUrl: '#', highlighted: false },
    ],
    accentColor: '#6366f1',
  },
  resizable: { width: false, height: false },
};
