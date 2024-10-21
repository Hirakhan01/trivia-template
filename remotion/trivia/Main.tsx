import { z } from "zod";
import {
  AbsoluteFill,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CompositionProps } from "../../types/constants";
import { loadFont, fontFamily } from "@remotion/google-fonts/Inter";
import React from "react";

import QuizScene from "./QuizScene";

loadFont();

export const Main = ({ title }: z.infer<typeof CompositionProps>) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();


  return (
    <AbsoluteFill className="w-full h-full flex flex-col items-center justify-center">
      <QuizScene image='/img.jpg' options={["eww", "pew pew", "roarr", "meow"]} question="whom you like?" correctAnswer="2" />
    </AbsoluteFill>
  );
};
