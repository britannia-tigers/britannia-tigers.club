import { useState, useEffect } from "react"


export function useWindowSize() {

  const [wh, setWh] = useState<[number, number]>([
    window.innerWidth, window.innerHeight
  ]);

  useEffect(() => {

    function whHandler() {

      setWh([
        window.innerWidth, window.innerHeight
      ]);
    }

    window.addEventListener('resize', whHandler);
    window.addEventListener('orientationchange', whHandler);

    return () => {
      window.removeEventListener('resize', whHandler);
      window.addEventListener('orientationchange', whHandler);
    }

  }, []);

  return wh;

}