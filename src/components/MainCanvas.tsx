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
      if (window.innerWidth > 540) {
        canvas.width = 500;
        canvas.height = (imageNumber === 2 || imageNumber === 6) ? 601 : imageNumber === 4 ? 710 : 669; 
        setSmallImage(false);
      } else {
        canvas.width = 300;
        canvas.height = (imageNumber === 2 || imageNumber === 6) ? 361 : imageNumber === 4 ? 426 : 402; 
        setSmallImage(true);
      }
    };

    setCanvasDimensions();

    const effect = imageNumber === 2  ? new mainEffect(canvas) : 
    imageNumber === 1 ? new effectOne(canvas) : 
    imageNumber === 3 ? new effectTwo(canvas) : 
    imageNumber === 4 ? new effectThree(canvas) : 
    imageNumber === 6 ? new effectFive(canvas) : new effectFour(canvas);
    
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
  }, [imageNumber]);

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