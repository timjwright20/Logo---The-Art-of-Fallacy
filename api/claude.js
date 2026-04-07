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

  // Detailed key diagnostics â€” helps pinpoint Vercel env var issues
  if (!apiKey) {
    const allKeys = Object.keys(process.env).filter(k => k.includes('ANTHROPIC'));
    return res.status(500).json({
      error: 'API key not found.',
      hint: 'Add ANTHROPIC_API_KEY in Vercel â†’ Project Settings â†’ Environment Variables, then redeploy.',
      foundRelatedVars: allKeys.length ? allKeys : 'none',
    });
  }

  // Parse body â€” Vercel bodyParser should handle this, but guard against edge cases
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch(e) {
      return res.status(400).json({ error: 'Invalid JSON body' });
    }
  }
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Empty or invalid request body' });
  }

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
    console.error('Proxy error:', error);
    return res.status(500).json({
      error: 'Failed to reach the Anthropic API.',
      details: error.message,
    });
  }
}
