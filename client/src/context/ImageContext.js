import React, {createContext, useState, useEffect, useContext} from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const ImageContext = createContext();

const ImageProvider = (prop) => {
    const [images,setImages] = useState([]);
    const [myImages, setMyImages] = useState([]);
    const [me] = useContext(AuthContext);
    const [isPublic, setIsPublic] = useState(true);

    useEffect(() => {
        axios.get("/images").then((res) => {
            setImages(res.data);
        }).catch(err => {
            console.log(err);
        })
    },[]);

    useEffect(() => {
        if (me) {
            setTimeout(() => {
                axios.get("/users/me/images").then((res) => {
                    setMyImages(res.data);
                }).catch(err => {
                    console.log(err);
                })
            }, 0)
        } else {
            setMyImages([]);
            setIsPublic(true);
        }
    }, [me])

    return (
        <ImageContext.Provider value={{images,setImages,myImages,setMyImages,isPublic,setIsPublic}}>
            {prop.children}    
        </ImageContext.Provider>
    )   
}

export default ImageProvider;