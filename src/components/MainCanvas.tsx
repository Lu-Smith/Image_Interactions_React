import React, { useEffect, useRef, useState } from 'react';
import '../assets/styles/MainCanvas.css';
//image1
import mainEffect from '../assets/cells/mainEffect';
//image2
import effectOne from '../assets/cells/effectOne';
//image3
import effectTwo from '../assets/cells/effectTwo';
//image4
import effectThree from '../assets/cells/effectThree';

type ImageData = {
  [key in number]: {
    mainImage: string;
    mobileImage: string;
  };
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
      if (window.innerWidth > 640) {
        canvas.width = 600;
        canvas.height = imageNumber === 1 ? 722 : imageNumber === 4 ? 852 : 804; 
        setSmallImage(false);
      } else {
        canvas.width = 300;
        canvas.height = imageNumber === 1 ? 361 : imageNumber === 4 ? 426 : 402; 
        setSmallImage(true);
      }
    };

    setCanvasDimensions();

    const effect = imageNumber === 1 ? new mainEffect(canvas) : 
    imageNumber === 2 ? new effectOne(canvas) : 
    imageNumber === 3 ? new effectTwo(canvas) : new effectThree(canvas);
    

    const animate = () => {
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
  }, []);

  return (
    <div className={`MainCanvas ${mode}`}>
        <div>
          <canvas ref={canvasRef} id="canvas1"></canvas>
          <img
          src={smallImage ? imageData[imageNumber].mobileImage : imageData[imageNumber].mainImage}
          id={`Image${imageNumber}`}
          alt={`Image ${imageNumber} by Luna Smith`}
        />
        </div>
    </div>
  );
};

export default MainCanvas;