import { forwardRef } from 'react';

export const CaptureArea = forwardRef<HTMLDivElement, object>((_props, ref) => {
  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        bottom: "2rem",
        left: "1px",
        right: "1px",
        border: "1px dashed lightgray",
        height: "2rem",
      }}
    />
  );
});

