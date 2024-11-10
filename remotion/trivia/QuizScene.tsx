import Image from "next/image";
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import Options from "./Options";
import Timer from "./Timer";

interface QuizSceneProps {
  image: string;
  options: string[];
  question: string;
  correctAnswer: number;
}

function QuizScene(props: QuizSceneProps) {
  const { image, question, options, correctAnswer } = props;
  return (
    <AbsoluteFill className="h-full text-white flex flex-col items-center justify-center">
      <div className="h-full w-full">
        <Img
          src={image}
          alt="img"
          className="h-full w-full"
          width={300}
          height={300}
        />
      </div>

      <div className="fixed z-10 flex flex-col items-center justify-center gap-10">
        <div className="h-fit w-fit bg-blue-600 p-4 pb-10 bg-opacity-40 rounded-3xl">
          <div className="bg-cyan-950 h-fit w-[850px] min-h-60 p-10  rounded-3xl">
            <h1 className="text-7xl font-semibold">{question}</h1>
          </div>
        </div>
        <div className="self-start ml-16">
          <Options options={options} correctAnswer={correctAnswer} />
        </div>
        <div className="justify-self-end">
          <Timer />
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default QuizScene;
