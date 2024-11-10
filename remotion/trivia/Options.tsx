import React, { useEffect, useState } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

interface OptionsProps {
  options: string[];
  correctAnswer: number;
}

function Options(props: OptionsProps) {
  const { options, correctAnswer } = props;
  const [revealAnswer, setRevealAnswer] = useState(false);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  useEffect(() => {
    const secondsElapsed = Math.floor(frame / fps);
    const section = 5 - secondsElapsed;

    if (section >= 1) {
      setRevealAnswer(false);
    } else {
      setRevealAnswer(true);
    }
  }, [frame, fps]);

  const getOptionLetter = (index: number) => {
    return String.fromCharCode(65 + index) + ")";
  };

  return (
    <div className="p-4">
      <ol className="list-none pl-8 space-y-4">
        {options.map((option, index) => (
          <li
            key={index}
            className={`text-[120px] font-semibold relative ${
              revealAnswer && correctAnswer === index ? "text-purple-900" : ""
            }`}
          >
            <span className="absolute -left-28">{getOptionLetter(index)}</span>
            <span className="pl-4">{option}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Options;
