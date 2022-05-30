import { useCallback, useEffect, useRef } from "react";

const useRequestAnimateFrame = (cb: (...args: any[]) => void) => {
  const requestRef = useRef<number>();

  const animate = useCallback(() => {
    cb();
    requestRef.current = requestAnimationFrame(animate);
  }, [cb]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      requestRef.current && cancelAnimationFrame(requestRef.current);
    };
  }, [animate]);

  return;
};

export default useRequestAnimateFrame