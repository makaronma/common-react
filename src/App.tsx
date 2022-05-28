import { createRef, forwardRef, useMemo, useRef } from "react";
import useCursorInBound from "./hooks/useCursorInBound";
import useCursorFollowMouse from "./hooks/useCursorFollowMouse";

const getRandomColor = () => Math.floor(Math.random() * 16777215).toString(16);

const App = () => {
  const myBoundsRefs = useMemo(
    () => [...Array(20)].map(() => createRef<HTMLDivElement>()),
    []
  );
  const cursor = useRef<HTMLDivElement>(null);

  const { cursorInBound } = useCursorInBound(myBoundsRefs);
  useCursorFollowMouse(cursor);

  const myBounds = useMemo(
    () => (
      <>
        {[...Array(20)].map((x, i) => (
          <div
            ref={myBoundsRefs[i]}
            key={i}
            className={`h-44 w-44 border-2 border-black`}
            style={{
              backgroundColor: `#${getRandomColor()}`,
            }}
          ></div>
        ))}
      </>
    ),
    [myBoundsRefs]
  );

  return (
    <>
      <div className="flex flex-wrap gap-14">{myBounds}</div>
      <Cursor ref={cursor} cursorInBound={cursorInBound} />
    </>
  );
};

export default App;

const Cursor = forwardRef<HTMLDivElement, { cursorInBound: boolean }>(
  (props, ref) => {
    const { cursorInBound } = props;
    return (
      <div
        className={`fixed left-0 top-0 w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full
                 ${cursorInBound ? "bg-green-500" : "bg-red-500"} `}
        ref={ref}
      ></div>
    );
  }
);
