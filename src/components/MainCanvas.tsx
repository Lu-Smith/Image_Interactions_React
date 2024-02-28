import React, { useEffect, useRef, useState } from 'react';
import '../assets/styles/MainCanvas.css';
import effect1 from '../assets/cells/effect1';

interface ImageData {
    mainImage: string;
    mobileImage: string;
}

interface MainProps {
  mode: string;
  imageNumber: number;
  imageData: ImageData;
}

const MainCanvas: React.FC<MainProps> = ({ mode, imageNumber, imageData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [smallImage, setSmallImage] = useState<boolean>(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasDimensions = () => {
      if (window.innerWidth > 500) {
        canvas.width = 400;
        canvas.height = imageNumber === 1 ? 481 : imageNumber === 2 ? 535 : 
        imageNumber === 3 ? 542 : imageNumber === 4 ? 568 : imageNumber === 6 ? 479 : 560;  
        setSmallImage(false);
      } else {
        canvas.width = 270;
        canvas.height = imageNumber === 1 ? 325 : imageNumber === 2 ? 362 : 
        imageNumber === 2 ? 365 : imageNumber === 4 ? 383 : imageNumber === 6 ? 359 : 378; 
        setSmallImage(true);
      }
    };

    setCanvasDimensions();

    const effectsParams = [
      { radius: 60, columnCells: 10, rowCells: 12 },
      { radius: 80, columnCells: 15, rowCells: 35 },
      { radius: 40, columnCells: 14, rowCells: 30 },
      { radius: 60, columnCells: 10, rowCells: 15 },
      { radius: 60, columnCells: 8, rowCells: 12 },
  ];
  
  const defaultParams = { radius: 60, columnCells: 10, rowCells: 15 };
  
  const effectParams = effectsParams[imageNumber - 1] || defaultParams;
  
  const effect = new effect1(canvas, effectParams.radius, effectParams.columnCells, effectParams.rowCells, imageNumber);
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      effect.render(ctx);
      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  
    const handleResize = () => {
      setCanvasDimensions();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, [imageNumber]);

  return (
    <div className={`MainCanvas ${mode}`}>
        <div>
          <canvas ref={canvasRef} id="canvas1"></canvas>
          <img
          src={smallImage ? imageData.mobileImage : imageData.mainImage}
          id={`Image${imageNumber}`}
          alt={`Image ${imageNumber} by Luna Smith`}
        />
        </div>
    </div>
  );
};

export default MainCanvas;