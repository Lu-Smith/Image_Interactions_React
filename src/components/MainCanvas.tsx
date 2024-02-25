import React, { useEffect, useRef } from 'react';
import '../assets/styles/MainCanvas.css';
import mainEffect from '../assets/cells/mainEffect';
import mainImage from '../assets/images/Alps.jpg';

interface MainProps {
  mode: string;
}

const MainCanvas: React.FC<MainProps> = ({ mode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if ( window.innerWidth > 720) {
      canvas.width = 600;
      canvas.height = 722;
    } else {
      canvas.width = 300;
      canvas.height = 361;
    }

    const effect = new mainEffect(canvas);
    effect.render(ctx);

    const handleResize = () => {
      if ( window.innerWidth > 720) {
        canvas.width = 600;
        canvas.height = 842;
      } else {
        canvas.width = 300;
        canvas.height = 361;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`MainCanvas ${mode}`}>
      <canvas ref={canvasRef} id="canvas1"></canvas>
      <img src={mainImage} id="mainImage" alt="Italian Alps by Luna Smith" />
    </div>
  );
};

export default MainCanvas;