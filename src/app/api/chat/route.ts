import { createGroq } from "@ai-sdk/groq";
import { convertToModelMessages, type LanguageModel, streamText } from "ai";
import { createClient } from "@/lib/supabase/server";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // 1. Fetch vehicle context from Supabase
  const supabase = await createClient();
  const { data: vehicles } = await supabase
    .from("vehicles")
    .select(
      "name, type, brand, model, price_per_day, is_available, transmission, seats",
    );
  // Removed .eq("is_available", true) to let AI know about unavailable vehicles too

  // 2. Format context for the AI
  const vehicleContext = vehicles
    ?.map(
      (v) =>
        `- ${v.brand} ${v.model} (${v.type}): IDR ${v.price_per_day.toLocaleString(
          "id-ID",
        )}/day, ${v.transmission}, ${v.seats || 0} seats. Status: [${
          v.is_available ? "AVAILABLE" : "NOT AVAILABLE"
        }]`,
    )
    .join("\n");

  const systemPrompt = `
You are a helpful customer support assistant for "Rental Mobil & Motor".
Your goal is to help users find vehicles, check prices, and guide them to book.

Here is the current list of vehicles and their status:
${vehicleContext}

Rules:
1. ONLY recommend vehicles that are marked as [AVAILABLE].
2. If a user asks for a vehicle that is marked [NOT AVAILABLE], apologize and politely say it is currently unavailable. You can suggest similar AVAILABLE vehicles instead.
3. Prices are in IDR (Indonesian Rupiah).
4. If a user asks to book, guide them to the vehicle's detail page (tell them to check the Vehicles page).
5. Be polite, concise, and helpful.
6. Use Indonesian language (Bahasa Indonesia) by default.
7. Use Markdown formatting for better readability:
   - Use **bold** for vehicle names and prices.
   - Use bullet points (-) for lists.
   - Use line breaks between paragraphs.
   - You can use tables for comparison if needed.
`.trim();

  // 3. Call Groq API
  const result = streamText({
    model: groq("llama-3.3-70b-versatile") as unknown as LanguageModel,
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
