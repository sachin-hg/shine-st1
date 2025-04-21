export default function handler(req, res) {
  const base64Image = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
  const imageBuffer = Buffer.from(base64Image, 'base64');

  res.setHeader('Content-Type', 'image/png');
  res.send(imageBuffer);
}