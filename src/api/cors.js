import Cors from 'cors';
import rp from 'request-promise';

const allowedOrigins = [
  'http://127.0.0.1:5173',
  'http://127.0.0.1:*',
  'http://localhost:*',
  'https://alr.netlify.app',
];

const cors = Cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error());
    }
  },
});

const runCorsMiddleware = (req, res) => {
  return new Promise((resolve, reject) => {
    cors(req, res, result => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export default async function corsHandler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow CORS from any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // allow certain methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  // console.log("🚀 ~ file: boop.js:49 ~ corsHandler ~ req", req)
  const { url } = req.query;

  try {
    if (process.env.NODE_ENV === 'production') {
      await runCorsMiddleware(req, res);
    }
    try {
      if (!url) {
        res.status(400).json({ message: '⚠️ Missing required body params' });
      }

      const html = await rp(url);
      console.log('🚀 ~ file: boop.js:64 ~ corsHandler ~ html', html);

      res
        .status(200)
        .json({ message: '🕺 Retreiving page HTML ok', html: html })
        .send(html);
    } catch (error) {
      res.status(500).json({ message: '🚫 Retrieving HTML error' });
    }
  } catch (error) {
    res.status(403).json({ message: '🚫 Request blocked by CORS' });
  }
}
