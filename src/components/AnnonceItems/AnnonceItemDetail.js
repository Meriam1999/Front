import React from "react";
import Comments from '../Comments/CommentPage';
import './AnnonceItem.css';
const myStyles = { display: "inline-block" };

function AnnonceItemDetail() {
  return (
          <div className="container">
            {/*title */}
        
            {/* product info*/}
            <div className="PicContainer" style={myStyles}>
              <img  src='assets/images/medi.jpg'  className="img-fluid" alt="product" />
            </div>

            {/* product text*/}
            <div
              className="description"
              style={myStyles}
            >
                <p
                className="c2"
              >
                some info about the product:
              </p>
              <p className="text-muted lead"> infooo </p>
              <h4 className="text-blue">
                <strong>
                  price : <span>$</span>
                </strong>
              </h4>

              
              {/*buttons */}
              <p> <Comments /></p>
            </div>
          </div>
        );
      }
    

      export default AnnonceItemDetail