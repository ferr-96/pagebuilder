export default function ContactFormBlock({ block }) {
  const { heading, description, fields, submitText, accentColor } = block.props;
  return (
    <div className="w-full max-w-xl mx-auto py-8">
      {heading && <h2 className="text-3xl font-bold text-center mb-2 text-text">{heading}</h2>}
      {description && <p className="text-text-muted text-center mb-8">{description}</p>}
      <form className="space-y-4" onSubmit={e => e.preventDefault()}>
        {fields?.map((field, i) => (
          <div key={i}>
            <label className="block text-sm font-medium text-text mb-1">
              {field.label} {field.required && <span className="text-danger">*</span>}
            </label>
            {field.fieldType === 'textarea' ? (
              <textarea
                className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-text placeholder:text-text-muted focus:outline-none focus:border-accent resize-y"
                rows={4}
                placeholder={`Enter ${field.label.toLowerCase()}...`}
              />
            ) : (
              <input
                type={field.fieldType || 'text'}
                className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-text placeholder:text-text-muted focus:outline-none focus:border-accent"
                placeholder={`Enter ${field.label.toLowerCase()}...`}
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: accentColor }}
        >
          {submitText}
        </button>
      </form>
    </div>
  );
}
