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
  let animationId: number | undefined;

  const handleImageClick = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');

      if (ctx) {
        console.log('Clearing canvas...');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        startAnimation(imageNumber); 
      } else {
        console.log('Context not available.');
      }
    } else {
      console.log('Canvas element not found.');
    }
  };

  const startAnimation = (imageNumber: number) => {
      console.log('Starting animation...');
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const effectsParams = [
      { radius: 60, columnCells: 9, rowCells: 12 },
      { radius: 80, columnCells: 14, rowCells: 30 },
      { radius: 40, columnCells: 12, rowCells: 28 },
      { radius: 60, columnCells: 10, rowCells: 15 },
      { radius: 60, columnCells: 8, rowCells: 12 },
      { radius: 50, columnCells: 4, rowCells: 10 }
    ];

    const defaultParams = { radius: 60, columnCells: 9, rowCells: 12 };

    const effectParams = effectsParams[imageNumber - 1] || defaultParams;

    const effect = new effect1(canvas, effectParams.radius, effectParams.columnCells, effectParams.rowCells, imageNumber);

    const setCanvasDimensions = () => {
      if (window.innerWidth > 500) {
        canvas.width = 400;
        canvas.height = [535, 481, 542, 568, 560, 479][imageNumber - 1] || 0;
        setSmallImage(false);
      } else {
        canvas.width = 270;
        canvas.height = [362, 325, 365, 383, 378, 359][imageNumber - 1] || 0;
        setSmallImage(true);
      }
    };

    const animateLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      effect.render(ctx);
      animationId = requestAnimationFrame(animateLoop);
    };

    const animate = () => {
      animationId = requestAnimationFrame(animateLoop);
    };

    console.log('Checking animation status:', animationId);

    animate();
    setCanvasDimensions();
  };

  useEffect(() => {
    startAnimation(imageNumber);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [imageNumber]);

  return (
    <div className={`MainCanvas ${mode}`} onClick={handleImageClick}>
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