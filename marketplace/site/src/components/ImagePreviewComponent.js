import React from 'react';

import "./css/ImagePreview.css";

//takes in the image url and the function to be able to remove the (current) image (aka removing itself)
function ImagePreviewComponent({src, removeItemImage}) {

    //styling for the "thumbnail"
    const css = {
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover', // Optional: Adjust the background size as needed
        backgroundPosition: 'center', // Optional: Adjust the background position as needed
      };

    return(
        <div className="itemImageContainer" style={css}>
            <div className="itemImageRemoveIcon" onClick={() => removeItemImage(src)}>X</div>
            {/* <img className="itemImage" src={src} /> */}
        </div>
    );
}

export default ImagePreviewComponent;