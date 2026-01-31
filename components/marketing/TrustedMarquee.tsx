export function TrustedMarquee() {
  const logos = [
    { src: "https://cdn-icons-png.flaticon.com/512/732/732221.png", alt: "Google" },
    { src: "https://cdn-icons-png.flaticon.com/512/732/732228.png", alt: "Amazon" },
    { src: "https://cdn-icons-png.flaticon.com/512/732/732200.png", alt: "Facebook" },
    { src: "https://cdn-icons-png.flaticon.com/512/732/732210.png", alt: "Shopify" },
    { src: "https://cdn-icons-png.flaticon.com/512/732/732217.png", alt: "eBay" },
  ];

  // duplicate to create seamless loop
  const track = [...logos, ...logos, ...logos];

  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="container-page py-10">
        <p className="text-center text-sm font-semibold text-slate-600">
          Used for Google Ads, Amazon scraping, Facebook automation, Shopify monitoring, and eBay research.
        </p>

        <div className="relative mt-6 overflow-hidden">
          {/* edge fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent" />

          <div className="marquee flex w-max items-center gap-10 py-2">
            {track.map((l, idx) => (
              <img
                key={idx}
                src={l.src}
                alt={l.alt}
                height={32}
                className="h-8 w-auto opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
