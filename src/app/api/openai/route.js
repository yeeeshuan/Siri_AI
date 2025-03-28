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
                You are a planner creating a detailed and complete multiple step event. 
                You will be provided with a type of process build, with multiple different applications. 
                Choose apps from this list that best fit the prompt: Notes, Timer, Music, Reminders, Calendar
                Have the title be a 5 word maximum summary of the description. 
                Have the description detail the people related to the event. 
                Here is an example of the desired format for preparing for a job interview: 
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
                        "Timer":
                        {
                            "title": "Interview Timer", 
                            "description": "This is a series of timers for prepping",
                            "events": [
                                { "title": "Wake up", "des": "7 AM"}
                            ]
                        }
                    }
                }
                Make sure each app has at least 7 entries in "events". 
                Make sure that "l", "m", and "r" have less than 2 apps, and that one of them has 2 apps. 
                If less than 3 apps fit the task, only populate "l" and "r".
                Try to get to 4 apps total. 
                Do not put the json in an array. 
                Do not put a comma at the end of the "events" arrays. 
                Return the response in JSON format that can be parsed by JSON.parse().
                Do a good job and I will tip you.`
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
