import { groq } from "@ai-sdk/groq";
import { streamText, tool, zodSchema, convertToModelMessages, stepCountIs } from "ai";
import { z } from "zod";
import { searchCatalog } from "@/lib/data";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    const result = streamText({
        model: groq("moonshotai/kimi-k2-instruct-0905"),
        messages: await convertToModelMessages(messages),
        stopWhen: stepCountIs(5),
        system: `You are a helpful and intelligent assistant. 
You can answer general knowledge questions, assist with coding, provide advice, and also help users shop from our e-commerce catalog.

CRITICAL INSTRUCTIONS FOR TOOL USE:
1. ONLY IF the user explicitly asks about products we sell (like checking price, size availability, stock level, categories, or searching for items), you MUST use the 'searchCatalog' tool to query the database.
2. If the user asks a general question (e.g., "What is the capital of France?", "Write a poem", "How do I fix this code?"), DO NOT use the tool. Simply answer the question using your general knowledge.
3. Translate user queries into relevant search parameters for the tool. For example, if they ask for "shoes under $100", use category="Shoes" and maxPrice=100.
4. Be polite, professional, and helpful.`,
        tools: {
            searchCatalog: tool({
                description: "Search the product catalog dynamically by query, category, brand, or maximum price.",
                inputSchema: zodSchema(z.object({
                    query: z.string().optional().describe("A text search query to find specific products by name (e.g., 't-shirt', 'track pants')."),
                    category: z.string().optional().describe("Filter products by category (e.g., 'Shoes', 'Clothing', 'Bottomwear')."),
                    brand: z.string().optional().describe("Filter for products by a specific brand (e.g., 'York')."),
                    maxPrice: z.number().optional().describe("Filter for products under a maximum price."),
                })),
                execute: async (params) => {
                    const products = await searchCatalog(params);
                    if (products.length === 0) {
                        return { message: "No products matched the given criteria." };
                    }
                    return products;
                },
            }),
        },
    });

    return result.toUIMessageStreamResponse();
}
