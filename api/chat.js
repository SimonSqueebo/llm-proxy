export default async function handler(req, res) {
  try {
    const { prompt } = req.body;

    const response = await fetch(process.env.LLM_BASE_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.LLM_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "force-claude-haiku-4.5",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
