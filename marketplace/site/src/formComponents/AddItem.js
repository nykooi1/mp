import React, {useCallback} from 'react';

import "./css/AddItem.css";
import { useForm } from "react-hook-form";

import {useDropzone} from 'react-dropzone';

function AddItem() {

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
    }, []);
    
    const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    //accepted files array
    const files = acceptedFiles.map(file => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
        </li>
      ));

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

    return (
        <div>

            {/* image dropper */}
            <div>
                <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                {
                    isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p className="dropzoneText">Drag 'n' drop some files here, or click to select files</p>
                }
                </div>
                <div>
                    <h4>Files</h4>
                    <ul>{files}</ul>
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