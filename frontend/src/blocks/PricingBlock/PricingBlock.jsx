import { Check } from 'lucide-react';

export default function PricingBlock({ block }) {
  const { heading, plans, accentColor } = block.props;
  return (
    <div className="w-full py-8">
      {heading && <h2 className="text-3xl font-bold text-center mb-10 text-text">{heading}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans?.map((plan, i) => (
          <div
            key={i}
            className="rounded-xl p-6 flex flex-col"
            style={{
              backgroundColor: plan.highlighted ? accentColor + '15' : '#232738',
              border: plan.highlighted ? `2px solid ${accentColor}` : '2px solid transparent',
            }}
          >
            <h3 className="text-lg font-semibold text-text">{plan.name}</h3>
            <div className="mt-4 mb-6">
              <span className="text-4xl font-bold text-text">{plan.price}</span>
              <span className="text-text-muted">{plan.period}</span>
            </div>
            <ul className="flex-1 space-y-3 mb-6">
              {plan.features?.split('\n').filter(Boolean).map((f, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-text-muted">
                  <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: accentColor }} />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={plan.ctaUrl}
              className="block text-center py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: plan.highlighted ? accentColor : '#363b52' }}
            >
              {plan.ctaText}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
