import React from 'react';
import { Slide } from 'react-slideshow-image';
import pic1 from './pic1.jpg';
import pic2 from './pic3.jpg';
import pic3 from './pic4.jpg';
const img1=require('./pic1.jpg');
const img2=require('./pic3.jpg');
const img3=require('./pic4.jpg');
const slideImages = [
<img src={pic1} />,
<img src={pic2} />,
<img src={pic3} />
];

const Slideshow = () => {
    return (
      <div>
        <Slide easing="ease">
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[0]})`}}>
              <span>Slide 1</span>
            </div>
          </div>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
              <span>Slide 2</span>
            </div>
          </div>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
              <span>Slide 3</span>
            </div>
          </div>
        </Slide>
      </div>
    )
};

export default Slideshow;