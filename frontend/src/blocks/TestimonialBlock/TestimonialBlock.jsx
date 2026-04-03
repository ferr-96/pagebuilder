export default function TestimonialBlock({ block }) {
  const { heading, items, cardBg, textColor } = block.props;
  return (
    <div className="w-full py-8">
      {heading && <h2 className="text-3xl font-bold text-center mb-8" style={{ color: textColor }}>{heading}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items?.map((item, i) => (
          <div key={i} className="rounded-xl p-6" style={{ backgroundColor: cardBg }}>
            <p className="text-lg mb-4 italic opacity-90" style={{ color: textColor }}>"{item.quote}"</p>
            <div className="flex items-center gap-3">
              {item.avatar ? (
                <img src={item.avatar} alt={item.author} className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center text-sm font-bold" style={{ color: textColor }}>
                  {item.author?.[0] || '?'}
                </div>
              )}
              <div>
                <p className="font-semibold text-sm" style={{ color: textColor }}>{item.author}</p>
                <p className="text-xs opacity-60" style={{ color: textColor }}>{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
