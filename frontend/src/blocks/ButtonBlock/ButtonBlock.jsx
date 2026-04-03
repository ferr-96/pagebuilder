export default function ButtonBlock({ block }) {
  const { text, url, variant, size, color, textColor, alignment, fullWidth } = block.props;

  const sizeClasses = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3 text-base', lg: 'px-8 py-4 text-lg' };
  const alignClass = alignment === 'left' ? 'justify-start' : alignment === 'right' ? 'justify-end' : 'justify-center';

  const baseStyle = {
    borderRadius: '8px',
    fontWeight: 600,
    transition: 'transform 0.15s, opacity 0.15s',
  };

  let style;
  if (variant === 'solid') {
    style = { ...baseStyle, backgroundColor: color, color: textColor };
  } else if (variant === 'outline') {
    style = { ...baseStyle, border: `2px solid ${color}`, color, backgroundColor: 'transparent' };
  } else {
    style = { ...baseStyle, color, backgroundColor: 'transparent' };
  }

  return (
    <div className={`flex ${alignClass} w-full`}>
      <a
        href={url}
        className={`inline-block ${sizeClasses[size] || sizeClasses.md} hover:opacity-90 hover:scale-105 ${fullWidth ? 'w-full text-center' : ''}`}
        style={style}
      >
        {text}
      </a>
    </div>
  );
}
