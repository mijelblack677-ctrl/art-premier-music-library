export default function handler(req, res) {
  const { params } = req.query;
  const [width, height, bgColor, textColor, ...textParts] = params;
  const text = textParts.join(' ').replace(/\+/g, ' ');
  
  // Return a simple SVG placeholder
  const svg = `
    <svg width="${width || 300}" height="${height || 300}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#${bgColor || '333333'}"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
            fill="#${textColor || 'FFFFFF'}" font-family="Arial" font-size="16">
        ${text || 'Music'}
      </text>
    </svg>
  `;
  
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(svg);
}
