"use client";

export function ApprovedLocationMap({ address }: { address: string }) {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const query = encodeURIComponent(address);
  const embedSrc = key
    ? `https://www.google.com/maps/embed/v1/place?key=${key}&q=${query}`
    : `https://www.google.com/maps?q=${query}&output=embed`;
  const openUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <div>
      <p className="text-sm text-foreground whitespace-pre-line mb-4">{address}</p>
      <div className="overflow-hidden rounded-xl border border-border bg-[#f7f7f5]">
        <iframe
          title="Approved business location"
          src={embedSrc}
          className="w-full h-[420px] border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <a
        href={openUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex mt-3 text-sm text-solar-green hover:text-solar-green-dark underline-offset-2 hover:underline"
      >
        Open in Google Maps →
      </a>
    </div>
  );
}
