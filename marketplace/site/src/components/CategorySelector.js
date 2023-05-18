import React from 'react';

import "./css/CategorySelector.css";

//takes in the image url and the function to be able to remove the (current) image (aka removing itself)
function CategorySelector({categoryStack, navigateTo}) {

    /* 
    
    Note:

    - I am always rendering the top of the stack, that is the key to this whole component
    - onclick will navigate to it's own child 
    - display the current label
    
    */

    console.log(categoryStack[categoryStack.length - 1]);
   
    return(
        <div>
            {
                //get the top of the stack & create the rows
                categoryStack[categoryStack.length - 1]?.map(category => 
                    //only add the onclick if there are children
                    <div key={category["id"]} className="categoryRow" onClick={() => category["children"].length > 0 ? navigateTo(category["id"]) : null}>
                        
                        {/* display the label */}
                        {category["label"]}
                    
                        {
                        /* only display the next arrow if there are children */
                        
                        category["children"].length > 0 ? <div className="nextArrow">&#8594;</div> : <></>

                        }

                    </div>
                )
            }
        </div>
    );
}

export default CategorySelector;