import React, {createContext, useState, useEffect} from "react";
import axios from "axios";

export const ImageContext = createContext();

const ImageProvider = (prop) => {
    const [images,setImages] = useState([]);

    useEffect(() => {
        axios.get("/images").then((res) => {
            setImages(res.data);
        }).catch(err => {
            console.log(err);
        })
    },[]);

    return (
        <ImageContext.Provider value={[images,setImages]}>
            {prop.children}    
        </ImageContext.Provider>
    )   
}

export default ImageProvider;