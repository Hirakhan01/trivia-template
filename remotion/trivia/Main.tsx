import { z } from "zod";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  CalculateMetadataFunction,
} from "remotion";
import React from "react";
import QuizScene from "./QuizScene";

// Define the QuizItem type
type QuizItem = {
  image: string;
  options: string[];
  question: string;
  correctAnswer: number;
};

type ApiResponse = {
  success: boolean;
  data?: string[];
  error?: string;
};

// Define the schema for the props
const QuizItemSchema = z.object({
  image: z.string(),
  options: z.array(z.string()),
  question: z.string(),
  correctAnswer: z.number(),
});

// Main component props type
type MainProps = {
  quizData: QuizItem[]; // Changed to accept an array of QuizItem
};

// Calculate metadata function for fetching images before render
export const calculateMainMetadata: CalculateMetadataFunction<
  MainProps
> = async ({ props }) => {
  try {
    const response = await fetch("http://localhost:3000/api/generate-images");
    const data: ApiResponse = await response.json();

    if (!response.ok || !data.success || !data.data) {
      throw new Error(data.error || "Failed to fetch images");
    }

    const images = data.data.slice(0, 4); // Fetch only the first 4 images

    const quizData: QuizItem[] = [
      {
        image: images[0] || "",
        options: ["eww", "pew pew", "roarr"],
        question: "What is the 'i' in the FBI?",
        correctAnswer: 1,
      },
      {
        image: images[1] || "",
        options: ["eww", "pew pew", "roarr"],
        question: "How many rings are on the Olympic flag?",
        correctAnswer: 2,
      },
      {
        image: images[2] || "",
        options: ["eww", "pew pew", "roarr"],
        question: "Which athlete holds the world record for the 100m sprint?",
        correctAnswer: 1,
      },
      {
        image: images[3] || "",
        options: ["eww", "pew pew", "roarr"],
        question: "Which athlete holds the world record for the 100m sprint?",
        correctAnswer: 1,
      },
    ];

    return {
      props: {
        ...props,
        quizData,
      },
    };
  } catch (error) {
    console.error("Error fetching images:", error);
    throw new Error("Failed to fetch images");
  }
};

// Main component
export const Main: React.FC<MainProps> = ({ quizData }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const durationInSeconds = 30;
  const totalFrames = durationInSeconds * fps;

  const sceneDuration =
    quizData.length > 0
      ? Math.floor(totalFrames / quizData.length)
      : totalFrames;

  return (
    <AbsoluteFill className="w-full h-full flex flex-col items-center justify-center">
      {quizData.map((scene, index) => (
        <Sequence
          from={index * sceneDuration}
          durationInFrames={sceneDuration}
          key={index}
        >
          <QuizScene
            image={scene.image}
            options={scene.options}
            question={scene.question}
            correctAnswer={scene.correctAnswer}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
