/**
 * LOGOS â€” The Art of Fallacy
 * Vercel Serverless Function: /api/claude
 *
 * This function acts as a secure proxy between the browser and the Anthropic API.
 * Your ANTHROPIC_API_KEY is stored as a Vercel Environment Variable and never
 * exposed to the client.
 *
 * Endpoint: POST /api/claude
 * Body: standard Anthropic /v1/messages request body (JSON)
 * Returns: Anthropic API response (JSON)
 */

export default async function handler(req, res) {

  // â”€â”€ CORS Headers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // Allow requests from your own domain (and localhost for dev)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // â”€â”€ Method Guard â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  // â”€â”€ API Key Guard â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY environment variable is not set.');
    return res.status(500).json({
      error: 'Server configuration error: API key not found.',
      hint: 'Add ANTHROPIC_API_KEY to your Vercel Environment Variables.'
    });
  }

  // â”€â”€ Forward Request to Anthropic â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  try {
    const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(req.body),
    });

    const data = await anthropicResponse.json();

    // Forward Anthropic's status code and response body back to client
    return res.status(anthropicResponse.status).json(data);

  } catch (error) {
    console.error('Error proxying to Anthropic API:', error);
    return res.status(500).json({
      error: 'Failed to reach the Anthropic API.',
      details: error.message,
    });
  }
}
