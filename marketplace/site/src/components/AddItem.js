import React, {useState} from 'react';

import "./css/AddItem.css";
import { useForm } from "react-hook-form";

// import Button from 'react-bootstrap/Button'

//import the category selector component
import CategorySelector from './CategorySelector';

//import the image preview component
import ImagePreviewComponent from './ImagePreviewComponent';

function AddItem() {

    //store the actual image object
    const [imageObjects, setImageObjects] = useState([]);

    //ASYNC form handling state
    const { register, handleSubmit } = useForm();

    //submit the form
    const submitItem = (data) =>{

        /* 
        
        Note to self:

        I am using the hook to handle when the form is submitted

        I then create a FormData() object and append all the inputs to it

        Then I post it
        
        */

        const formData = new FormData();

        //Note: you MUST append files like this...
        imageObjects.forEach((file, index) => {
            //why on earth do i need to specify a filename??
            const fileBlob = new Blob([file], { type: file.type });
            formData.append("images[]", fileBlob, file.name);
        });

        formData.append("category", selectedCategory);
        formData.append("title", data.title);
        formData.append("price", data.price);
        formData.append("brand", data.brand);
        formData.append("condition", data.condition);
        formData.append("description", data.description);

        //create post request
        const itemPostRequest = {
            method: 'POST',
            body: formData
        };

        console.log(formData);

        //post the data and get the response
        fetch('http://localhost:3001/addItem', itemPostRequest)
        .then(response => response.json())
        .then(data => console.log(data));

    }

    //add item image
    function addItemImage(event){
        
        //get the "first" file with [] notation
        const [file] = document.getElementById("addImageInput").files;
    
        setImageObjects([...imageObjects, file]);
    }

    //remove item from the state
    function removeItemImage(name){
        //filter to allow all image sources that are not equal to the one to be deleted.
        setImageObjects((imageObjects) =>
            imageObjects.filter((object) => object.name !== name));
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

    //maintain the selected category
    const [selectedCategory, setSelectedCategory] = useState("");

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
            if(top[i]["id"] === id){
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
        if(top[0].id === '1'){
            return true;
        }
        return false;
    }

    //set the selected category
    function selectCategory(label){
        //set the state
        setSelectedCategory(label);
        //remove everything from the category stack
        var copy = [...categoryStack];
        copy.length = 1;
        setCategoryStack(copy);
    }

    return (
        <div className="parentContainer">

            <h1>Item For Sale</h1>
            <hr></hr>

            <h2>Photos</h2>

            {/* image selector */}
            <div>

                <form>
                    <label className="custom-file-upload btn btn-outline-dark">
                        ADD IMAGE
                        <input accept="image/*" type='file' id="addImageInput" onChange={addItemImage} />
                    </label>
                </form>

                {/* show the number of images selected (maximum 10) */}
                <p>{imageObjects.length} / 10 selected</p>
                
                {/* display the actual images (conditional rendering) */}
                {imageObjects.length === 0 ? null : (

                    <div>
                        {/* bootstrap container column */}
                        <div className="container imagesContainer">
                            <div className="row">
                                {
                                    /* the images will actually be stored in bootstrap columns... */
                                    imageObjects.map((data, index) => (
                                        <div className="col-3 imageCol">
                                            <ImagePreviewComponent key={"thumbnail" + index} imageObject={data} removeItemImage={removeItemImage} />
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
            <form onSubmit={handleSubmit(submitItem)} className="itemDetailsForm" encType="multipart/form-data">

                <div className="fieldContainer">
                    <input className="form-control" {...register("title")} id="title" placeholder="Title" required></input>
                </div>
                
                <div className="fieldContainer">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">$</span>
                        </div>
                        <input {...register("price")} type="number" className="form-control" placeholder="Amount (to the nearest dollar)" />
                        <div className="input-group-append">
                            <span className="input-group-text">.00</span>
                        </div>
                    </div>
                </div>
                
                <label><strong>Select a Category</strong></label>

                <div className="fieldContainer">
                    <p>Selected: {selectedCategory !== "" ? selectedCategory : <i>No Category Selected</i>}</p>
                    {selectedCategory !== "" ? <div className="removeCategoryButton" onClick={() => setSelectedCategory("")}>X</div> : <></>}
                </div>
                

                <div className="fieldContainer categorySelectorContainer">
                    {/* display what is currently selected */}
                    {/* back button */}
                    {
                        !atRoot() ? <div className="backButton" onClick={() => navigateBack()}>&#8592; Back</div> : <></>
                    }
                    {/* scrollable selector */}
                    <div className="categorySelector">
                        <CategorySelector categoryStack={categoryStack} navigateBack={navigateBack} navigateTo={navigateTo} selectCategory={selectCategory} />
                    </div>
                </div>
                
                <div className="fieldContainer">
                    <select className="form-select" {...register("condition")} placeholder="Condition" defaultValue="Condition" required>
                        <option value="new">New</option>
                        <option value="used-like-new">Used - Like New</option>
                        <option value="used-good">Used - Good</option>
                        <option value="used-fair">Used - Fair</option>
                    </select>
                </div>

                <label><strong>More Details</strong></label>
                <p>Attract more interest by including more details</p>

                <div className="fieldContainer">
                    <input className="form-control" {...register("brand")} id="brand" placeholder="Brand Name" required></input>
                </div>

                <div className="fieldContainer">
                    <textarea className="form-control" placeholder="Description" {...register("description")}></textarea>
                </div>

                <div className="fieldContainer">
                Marketplace items are public and can be seen by anyone.
                Items like animals, drugs, weapons, counterfeits, and other items that infringe intellectual property aren't allowed on Marketplace. 
                See our Commerce Policies.
                </div>

                <input className="btn btn-outline-dark submitItem" type="submit" value="Publish Item"></input>

            </form>

        </div>
    );

}

export default AddItem;