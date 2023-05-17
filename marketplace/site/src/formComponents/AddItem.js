import React, {useCallback, useState} from 'react';

import "./css/AddItem.css";
import { useForm } from "react-hook-form";

function AddItem() {

    //binary image data state
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

    //JSX
    return (
        <div>

            {/* image selector */}
            <div>
                <form runat="server">
                    <input accept="image/*" type='file' id="addImageInput" onChange={addItemImage} />
                </form>
                {/* display the actual images */}
                <div>
                    {/* bootstrap container column */}
                    <div className="container">
                        <div className="row">
                            {
                                /* the images will actually be stored in bootstrap columns... */
                                imageSources.map((data, index) => (
                                    <div className="col-4">
                                    <img className="itemImage" key={`item_image_${index}`} src={data} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* item form (text fields) */}
            <form onSubmit={handleSubmit(submitItem)}>
                <label className="headerLabel">Title</label>
                <input {...register("title")} id="title" required></input>

                <label className="headerLabel">Details</label>

                <label>Condition</label>
                <input {...register("condition")} id="condition" required></input>
                <label>Color</label>
                <input {...register("color")} id="color" required></input>
                <label>Material</label>
                <input {...register("material")} id="material"></input>
                
                <label className="headerLabel">Description</label>
                <textarea {...register("description")} id="description"></textarea>
                
                <label className="headerLabel">Location</label>
                <input {...register("location")} id="location" required></input>

                <input type="submit" value="Add Item"></input>

            </form>

        </div>
    );

}

export default AddItem;