import { ImageIcon } from 'lucide-react';

export default function ImageBlock({ block }) {
  const { src, alt, caption, objectFit, borderRadius, maxHeight } = block.props;

  if (!src) {
    return (
      <div className="flex flex-col items-center justify-center bg-surface rounded-lg border-2 border-dashed border-border py-16 gap-3">
        <ImageIcon className="w-12 h-12 text-text-muted" />
        <p className="text-text-muted text-sm">Click to add an image URL</p>
      </div>
    );
  }

  return (
    <figure className="w-full m-0">
      <img
        src={src}
        alt={alt}
        className="w-full"
        style={{ objectFit, borderRadius, maxHeight: maxHeight ? `${maxHeight}px` : undefined }}
      />
      {caption && (
        <figcaption className="text-text-muted text-sm text-center mt-2">{caption}</figcaption>
      )}
    </figure>
  );
}
