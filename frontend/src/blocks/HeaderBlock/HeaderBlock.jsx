export default function HeaderBlock({ block }) {
  const { siteName, logoUrl, navLinks, bgColor, textColor } = block.props;
  return (
    <header
      className="flex items-center justify-between px-8 py-4 w-full"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="flex items-center gap-3">
        {logoUrl && <img src={logoUrl} alt={siteName} className="h-8 w-8 object-contain" />}
        <span className="text-xl font-bold">{siteName}</span>
      </div>
      <nav className="flex items-center gap-6">
        {navLinks?.map((link, i) => (
          <a
            key={i}
            href={link.url}
            className="text-sm opacity-80 hover:opacity-100 transition-opacity"
            style={{ color: textColor }}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
