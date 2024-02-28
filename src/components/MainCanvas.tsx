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
//image5
import effectFour from '../assets/cells/effectFour';
//image6
import effectFive from '../assets/cells/effectFive';

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

    const effect = imageNumber === 1  ? new mainEffect(canvas) : 
    imageNumber === 2 ? new effectOne(canvas) : 
    imageNumber === 3 ? new effectTwo(canvas) : 
    imageNumber === 4 ? new effectThree(canvas) : 
    imageNumber === 5 ? new effectFive(canvas) : new effectFour(canvas);
    
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