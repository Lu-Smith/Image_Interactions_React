import React, { useEffect, useRef, useState } from 'react';
import '../assets/styles/MainCanvas.css';
import mainEffect from '../assets/cells/mainEffect';
import mainImage from '../assets/images/Alps.jpg';

interface MainProps {
  mode: string;
}

const MainCanvas: React.FC<MainProps> = ({ mode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [smallImage, setSmallImage] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    console.error('Failed to get canvas context.');
    if (!ctx) return;

    const setCanvasDimensions = () => {
      if ( window.innerWidth > 720) {
        canvas.width = 600;
        canvas.height = 722;
        setSmallImage(false);
      } else {
        canvas.width = 300;
        canvas.height = 361;
        setSmallImage(true);
      }
    }

    setCanvasDimensions();

    const effect = new mainEffect(canvas);
    effect.render(ctx);

    const handleResize = () => {
      setCanvasDimensions();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`MainCanvas ${mode}`}>
      <canvas ref={canvasRef} id="canvas1"></canvas>
      <img src={mainImage} id="mainImage" className={smallImage ? 'small-image' : 'large-image'} alt="Italian Alps by Luna Smith" />
    </div>
  );
};

export default MainCanvas;