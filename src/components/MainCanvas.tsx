import React, { useEffect, useRef } from 'react';
import '../assets/styles/MainCanvas.css';

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
  }, []);

  return (
    <div className={`MainCanvas ${mode}`}>
      <canvas ref={canvasRef} id="canvas1"></canvas>
    </div>
  );
};

export default MainCanvas;