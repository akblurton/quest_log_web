import { useEffect, useRef } from "react";
const useAnimationFrame = (fn, enabled = true) => {
  const lastTime = useRef(null);
  const callback = useRef(fn);
  callback.current = fn;
  useEffect(() => {
    let running = true;
    function animate(time) {
      if (!running) {
        return;
      }
      if (lastTime.current === null) {
        lastTime.current = time;
        requestAnimationFrame(animate);
        return;
      }

      const dt = time - lastTime.current;
      lastTime.current = time;
      callback.current(dt);
      requestAnimationFrame(animate);
    }

    let frame;
    if (enabled) {
      frame = requestAnimationFrame(animate);
    }

    return () => {
      running = false;
      cancelAnimationFrame(frame);
    };
  }, [enabled]);
};

export default useAnimationFrame;
