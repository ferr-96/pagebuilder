export default function FooterBlock({ block }) {
  const { companyName, copyright, columns, socialLinks, bgColor, textColor } = block.props;
  return (
    <footer className="w-full px-8 py-12" style={{ backgroundColor: bgColor, color: textColor }}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="font-bold text-lg text-text mb-4">{companyName}</h3>
          <div className="flex gap-3">
            {socialLinks?.map((s, i) => (
              <a key={i} href={s.url} className="opacity-60 hover:opacity-100 transition-opacity text-sm" style={{ color: textColor }}>
                {s.platform}
              </a>
            ))}
          </div>
        </div>
        {columns?.map((col, i) => (
          <div key={i}>
            <h4 className="font-semibold text-sm text-text mb-3">{col.title}</h4>
            <ul className="space-y-2">
              {col.links?.split('\n').filter(Boolean).map((link, j) => (
                <li key={j}>
                  <a href="#" className="text-sm opacity-60 hover:opacity-100 transition-opacity" style={{ color: textColor }}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t pt-6 text-sm text-center opacity-50" style={{ borderColor: textColor + '20' }}>
        {copyright}
      </div>
    </footer>
  );
}
