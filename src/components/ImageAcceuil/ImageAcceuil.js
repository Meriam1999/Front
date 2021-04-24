import React from 'react';
import '../ImageAcceuil/ImageAcceuil.css';
import 'antd/dist/antd.css';
import { Carousel } from 'antd';
import pic1 from './pic1.png';
import pic2 from './pic2.jpg';
import pic3 from './pic3.png';
import pic4 from './pic4.png';
import pic5 from './pic5.png';





const contentStyle = {
  height: '500px',
  marginTop:"7px",
  color: '#fff',
  borderRadius:"3px",
  lineHeight: '160px',
  textAlign: 'center',
  background: 'white',
};

function ImageAcceuil() {
    return (
      <>
            <div > 
              {/* <Slideshow />   */}
          {/* <img src="/assets/images/medicine.png" />  */}
          <Carousel autoplay effect="fade">
    <div>
      <h3 style={contentStyle}> <img src={pic1} /></h3>
    </div>
    <div>
      <h3 style={contentStyle}><img src={pic5}/></h3>
    </div>
    <div>
      <h3 style={contentStyle}><img src={pic3}/></h3>
    </div>
    
  </Carousel>
            
        </div>
      </>
    )
}

export default ImageAcceuil;
