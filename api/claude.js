/**
 * LOGOS â€” The Art of Fallacy
 * Vercel Serverless Function: /api/claude
 */

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'Server configuration error: API key not found.',
      hint: 'Add ANTHROPIC_API_KEY to your Vercel Environment Variables.'
    });
  }

  // req.body is already parsed by Vercel when bodyParser: true
  // but guard against it being undefined just in case
  const body = req.body || {};

  try {
    const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    });

    const data = await anthropicResponse.json();
    return res.status(anthropicResponse.status).json(data);

  } catch (error) {
    console.error('Error proxying to Anthropic API:', error);
    return res.status(500).json({
      error: 'Failed to reach the Anthropic API.',
      details: error.message,
    });
  }
}
