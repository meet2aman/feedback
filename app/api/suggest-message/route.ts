// import { openai } from "@ai-sdk/openai";

import {
  convertToCoreMessages,
  generateText,
  OpenAIStream,
  StreamingTextResponse,
} from "ai";

import { NextResponse } from "next/server";
import { streamText, StreamData } from "ai";
import OpenAI from "openai/index.mjs";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: What's a hobby youve recently started?||If you could have dinner with any historical figure, who would it be?!| What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";
    // if want message from user
    //   const { messages } = await req.json();

    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      max_tokens: 400,
      prompt,
    });

    // const { text } = await generateText({
    //   model: openai("gpt-4-turbo"),
    //   prompt: "Write a vegetarian lasagna recipe for 4 people.",
    // });

    // const result = await streamText({
    //   model: openai("gpt-3.5-turbo"),
    //   messages: convertToCoreMessages(prompt),
    // });

    // return result.toDataStreamResponse();

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      const { name, status, message, headers } = error;
      return NextResponse.json(
        {
          name,
          status,
          message,
          headers,
        },
        { status }
      );
    } else {
      console.log(`An unexpected error occurred`);
      throw error;
    }
  }
}
