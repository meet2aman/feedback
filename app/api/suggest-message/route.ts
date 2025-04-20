import { streamText } from "ai";
import { OpenAI as AISDKOpenAI, createOpenAI } from "@ai-sdk/openai";
import { StreamingTextResponse } from "ai";

export const runtime = "edge";

const openai = createOpenAI({
  apiKey: process.env.ROUTER_API,
  baseURL: "https://openrouter.ai/api/v1",
  headers: {
    "HTTP-Referer": "https://localhost.com",
    "X-Title": "Feedback",
  },
});

export async function POST(req: Request) {
  const { prompt: userPrompt } = await req.json();

  const prompt =
    "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: What's a hobby youve recently started?||If you could have dinner with any historical figure, who would it be?!| What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

  const chosenOne = `${userPrompt === "__suggest__" ? prompt : userPrompt}`;

  const result = await streamText({
    model: openai.chat("openai/gpt-4.1-nano"),
    prompt: chosenOne,
  });

  return new StreamingTextResponse(result.toAIStream());
}
