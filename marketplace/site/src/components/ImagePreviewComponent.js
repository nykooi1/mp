import React from 'react';

import "./css/ImagePreview.css";

//takes in the image url and the function to be able to remove the (current) image (aka removing itself)
function ImagePreviewComponent({imageObject, removeItemImage}) {

    //get url from file
    function url(file){
        var url = URL.createObjectURL(file);
        return url;
    }

    //styling for the "thumbnail"
    const css = {
        backgroundImage: `url(${url(imageObject)})`,
        backgroundSize: 'cover', // Optional: Adjust the background size as needed
        backgroundPosition: 'center', // Optional: Adjust the background position as needed
      };

    return(
        <div className="itemImageContainer" style={css}>
            <div className="itemImageRemoveIcon" onClick={() => removeItemImage(imageObject.name)}>X</div>
            {/* <img className="itemImage" src={src} /> */}
        </div>
    );
}

export default ImagePreviewComponent;