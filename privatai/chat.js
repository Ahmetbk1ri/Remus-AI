import fetch from 'node-fetch';

export default async function handler(request, response) {
    // Only allow POST requests
    if (request.method !== 'POST') {
        return response.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request.body),
        });

        const data = await res.json();
        response.status(200).json(data);

    } catch (error) {
        console.error('OpenAI proxy error:', error);
        response.status(500).json({ error: { message: 'Error forwarding request to OpenAI' } });
    }
}