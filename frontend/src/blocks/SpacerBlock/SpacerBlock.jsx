export default function SpacerBlock({ block }) {
  const { height, showDivider, dividerColor } = block.props;
  return (
    <div className="w-full flex items-center justify-center" style={{ height: `${height}px` }}>
      {showDivider && (
        <hr className="w-full border-0 border-t" style={{ borderColor: dividerColor }} />
      )}
    </div>
  );
}
