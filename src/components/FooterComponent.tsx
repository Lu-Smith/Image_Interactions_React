import React from 'react';
import '../assets/styles/Footer.css';

interface FooterProps {
  mode: string;  
}

const FooterComponent: React.FC<FooterProps> = ({mode}) => {
  return (
    <div className={`Footer ${mode}`}>
        <h3>Coded by 
            <a
             href='https://www.lunasmithart.com/' 
             target='_blank'
             className='portfolio'>
                Luna Smith
            </a>
            -
            <a 
            href='https://github.com/Lu-Smith/Image_Interactions_React'
            target='_blank'>
                GitHub
            </a>
            .
        </h3>
    </div>
  )
}

export default FooterComponent