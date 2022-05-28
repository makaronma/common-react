import { useCallback, useEffect } from "react";

const useCursorFollowMouse = (cursor: React.RefObject<HTMLElement>) => {
  const mouseMoveEvent = useCallback(
    (e: MouseEvent) => {
      if (!cursor.current) return;
      const { clientX, clientY } = e;
      cursor.current.style.left = `${clientX}px`;
      cursor.current.style.top = `${clientY}px`;
    },
    [cursor]
  );

  useEffect(() => {
    document.addEventListener("mousemove", mouseMoveEvent);
    return () => document.removeEventListener("mousemove", mouseMoveEvent);
  }, [mouseMoveEvent]);

  return;
};

export default useCursorFollowMouse;
