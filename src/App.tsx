import './assets/styles/App.css';
import { useState } from 'react';
import FooterComponent from './components/FooterComponent';
import Header from './components/HeaderComponent';
import MainCanvas from './components/MainCanvas';
import { motion} from 'framer-motion';

const childVariantsR = {
  hidden: { x: -270, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { delay: 0.2, duration: 1 } },
};

const childVariantsL = {
  hidden: { x: 270, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { delay: 0.2, duration: 1 } },
};

const App = () => {  
  const [mode, setMode] = useState('light');

  const toggleMode = (modeName: string) => {
    setMode(modeName);
  };

  return (
    <div className={`App ${mode}`}>
        <div className={`HeaderContainer ${mode}`}>
          <Header mode={mode} toggleMode={toggleMode} />
        </div>
        <motion.div 
        className={`CanvasContainer ${mode}`}>
          <motion.div variants={childVariantsR}  initial="hidden" whileInView={"visible"}>
            <MainCanvas mode={mode} imageNumber={1} />
          </motion.div>
          <motion.div variants={childVariantsL}  initial="hidden" whileInView={"visible"}>
            <MainCanvas mode={mode} imageNumber={2} />
          </motion.div>
          <motion.div variants={childVariantsR}  initial="hidden" whileInView={"visible"}>
            <MainCanvas mode={mode} imageNumber={3} />
          </motion.div>
          <motion.div variants={childVariantsL}  initial="hidden" whileInView={"visible"}>
            <MainCanvas mode={mode} imageNumber={4} />
          </motion.div>
        </motion.div>
        <div className={`FooterContainer ${mode}`}>
          <FooterComponent mode={mode} />
        </div>
    </div>
  )
}

export default App