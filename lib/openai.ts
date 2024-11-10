import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey:
    apiKey,
});

export const FetchImage = async () => {
  console.log("API called")
  const images: string[]=[];

  

  for (let i = 0; i <4; i++) {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: "mountains during the night time",
      n: 1,
      size: "1024x1792",
    });
    const image_url = response.data[0].url || "";
    images.push(image_url)
  }

  return images
};

FetchImage();
