export default function HeroBlock({ block }) {
  const { heading, subheading, bgImage, overlayColor, overlayOpacity, ctaText, ctaUrl, ctaColor, alignment, textColor } = block.props;
  const alignClass = alignment === 'left' ? 'items-start text-left' : alignment === 'right' ? 'items-end text-right' : 'items-center text-center';

  return (
    <div className="relative w-full flex min-h-[400px] overflow-hidden" style={{ minHeight: block.style?.minHeight }}>
      {bgImage && (
        <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
      )}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: overlayColor, opacity: (overlayOpacity || 70) / 100 }}
      />
      <div className={`relative z-10 flex flex-col ${alignClass} justify-center w-full px-8 py-20 gap-6`}>
        <h1 className="text-5xl font-bold leading-tight" style={{ color: textColor }}>
          {heading}
        </h1>
        <p className="text-xl max-w-2xl opacity-90" style={{ color: textColor }}>
          {subheading}
        </p>
        {ctaText && (
          <a
            href={ctaUrl}
            className="inline-block px-8 py-3 rounded-lg text-white font-semibold text-lg transition-transform hover:scale-105"
            style={{ backgroundColor: ctaColor }}
          >
            {ctaText}
          </a>
        )}
      </div>
    </div>
  );
}
