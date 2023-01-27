import Cors from 'cors';

const allowedOrigins = [
  'https://paulieapi.gatsbyjs.io',
  'https://www.mdx-embed.com',
  'https://paulie.dev',
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

export default async function handler(req, res) {
  const { url } = req.body;
  console.log("🚀 ~ file: boop.js:32 ~ handler ~ url", url)

  try {
    if (process.env.NODE_ENV === 'production') {
      await runCorsMiddleware(req, res);
    }
    try {
      if (!url) {
        res.status(400).json({ message: '⚠️ Missing required body params' });
      }

      res
        .status(200)
        .json({ message: '🕺 Retreiving page HTML ok', url: session.url });
    } catch (error) {
      res.status(500).json({ message: '🚫 Retrieving HTML error' });
    }
  } catch (error) {
    res.status(403).json({ message: '🚫 Request blocked by CORS' });
  }
}
