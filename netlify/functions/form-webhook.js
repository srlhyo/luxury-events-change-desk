exports.handler = async (event, context) => {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        // 1. Parse payload
        const body = JSON.parse(event.body);

        // Debug logs
        console.log('Webhook Body Keys:', Object.keys(body));

        // Robust extraction: support body.data, body.payload.data, body.payload, or fallback to body
        const data = body.data || (body.payload && body.payload.data) || body.payload || body;

        if (data && typeof data === 'object') {
            console.log('Extracted Data Keys:', Object.keys(data));
        } else {
            console.warn('Data extraction failed or empty. Raw body:', JSON.stringify(body));
        }

        // Extract fields
        const { local, tipo, prioridade, whatsapp_ref, descricao } = data || {};

        // 2. Prepare Email Content
        const subject = `[Change Desk] ${prioridade || 'Normal'} – ${local || 'N/A'}`;
        const text = `SITE
https://theluxuryevents.netlify.app/

PEDIDO
Local: ${local || 'N/A'}
Tipo: ${tipo || 'N/A'}
Prioridade: ${prioridade || 'N/A'}
WhatsApp: ${whatsapp_ref || 'N/A'}

Descrição:
${descricao || 'N/A'}`;

        // 3. Send to Mailgun
        const mailgunDomain = process.env.MAILGUN_DOMAIN;
        const mailgunApiKey = process.env.MAILGUN_API_KEY;
        const mailgunFrom = process.env.MAILGUN_FROM;
        const mailgunTo = process.env.MAILGUN_TO;

        if (!mailgunDomain || !mailgunApiKey || !mailgunFrom || !mailgunTo) {
            console.error('Missing Mailgun Environment Variables');
            // Always return 200 to Netlify so they don't retry endlessly
            return { statusCode: 200, body: 'Configuration Error' };
        }

        const auth = Buffer.from(`api:${mailgunApiKey}`).toString('base64');
        const params = new URLSearchParams();
        params.append('from', mailgunFrom);
        params.append('to', mailgunTo);
        params.append('subject', subject);
        params.append('text', text);

        const response = await fetch(`https://api.mailgun.net/v3/${mailgunDomain}/messages`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });

        if (!response.ok) {
            const errText = await response.text();
            console.error(`Mailgun Error (${response.status}): ${errText}`);
            // Return 200 to Netlify
            return { statusCode: 200, body: 'Email Failed' };
        }

        return { statusCode: 200, body: 'Email Sent' };

    } catch (error) {
        console.error('Function Error:', error);
        // Return 200 to Netlify to prevent retries on logic errors
        return { statusCode: 200, body: 'Server Error' };
    }
};
