import { BedrockRuntimeClient, InvokeModelWithResponseStreamCommand } from "@aws-sdk/client-bedrock-runtime";
import { NextRequest } from "next/server";
import { buildPrompt, type PromptMode } from "@/lib/prompts";

const client = new BedrockRuntimeClient({ region: process.env.AWS_REGION ?? "us-east-1" });
const MODEL_ID = "anthropic.claude-3-haiku-20240307-v1:0";

export async function POST(req: NextRequest) {
  const { service, mode, compareWith } = (await req.json()) as {
    service: string;
    mode: PromptMode;
    compareWith?: string;
  };

  const prompt = buildPrompt(service, mode, compareWith);

  const command = new InvokeModelWithResponseStreamCommand({
    modelId: MODEL_ID,
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify({
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: 512,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const response = await client.send(command);

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of response.body ?? []) {
          if (chunk.chunk?.bytes) {
            const parsed = JSON.parse(new TextDecoder().decode(chunk.chunk.bytes)) as {
              type: string;
              delta?: { type: string; text?: string };
            };
            if (parsed.type === "content_block_delta" && parsed.delta?.text) {
              controller.enqueue(new TextEncoder().encode(parsed.delta.text));
            }
          }
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
