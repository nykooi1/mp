import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

function ImageSlider({images}){

    const properties = {
        autoplay: false,
        canSwipe: false,
        transitionDuration: 500,
    }

    return (
        <Slide {...properties} >
            {images.map((image, imageIndex) => (
                <div key={imageIndex}className="each-slide-effect">
                    <div className="background-container" style={{ 'backgroundImage': `url(${image}})` }}></div>
                </div>
            ))}
        </Slide>
    
    );
};

export default ImageSlider;