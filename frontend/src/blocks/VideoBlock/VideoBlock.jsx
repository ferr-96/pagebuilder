import { Play } from 'lucide-react';

function getEmbedUrl(url) {
  if (!url) return null;
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return url;
}

export default function VideoBlock({ block }) {
  const { url, aspectRatio, borderRadius } = block.props;
  const embedUrl = getEmbedUrl(url);

  if (!embedUrl) {
    return (
      <div className="flex flex-col items-center justify-center bg-surface rounded-lg border-2 border-dashed border-border py-16 gap-3">
        <Play className="w-12 h-12 text-text-muted" />
        <p className="text-text-muted text-sm">Add a YouTube or Vimeo URL</p>
      </div>
    );
  }

  return (
    <div className="w-full" style={{ aspectRatio, borderRadius, overflow: 'hidden' }}>
      <iframe
        src={embedUrl}
        className="w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Video"
      />
    </div>
  );
}
