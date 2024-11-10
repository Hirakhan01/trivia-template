import { z } from "zod";

// Define the QuizItem schema using zod
const QuizItemSchema = z.object({
  image: z.string(),
  options: z.array(z.string()),
  question: z.string(),
  correctAnswer: z.number(),
});

// Define the CompositionProps schema
export const CompositionProps = z.object({
  quizData: z.array(QuizItemSchema), // Use the QuizItem schema for quizData
});

// Define the default props conforming to the CompositionProps schema
export const defaultMyCompProps= {
  
    
      image: "",
      options: ["eww", "pew pew", "roarr"],
      question: "Which athlete holds the world record for the 100m sprint?",
      correctAnswer: 1,
    
};

// Constants for the composition
export const COMP_NAME = "trivia";
export const DURATION_IN_FRAMES = 900;
export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;
export const VIDEO_FPS = 30;
