import React, { useState } from 'react';
import { Button, Input} from '@material-ui/core';
import firebase from 'firebase';
import {db, storage} from './firebase';
import './ImageUpload.css';


const ImageUpload = ({username}) => {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');

    const handleChange = (e)=>{
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    };

    const handleUplaod = ()=>{
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        //access the storage in firebase get reference to this folder, image name is 
        //basically the file name we selected .put is putting image we grab into that point.
        uploadTask.on(
            "state_changed",
            (snapshot) =>{
                //progress function
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgress(progress);
            },
            (error)=>{
                //error function
                console.log(error);
                alert(error.message);
            },
            ()=> {
                //complete function...
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then((url) =>{
                        setUrl(url);
                        //post image inside database
                        db.collection("posts").add({

                            imageUrl: url,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            username:username
                         });
                        setProgress(0);
                        setCaption('');
                        setImage(null);
                       
                    });
            }
        )
    }

  return (
    <div className="imageupload">

      {/* i want to have */}
      {/* Caption Input */}
      {/* File Picker */}
      {/* Post Button */}

    <progress className="imageupload_progress" value={progress} max='100'></progress>
    <Input type="text" value={caption} placeholder="Enter a Caption..." 
    onChange={(event) =>setCaption(event.target.value)}/>
    <input type="file" onChange={handleChange}/>
    <Button className="imageupload_button" onClick={handleUplaod}>Upload</Button>

    </div>
  )
}

export default ImageUpload
