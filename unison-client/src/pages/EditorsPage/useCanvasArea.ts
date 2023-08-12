import { useEffect, useState } from "react"

const CanvasAreaWidth = window.innerWidth;
const CanvasAreaHeight = window.innerHeight;

type CanvasArea = {
  w: number,
  h: number
}

export const useCanvasArea = () => {
  const [canvasArea, setCanvasArea] = useState<CanvasArea>({
    w: CanvasAreaWidth,
    h: CanvasAreaHeight
  });

  const handleResize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    setCanvasArea({
      w,
      h
    });
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return {
    canvasArea
  }
}
