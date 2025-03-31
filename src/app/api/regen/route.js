import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {

  try {
    const { input, app, prev } = await req.json();
    console.log("INPUT", input, app);
    console.log("PREV", prev.events);
    
    if (!input) {
      return NextResponse.json({ error: "Input is required" }, { status: 400 });
    }
    
    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI, // Ensure this is kept secure in environment variables
    });
    
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
              role: 'system',
              content: `
          You are an assistant that regenerates structured JSON content based on a user's input.
          
          Your job is to return JSON that includes:
          - A top-level "title" field (a short, descriptive title for the overall recommendation set)
          - A top-level "description" field (a summary of what this set of recommendations is for)
          - You are building on top of the previous input's event field. 
          - If asked to add, keep the original input and add to the events array at an index that makes sense for the event flow. 
          - If asked to remove, keep the original input and remove from the events array. 
          - If asked to change directions, regenerate the entire json. 

          
          Each item in the "events" array must be an object with:
          - "title": a concise event title
          - "des": a short description of the event
          
          Use this format exactly:
          
          {
            "title": "Example Title",
            "description": "This is a short description of what the recommendation set is for.",
            "events": [
              { "title": "Event Title 1", "des": "Event description 1" },
              { "title": "Event Title 2", "des": "Event description 2" },
              { "title": "Event Title 3", "des": "Event description 3" }
              // At least 7 total, and DO NOT include a trailing comma after the last item
            ]
          }
          
          Rules:
          - Return a valid, **parsable** JSON object (no Markdown, no explanation).
          - DO NOT wrap the JSON in triple backticks.
          - DO NOT return an array as the root element — the root must be an object.
          - DO NOT include a comma after the final item in the "events" array.
          - DO NOT include extra text, commentary, or formatting — just the JSON.
          - DO NOT add text other than the time (7:00 AM) if its an alarm event description. 
          
          Context:
          - Here's the user's original input: **${input}**
          - Here's the previous generation for context: **${JSON.stringify(prev)}**
          
          Output a well-formatted JSON object ONLY. Let's do this right — your output will be parsed by JSON.parse().
              `.trim()
            },
            {
              role: 'user',
              content: `${input}`
            }
          ]
          
    });

    let rawContent = response.choices[0].message.content
    rawContent = rawContent.replace(/^```(?:json)?|```$/g, '').trim();

    console.log("RAW CONTENT", rawContent)

    return NextResponse.json(JSON.parse(rawContent));
    

  } catch (error) {
    console.error("Error fetching OpenAI response:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
