import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { whatsapp, email, answers } = req.body;

  if (!whatsapp) {
    return res.status(400).json({ error: 'WhatsApp number is required' });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);

    // Store in database
    await sql`
      INSERT INTO leads (whatsapp, email, answers)
      VALUES (${whatsapp}, ${email || null}, ${JSON.stringify(answers || {})})
    `;

    // Send Discord notification
    const discordPayload = {
      embeds: [{
        title: '🚀 Nouveau lead !',
        color: 0x0d9488,
        fields: [
          { name: '📱 WhatsApp', value: whatsapp, inline: true },
          { name: '📧 Email', value: email || 'Non renseigné', inline: true },
          { name: '📋 Réponses quiz', value: formatAnswers(answers), inline: false },
        ],
        timestamp: new Date().toISOString(),
      }],
    };

    await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordPayload),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

function formatAnswers(answers) {
  if (!answers || Object.keys(answers).length === 0) return 'Aucune';
  const labels = {
    duration: '⏱️ Durée',
    budget: '💰 Budget',
    style: '🎯 Style',
    interests: '❤️ Intérêts',
    accommodation: '🏨 Hébergement',
  };
  return Object.entries(answers)
    .map(([key, val]) => {
      const label = labels[key] || key;
      const value = Array.isArray(val) ? val.join(', ') : val;
      return `${label}: ${value}`;
    })
    .join('\n');
}
