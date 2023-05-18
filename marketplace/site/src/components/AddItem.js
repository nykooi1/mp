import React, {useCallback, useState} from 'react';

import "./css/AddItem.css";
import { useForm } from "react-hook-form";

import Button from 'react-bootstrap/Button'

//import the category selector component
import CategorySelector from './CategorySelector';

//import the image preview component
import ImagePreviewComponent from './ImagePreviewComponent';

function AddItem() {

    //store image urls
    const [imageSources, setImageSources] = useState([]);

    //ASYNC form handling state
    const { register, handleSubmit } = useForm();

    //submit the form
    const submitItem = (formData) =>{
        
        //debug
        console.log(formData);

        //create post request
        const itemPostRequest = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        };

        //post the data and get the response
        fetch('http://localhost:3001/addItem', itemPostRequest)
        .then(response => response.json())
        .then(data => console.log(data));

    }

    //add item image
    function addItemImage(event){
        const [file] = document.getElementById("addImageInput").files;
        if (file) {
            var url = URL.createObjectURL(file);
            console.log(url);
            setImageSources([...imageSources, url]);
        }
    }

    //remove item from the state
    function removeItemImage(url){
        //filter to allow all image sources that are not equal to the one to be deleted.
        setImageSources((imageSources) =>
            imageSources.filter((source) => source !== url));
    }
    
    /* 

    ===== Category Selector Functionality: =====
    
    Goal: 
        Track how far down I have gone into the object using a state and be able to backtrace

    Implementation:
    
        In order to do this I will use a "stack" and just render the last elements in the stack every time.
        When navigating back simply remove the top from the stack.

    ==========
    
    */

    //category object
    const categoryOptions = [
        { id: '1', label: 'Antiques & Collectibles', children: [] },
        {
        id: '2',
        label: 'Arts & Crafts',
        children: [
            { id: '2-1', label: 'Men', children: [

                { id: '2-1-1', label: 'Tops', children: [] },
                { id: '2-1-2', label: 'Bottoms', children: [] },
                { id: '2-1-3', label: 'Shoes', children: [] }

            ]},
            { id: '2-2', label: 'Women', children: [] },
        ],
        },
        {
        id: '3',
        label: 'Auto Parts & Accessories',
        children: [
            { id: '3-1', label: 'Furniture', children: [] },
            { id: '3-2', label: 'Decor', children: [] },
        ],
        },
        { id: '4', label: 'Baby Products', children: [] },
        { id: '5', label: 'Books Movies & Music', children: [] },
        { id: '6', label: 'Cell Phones & Accessories', children: [] },
        { id: '7', label: 'Electronics', children: [] },
        { id: '8', label: 'Furniture', children: [] },
        { id: '9', label: 'Health & Beauty', children: [] },
        { id: '10', label: 'Home & Kitchen', children: [] },
        { id: '11', label: 'Jewelry & Watches', children: [] },
        { id: '12', label: 'Miscellaneous', children: [] },
        { id: '13', label: 'Musical Instruments', children: [] },
        { id: '14', label: 'Office Supplies', children: [] },
        { id: '15', label: 'Patio & Garden', children: [] },
        { id: '16', label: 'Pet Supplies', children: [] },
        { id: '17', label: 'Sporting Goods', children: [] },
        { id: '18', label: 'Tools & Home Improvement', children: [] },
        { id: '19', label: 'Toys & Games', children: [] },
        { id: '20', label: 'Travel & Luggage', children: [] },
        { id: '21', label: 'Video Games & Consoles', children: [] },
    ];

    //keep track of the categories you have navigated to...
    //initially push the entire thing so that I am looping through the highest level
    const [categoryStack, setCategoryStack] = useState([categoryOptions]);

    //function to handle navigation back to the parent object
    function navigateBack(){

        //if there is a child, then remove it
        if(categoryStack.length > 1){
            //make a copy of the state
            var copy = [...categoryStack];
            copy.pop();
            //update the state
            setCategoryStack(copy);
        }

    }

    //function to handle navigation to nested objects
    function navigateTo(id) {

        //get the top of the stack
        var top = categoryStack[categoryStack.length - 1];

        console.log("navigate to: " + id);

        //save the child
        var child;

        //find the child object from the id
        for(var i = 0; i < top.length; i++){
            if(top[i]["id"] == id){
                child = top[i]["children"];
            }
        }
        
        //push the child onto the stack
        setCategoryStack([...categoryStack, child]);

    }

    //function to check if you are at the root
    function atRoot(){
        //get the top of the stack
        var top = categoryStack[categoryStack.length - 1];
        if(top[0].id == '1'){
            return true;
        }
        return false;
    }

    return (
        <div className="parentContainer">

            <h1>Item For Sale</h1>
            <hr></hr>

            <h2>Photos</h2>

            {/* image selector */}
            <div>

                <form runat="server">
                    <label className="custom-file-upload btn btn-outline-dark">
                        ADD IMAGE
                        <input accept="image/*" type='file' id="addImageInput" onChange={addItemImage} />
                    </label>
                </form>

                {/* show the number of images selected (maximum 10) */}
                <p>{imageSources.length} / 10 selected</p>
                
                {/* display the actual images (conditional rendering) */}
                {imageSources.length === 0 ? null : (

                    <div>
                        {/* bootstrap container column */}
                        <div className="container imagesContainer">
                            <div className="row">
                                {
                                    /* the images will actually be stored in bootstrap columns... */
                                    imageSources.map((data, index) => (
                                        <div className="col-3 imageCol">
                                            <ImagePreviewComponent src={data} removeItemImage={removeItemImage} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                )}

            </div>

            <hr></hr>

            <h2>Required</h2>
            <p>Be as descriptive as possible.</p>

            {/* item form (text fields) */}
            <form onSubmit={handleSubmit(submitItem)} className="itemDetailsForm">

                <div className="fieldContainer">
                    <input {...register("title")} id="title" placeholder="Title" required></input>
                </div>
                
                <div className="fieldContainer">
                    <input {...register("price")} id="price" placeholder="Price" required></input>
                </div>
                
                <label>Select a Category</label>

                <p>Selected:</p>

                <div className="fieldContainer categorySelectorContainer">
                    {/* display what is currently selected */}
                    {/* back button */}
                    {
                        !atRoot() ? <div className="backButton" onClick={() => navigateBack()}>&#8592; Back</div> : <></>
                    }
                    {/* scrollable selector */}
                    <div className="categorySelector">
                        <CategorySelector categoryStack={categoryStack} navigateBack={navigateBack} navigateTo={navigateTo} />
                    </div>
                </div>
                
                <div className="fieldContainer">
                    <select {...register("condition")} placeholder="Condition" defaultValue="Condition" required>
                        <option value="new">New</option>
                        <option value="used-like-new">Used - Like New</option>
                        <option value="used-good">Used - Good</option>
                        <option value="used-fair">Used - Fair</option>
                    </select>
                </div>

                <input className="btn btn-outline-dark submitItem" type="submit" value="Add Item"></input>

            </form>

        </div>
    );

}

export default AddItem;