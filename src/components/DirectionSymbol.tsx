import { useEffect, useState } from "react";
import { Column, Orientation } from "../types";

const symbolByOrientation: Record<Orientation, string> = {
  UP: "↑",
  DOWN: "↓",
  LEFT: "←",
  RIGHT: "→",
} as const;

const orientationByKeyEvent: Record<string, Orientation> = {
  ArrowUp: "UP",
  ArrowDown: "DOWN",
  ArrowLeft: "LEFT",
  ArrowRight: "RIGHT",
} as const;
                  
export function DirectionSymbol({
  orientation,
  column,
  captureHeight,
  hitHandler,
}: {
  orientation: Orientation;
  column: Column;
  captureHeight: number | undefined;
  hitHandler: (score: number) => void
}) {
  const [show, setShow] = useState<boolean>(true);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const fall = setInterval(
      () => setHeight((prevHeight) => prevHeight + 1),
      5
    );

    return () => clearInterval(fall);
  }, [setHeight, height, captureHeight]);

  useEffect(() => {
    function onKeyPress(e: KeyboardEvent) {
      if (orientationByKeyEvent[e.key] === orientation) {
        if (Math.abs(height - (captureHeight ?? 700)) < 32) {
          hitHandler(1);
        }
        setShow(false);
      }
    }

    if (height > 500) {
      document.addEventListener("keydown", onKeyPress);
    }
    
    return () => document.removeEventListener("keydown", onKeyPress);
  }, [orientation, height, captureHeight, hitHandler]);

  return (
    height <= 700 &&
    show && (
      <div
        style={{
          fontSize: "2rem",
          color: "white",
          height: "2rem",
          width: "2rem",
          position: "absolute",
          top: `${height}px`,
          left: `calc(${column * 20}% - 1rem)`,
          borderRadius: "50%",
          border: "1px solid green",
          lineHeight: "1.65rem",
        }}
      >
        {symbolByOrientation[orientation]}
      </div>
    )
  );
}
