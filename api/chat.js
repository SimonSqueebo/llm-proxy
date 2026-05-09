import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const messages = body.messages || [];

    console.log("Incoming messages:", messages);

    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error("Missing ANTHROPIC_API_KEY");
    }

    const response = await anthropic.messages.create({
      model: "claude-3-5-haiku-latest",
      max_tokens: 1024,
      messages,
    });

    return Response.json({
      success: true,
      content: response.content,
    });
  } catch (error: any) {
    console.error("API ERROR:", error);

    return Response.json(
      {
        success: false,
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
