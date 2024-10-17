import { DirectionSymbol } from "./DirectionSymbol";
import { CaptureArea } from "./CaptureArea";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Column, Orientation } from "../types";

const directionByColumn: Record<Column, Orientation> = {
  1: "UP",
  2: "LEFT",
  3: "RIGHT",
  4: "DOWN",
} as const;

export function PlayArea() {
  const captureRef = useRef<HTMLDivElement>(null);
  const playAreaRef = useRef<HTMLDivElement>(null);
  const [captureHeight, setCaptureHeight] = useState<number | undefined>(
    undefined
  );
  const [score, setScore] = useState<number>(0);
  const [symbols, setSymbols] = useState<ReactNode[]>([]);

  useEffect(() => {
    if (captureRef.current && playAreaRef.current) {
      const captureAreaTop = captureRef.current.getBoundingClientRect().top;
      const playAreaTop = playAreaRef.current?.getBoundingClientRect().top;

      const requiredHeight = captureAreaTop - playAreaTop;
      setCaptureHeight(requiredHeight);
    }
  }, [setCaptureHeight]);

  useEffect(() => {
    if (!captureHeight) {
      return;
    }

    const createSymbol = setInterval(() => {
      const column = Math.ceil(Math.random() * 4) as Column;
      setSymbols((currentSymbols) => [
        ...currentSymbols,
        <DirectionSymbol
          captureHeight={captureHeight}
          column={column}
          orientation={directionByColumn[column]}
          hitHandler={(score) => setScore((prevScore) => prevScore + score)}
        />,
      ]);
    }, 1000);

    return () => clearInterval(createSymbol);
  }, [captureHeight]);

  return (
    <>
      <div
        ref={playAreaRef}
        style={{
          position: "relative",
          height: "640px",
          width: "400px",
          border: "1px solid navy",
          backgroundColor: "black",
          overflow: "hidden",
        }}
      >
        {symbols}
        <CaptureArea ref={captureRef} />
      </div>
      <div
        style={{
          display: "flex",
          gap: "1rem",
        }}
      >
        <span>Score:</span>
        <span>{score}</span>
      </div>
    </>
  );
}
