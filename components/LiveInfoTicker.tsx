// Yatayda otomatik kayan bilgi şeridi — SCF'deki LiveActivityStrip'ten
// esinlenildi. Metinler artık DIŞARIDAN (t.ticker, dil dosyasından) geliyor,
// böylece dil değişince şerit de değişiyor.

interface Props {
  items: string[];
}

export function LiveInfoTicker({ items }: Props) {
  const loop = [...items, ...items];

  return (
    <section className="max-w-container mx-auto px-5 mt-4 w-full">
      <style>{`
        .mw-ticker{border:1px solid rgba(10,37,64,.10);border-radius:14px;background:#ffffff;
          padding:11px 0;overflow:hidden;position:relative}
        .mw-ticker-row{display:flex;align-items:center;white-space:nowrap}
        .mw-ticker-dot{width:7px;height:7px;border-radius:50%;background:#34d399;flex-shrink:0;
          box-shadow:0 0 0 0 rgba(52,211,153,.55);animation:mwpulse 1.8s infinite;margin:0 14px}
        @keyframes mwpulse{0%{box-shadow:0 0 0 0 rgba(52,211,153,.55)}70%{box-shadow:0 0 0 7px rgba(52,211,153,0)}100%{box-shadow:0 0 0 0 rgba(52,211,153,0)}}
        .mw-ticker-track{display:flex;align-items:center;white-space:nowrap;animation:mwscroll 26s linear infinite;width:max-content}
        .mw-ticker-track:hover{animation-play-state:paused}
        @keyframes mwscroll{to{transform:translateX(-50%)}}
        .mw-ticker-item{display:inline-flex;align-items:center;font-size:12.5px;color:#5a6a7a;
          padding:0 18px;border-right:1px solid rgba(10,37,64,.08);font-weight:500}
        @media(max-width:640px){ .mw-ticker-item{font-size:11.5px;padding:0 14px} }
      `}</style>
      <div className="mw-ticker">
        <div className="mw-ticker-row">
          <span className="mw-ticker-dot" />
          <div style={{ overflow: "hidden", width: "100%" }}>
            <div className="mw-ticker-track">
              {loop.map((text, i) => (
                <span className="mw-ticker-item" key={i}>{text}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
