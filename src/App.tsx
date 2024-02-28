import './assets/styles/App.css';
import { useState } from 'react';
import FooterComponent from './components/FooterComponent';
import Header from './components/HeaderComponent';
import MainCanvas from './components/MainCanvas';
//image1
import Image1 from './assets/images/Alps.jpg';
import mobileImage1 from './assets/images/AlpsSmall.jpg';
//image2
import Image2 from './assets/images/Garden.jpg';
import mobileImage2 from './assets/images/GardenSmall.jpg';
//image3
import Image3 from './assets/images/Guardian.jpg';
import mobileImage3 from './assets/images/GuardianSmall.jpg';
//image4
import Image4 from './assets/images/Odin.jpg';
import mobileImage4 from './assets/images/OdinSmall.jpg';
//image5
import Image5 from './assets/images/Paradise.jpg';
import mobileImage5 from './assets/images/ParadiseSmall.jpg';
//image6
import Image6 from './assets/images/Autumn.jpg';
import mobileImage6 from './assets/images/AutumnSmall.jpg';

const App = () => {  
  const [mode, setMode] = useState('light');

  const toggleMode = (modeName: string) => {
    setMode(modeName);
  };

  const [currentImage, setCurrentImage] = useState<number>(1);
  
  const handleNextImage = () => {
    setCurrentImage((prevImage) => (prevImage === 6 ? 1 : prevImage + 1));
  };

  const handlePrevImage = () => {
    setCurrentImage((prevImage) => (prevImage === 1 ? 6 : prevImage - 1));
  };

  const imageData: { [key: number]: { mainImage: string; mobileImage: string } } = {
    1: { mainImage: Image1, mobileImage: mobileImage1 },
    2: { mainImage: Image2, mobileImage: mobileImage2 },
    3: { mainImage: Image3, mobileImage: mobileImage3 },
    4: { mainImage: Image4, mobileImage: mobileImage4 },
    5: { mainImage: Image6, mobileImage: mobileImage6 },
    6: { mainImage: Image5, mobileImage: mobileImage5 },
  };

  return (
    <div className={`App ${mode}`}>
        <div className={`HeaderContainer ${mode}`}>
          <Header mode={mode} toggleMode={toggleMode} />
        </div>
        <div className={`ButtonsContainer ${mode}`}>
          <button onClick={handlePrevImage}>Previous</button>
          <button onClick={handleNextImage}>Next</button>
        </div>
        <div className={`CanvasContainer ${mode}`}>
          <div>
            <MainCanvas 
            mode={mode} 
            imageNumber={currentImage}   
            imageData={imageData[currentImage]} />
          </div>
      </div>
        <div className={`FooterContainer ${mode}`}>
          <FooterComponent mode={mode} />
        </div>
    </div>
  )
}

export default App