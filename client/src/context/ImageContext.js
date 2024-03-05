import React, {createContext, useState, useEffect, useContext} from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const ImageContext = createContext();

const ImageProvider = (prop) => {
    const [images,setImages] = useState([]);
    const [myImages, setMyImages] = useState([]);
    const [me] = useContext(AuthContext);
    const [isPublic, setIsPublic] = useState(true);
    const [imageUrl, setImageUrl] = useState("/images");

    useEffect(() => {
        axios.get(imageUrl).then((res) => {
            console.log("a");
            setImages((prevData) => [... prevData, ... res.data]);
        }).catch(err => {
            console.log(err);
        })
    }, [imageUrl]);

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

    const loaderMoreImages = () => {
        if (images.legnth === 0) return;
        const lastImageId = images[images.length-1]._id;
        setImageUrl(`/images?lastid=${lastImageId}`);
    }

    return (
        <ImageContext.Provider value={{images,setImages,myImages,setMyImages,isPublic,setIsPublic,loaderMoreImages}}>
            {prop.children}    
        </ImageContext.Provider>
    )   
}

export default ImageProvider;