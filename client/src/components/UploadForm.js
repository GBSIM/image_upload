import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import './UploadForm.css';
import axios from "axios";
import ProgressBar from "./ProgressBar";
import { ImageContext } from "../context/ImageContext";

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("이미지 파일을 업로드해주세요.");
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [imageSrc, setImageSrc] = useState(null);
    const {images, setImages, myImages, setMyImages} = useContext(ImageContext);
    const [isPublic, setIsPublic] = useState(true);

    const imageSelectHandler = (event) => {
        const imageFile = event.target.files[0];
        setFile(imageFile);
        setFileName(imageFile.name);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(imageFile);
        fileReader.onload = e => {
            setImageSrc(e.target.result);
        }
    }

    const submitHandler = async(event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("image", file);
        formData.append("public", isPublic);
        try {
            const res = await axios.post('/images', formData, {
                headers: {"Content-Type": "multipart/form-data"},
                onUploadProgress: (e) => {
                    setUploadPercentage(Math.round(e.loaded / e.total * 100));
                },
            });
            console.log({ res });
            if (isPublic) {
                setImages([...images, res.data]);
            } else {
                setMyImages([...myImages, res.data]);
            }
            
            toast.success("이미지 업로드에 성공하였습니다.");
            setTimeout(() => {
                setFile(null);
                setFileName("이미지 파일을 업로드해주세요.");
                setUploadPercentage(0);
                setImageSrc(null);
            }, 3000);
        } catch(err) {
            console.error(err);
            toast.error(err.response.data.message);
            setImageSrc(null);
        }
    }

    let InputGuide;
    if (file === null) {
        InputGuide = 
            <span className="upload-form-box-file-name">{fileName}</span>
    }

    return (
        <form className="upload-form" onSubmit={submitHandler}>
            <ProgressBar percentage={uploadPercentage}/>
            <div className="upload-form-box">
                {InputGuide}
                <img src={imageSrc} className="upload-form-box-image"></img>
                <input id="image" type="file" onChange={imageSelectHandler}/>
            </div>
            <div className="upload-form-public-checkbox">
                <input type="checkbox" id="public-check" value={!isPublic} onChange={()=> setIsPublic(!isPublic)}/>
                <label htmlFor="public-check">비공개</label>
            </div>
            <button className="upload-form-submit-button" type="submit">제출하기</button>
        </form>
    )
}

export default UploadForm;