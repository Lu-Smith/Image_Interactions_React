import React, { useEffect, useRef, useState } from 'react';
import '../assets/styles/MainCanvas.css';
//image1
import mainEffect from '../assets/cells/mainEffect';
import mainImage from '../assets/images/Alps.jpg';
import mobileImage from '../assets/images/AlpsSmall.jpg';
//image2
import effectOne from '../assets/cells/effectOne';
import Image1 from '../assets/images/Garden.jpg';
import mobileImage1 from '../assets/images/GardenSmall.jpg';
//image3
import effectTwo from '../assets/cells/effectTwo';
import Image2 from '../assets/images/Guardian.jpg';
import mobileImage2 from '../assets/images/GuardianSmall.jpg';

interface MainProps {
  mode: string;
  imageNumber: number;
}

const MainCanvas: React.FC<MainProps> = ({ mode, imageNumber }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRef1 = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);
  const [smallImage, setSmallImage] = useState<boolean>(false);
  const [smallImage1, setSmallImage1] = useState<boolean>(false);
  const [smallImage2, setSmallImage2] = useState<boolean>(false);

  useEffect(() => {
    const canvas = imageNumber === 1 ? canvasRef.current : 
    imageNumber === 2 ? canvasRef1.current: canvasRef2.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasDimensions = () => {
      if (window.innerWidth > 640) {
        canvas.width = 600;
        canvas.height = imageNumber === 1 ? 722 : 804; 
        setSmallImage(false);
        setSmallImage1(false);
        setSmallImage2(false);
      } else {
        canvas.width = 300;
        canvas.height = imageNumber === 1 ? 361 : 402; 
        setSmallImage(true);
        setSmallImage1(true);
        setSmallImage2(true);
      }
    };

    setCanvasDimensions();

    const effect = imageNumber === 1 ? new mainEffect(canvas) : 
    imageNumber === 2 ? new effectOne(canvas) : new effectTwo(canvas);
    

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
        {(imageNumber === 1) && (
          <div>
          <canvas ref={canvasRef} id="canvas1"></canvas>
          <img 
          src={smallImage ? mobileImage : mainImage}
          id="mainImage" 
          alt="Italian Alps by Luna Smith" />
        </div>
        )} 
      {(imageNumber === 2) && (
        <div>
          <canvas ref={canvasRef1} id="canvas2"></canvas>
          <img 
            src={smallImage1 ? mobileImage1 : Image1}
            id="Image1" 
            alt="Secret Garden by Luna Smith" />
        </div>
      )}
      {(imageNumber === 3) && (
        <div>
          <canvas ref={canvasRef2} id="canvas3"></canvas>
          <img 
            src={smallImage2 ? mobileImage2 : Image2}
            id="Image2" 
            alt="Gurdian Tree by Luna Smith" />
        </div>
      )}
    </div>
  );
};

export default MainCanvas;