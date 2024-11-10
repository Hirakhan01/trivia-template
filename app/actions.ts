// app/actions/fetchImages.ts
"use server";

import OpenAI from "openai";

type ImageFetchResponse = {
  success: boolean;
  data: string[] | null;
  error?: string;
};

export async function FetchImages(): Promise<ImageFetchResponse> {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return {
        success: false,
        data: null,
        error: "OpenAI API key is not configured",
      };
    }

    const openai = new OpenAI({
      apiKey: apiKey,
    });

    const images: string[] = [];

    // Generate 4 images
    for (let i = 0; i < 4; i++) {
        console.log("fetching image")
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: "mountains during the night time",
        n: 1,
        size: "1024x1792",
      });

      const image_url = response.data[0].url;
      if (!image_url) {
        throw new Error("No image URL returned from OpenAI");
      }

      images.push(image_url);
    }

    return {
      success: true,
      data: images,
    };
  } catch (error) {
    console.error("Error generating images:", error);
    return {
      success: false,
      data: null,
      error:
        error instanceof Error ? error.message : "Failed to generate images",
    };
  }
}
