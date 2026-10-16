export const FALLBACK_IMAGE = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-label="Food placeholder">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1f2937"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fb923c" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#fbbf24" stop-opacity="0.1"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#bg)"/>
  <circle cx="260" cy="180" r="180" fill="url(#glow)"/>
  <circle cx="960" cy="620" r="220" fill="url(#glow)"/>
  <g fill="none" stroke="#f97316" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" opacity="0.9">
    <path d="M330 515c35-93 102-140 202-140 132 0 205 79 239 171"/>
    <path d="M420 375c21 22 31 48 31 78 0 75-60 135-135 135s-135-60-135-135c0-30 10-56 31-78"/>
    <path d="M847 375c21 22 31 48 31 78 0 75-60 135-135 135s-135-60-135-135c0-30 10-56 31-78"/>
    <path d="M630 300c0 0 26-55 76-86"/>
    <path d="M690 290c0 0 38-20 90-20"/>
  </g>
  <text x="50%" y="82%" text-anchor="middle" font-family="Arial, sans-serif" font-size="42" font-weight="700" fill="#f8fafc" opacity="0.9">Fresh food imagery loading</text>
</svg>
`)}`;

export const applyImageFallback = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
  event.currentTarget.src = FALLBACK_IMAGE;
};
