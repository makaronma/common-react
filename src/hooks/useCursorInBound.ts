import { useCallback, useEffect, useRef, useState } from "react";

const useCursorInBound = (bounds: React.RefObject<HTMLElement>[]) => {
  const [cursorInBound, setCusorInBound] = useState(false);
  const mousePos = useRef<{ clientX: Number; clientY: Number }>();

  const check = useCallback(() => {
    if (!mousePos.current) return;
    const { clientX, clientY } = mousePos.current;

    const inBound = bounds.some((b) => {
      if (!b.current) return false;
      const { x, y, width, height } = b.current.getBoundingClientRect();
      return (
        clientX > x &&
        clientX < x + width &&
        clientY > y &&
        clientY < y + height
      );
    });

    setCusorInBound(inBound);
  }, [bounds]);

  const mouseMoveEvent = useCallback(
    (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mousePos.current = { clientX, clientY };
      check();
    },
    [check]
  );

  useEffect(() => {
    document.addEventListener("mousemove", mouseMoveEvent);
    document.addEventListener("scroll", check);
    return () => {
      document.removeEventListener("mousemove", mouseMoveEvent);
      document.removeEventListener("scroll", check);
    };
  }, [check, mouseMoveEvent]);

  return { cursorInBound };
};

export default useCursorInBound;
