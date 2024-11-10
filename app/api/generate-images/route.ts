// app/api/generate-images/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function GET() {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "OpenAI API key is not configured" },
        { status: 500 },
      );
    }

    const openai = new OpenAI({
      apiKey: apiKey,
    });

    const images: string[] = [];

   
      console.log("fetching")
      const response = await openai.images.generate({
        model: "dall-e-2",
        prompt: "mountains during the night time",
        n: 1,
        size: "256x256",
      });

     

      const image_url = response.data[0].url;
      if (!image_url) {
        throw new Error("No image URL returned from OpenAI");
      }

      images.push(image_url);
    

    // Set CORS headers
    const res = NextResponse.json({ success: true, data: images });
    res.headers.set("Access-Control-Allow-Origin", "*");
    return res;
  } catch (error) {
    console.error("Error generating images:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to generate images",
      },
      { status: 500 },
    );
  }
}
