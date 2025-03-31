import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {

  try {
    const { input } = await req.json();
    console.log("INPUT", input); 
    
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
                content: 
                `
                Your job is to return JSON that includes:
                - You are a planner creating a detailed and complete multiple step event. 
                - Choose apps from this list that best fit the prompt: Notes, Alarm, Music, Reminders
                - Have the title be a 5 word maximum summary of the description. 
                - Here is an example of the desired format for preparing for a job interview: 

                EXAMPLE:
                {
                    "l":
                    {
                        "Notes":
                        {
                            "title": "Study Plan", 
                            "description": "This is a study plan for an interview",
                            "events": [
                                { "title": "Review Notes", "des": "Look through notes taken during lecture."}
                            ]
                        }
                    },
                    "m":
                    {
                        "Reminders": 
                        {
                            "title": "Study Reminders", 
                            "description": "This is a list of reminders for interview",
                            "events": [
                                { "title": "Get Ready", "des": "Wake up ahead of time for interview."}
                            ]
                        }
                    },
                    "r":
                    {
                        "Music":
                        {
                            "title": "Interview Playlist", 
                            "description": "This is a study playlist for an interview",
                            "events": [
                                { "title": "Thinking About You", "des": "Frank Ocean"}
                            ]
                        }, 
                        "Alarm":
                        {
                            "title": "Interview Timer", 
                            "description": "This is a series of timers for prepping",
                            "events": [
                                { "title": "Wake up", "des": "8:00 AM"}
                            ]
                        }
                    }
                }

                RULES: 
                - YOU MUST Make sure each app has at least 7 entries in "events". 
                - YOU MUST Make sure that "l", "m", and "r" have less than 2 apps, and that one of them has 2 apps. 
                - YOU MUST Return the response in JSON format that can be parsed by JSON.parse().
                - YOU MUST Try to get to 4 apps total. 
                - YOU MUST For alarm, you must specify the time in the description (8:00 AM), and the activity in the title (Wake Up). 
                - DO NOT put the json in an array. 
                - DO NOT put a comma at the end of the "events" arrays. 
                `
            },
            {
                role: 'user',
                content: 
                `
                ${input}
                `
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
