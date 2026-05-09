export default async function handler(req, res) {
  try {
    const { prompt } = req.body;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "claude-3-5-haiku-latest",
        max_tokens: 1024,
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
    res.status(500).json({
      error: err.message
    });
  }
}
export async function POST(req: Request) {
  try {
    console.log("route hit");

    const body = await req.json();
    console.log("body:", body);

    console.log("api key exists:", !!process.env.OPENAI_API_KEY);

    // your ai call here

  } catch (err) {
    console.error("CHAT ERROR:", err);

    return Response.json(
      { error: String(err) },
      { status: 500 }
    );
  }
}
