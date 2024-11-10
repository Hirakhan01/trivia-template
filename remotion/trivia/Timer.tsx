"use client";
import React, { useEffect, useState } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

function Timer() {
  const Count = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const [timer, setTimer] = useState(5);

    useEffect(() => {
      // Reduce the timer every second
      const secondsElapsed = Math.floor(frame / fps);
      const newTimer = 5 - secondsElapsed;

      if (newTimer >= 1) {
        setTimer(newTimer);
      } else {
        setTimer(5); // Reset after the countdown
      }
    }, [frame, fps]);

    return <div className="text-7xl font-bold">{timer}</div>;
  };

  return (
    <div className="rounded-full h-52 w-52 bg-white flex flex-col items-center justify-center text-black text-7xl">
      <Count />
    </div>
  );
}

export default Timer;
