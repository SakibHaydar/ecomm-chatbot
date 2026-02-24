import { google } from "@ai-sdk/google";
import { streamText, tool } from "ai";
import { z } from "zod";
import { getProductInventory } from "@/lib/data";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    const result = streamText({
        model: google("gemini-1.5-flash"),
        messages,
        system: `You are a helpful e-commerce assistant. 
    You can answer questions about products, their prices, size availability, and stock levels.
    Use the provided tools to fetch real-time data about products.
    If a user asks about a product you don't know about, tell them you couldn't find it in our catalog.
    Be polite, professional, and helpful.`,
        tools: {
            checkInventory: tool({
                description: "Check the price, available sizes, and stock count for a specific product",
                inputSchema: z.object({
                    productName: z.string().describe("The name of the product to check"),
                }),
                execute: async ({ productName }) => {
                    const product = await getProductInventory(productName);
                    return product;
                },
            }),
        },
    });

    return result.toUIMessageStreamResponse();
}
