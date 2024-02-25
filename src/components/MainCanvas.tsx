import React, { useEffect, useRef } from 'react';
import '../assets/styles/MainCanvas.css';
import mainEffect from '../assets/cells/mainEffect';

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

    if ( window.innerWidth > 520) {
      canvas.width = 500;
      canvas.height = 600;
    } else {
      canvas.width = 300;
      canvas.height = 400;
    }

    const effect = new mainEffect(canvas);

    const handleResize = () => {
      if ( window.innerWidth > 520) {
        canvas.width = 500;
        canvas.height = 300;
      } else {
        canvas.width = 300;
        canvas.height = 300;
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
    </div>
  );
};

export default MainCanvas;