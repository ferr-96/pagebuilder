const sizeMap = { sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem' };

export default function TextBlock({ block }) {
  const { content, fontSize, alignment, fontWeight, textColor } = block.props;
  return (
    <div
      className="w-full whitespace-pre-wrap"
      style={{
        fontSize: sizeMap[fontSize] || '1rem',
        textAlign: alignment,
        fontWeight,
        color: textColor,
      }}
    >
      {content}
    </div>
  );
}
