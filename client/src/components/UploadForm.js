import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import './UploadForm.css';
import axios from "axios";
import ProgressBar from "./ProgressBar";
import { ImageContext } from "../context/ImageContext";

const UploadForm = () => {
    const [files, setFiles] = useState(null);
    const [fileName, setFileName] = useState("이미지 파일을 업로드해주세요.");
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const {images, setImages, myImages, setMyImages} = useContext(ImageContext);
    const [isPublic, setIsPublic] = useState(true);
    const [previews, setPreviews] = useState([]);

    const imageSelectHandler = (event) => {
        const imageFiles = event.target.files;
        setFiles(imageFiles);

        Promise.all(
            [...imageFiles].map((imageFile) => {
                return new Promise((resolve, reject) => {
                    try {
                        const fileReader = new FileReader();
                        fileReader.readAsDataURL(imageFile);
                        fileReader.onload = e => {
                            resolve({imgSrc: e.target.result, fileName: imageFile.name});
                        }
                    } catch(err) {
                        reject(err);
                    }
                })
            })
        ).then((res) => {
            setPreviews(res);
        });

        setFileName(imageFiles[0].name);
    }

    const submitHandler = async(event) => {
        event.preventDefault();
        const formData = new FormData();
        const filesArray = [ ... files];
        filesArray.map((file) => {
            formData.append("image", file);
        })
        formData.append("public", isPublic);
        try {
            const res = await axios.post('/images', formData, {
                headers: {"Content-Type": "multipart/form-data"},
                onUploadProgress: (e) => {
                    setUploadPercentage(Math.round(e.loaded / e.total * 100));
                },
            });
            if (isPublic) {
                setImages([...images, ...res.data]);
            } else {
                setMyImages([...myImages, ...res.data]);
            }
            
            toast.success("이미지 업로드에 성공하였습니다.");
            setTimeout(() => {
                setFiles(null);
                setFileName("이미지 파일을 업로드해주세요.");
                setUploadPercentage(0);
                setPreviews([]);
            }, 3000);
        } catch(err) {
            console.error(err);
            toast.error(err.response.data.message);
        }
    }

    let InputGuide;
    if (files === null) {
        InputGuide = 
            <span className="upload-form-box-file-name">{fileName}</span>
    }

    const previewImages = previews.map((preview,index) => (
        <img 
            src={preview.imgSrc} 
            alt = "" className="upload-form-box-image"
            key={index}></img>
    ))

    return (
        <form className="upload-form" onSubmit={submitHandler}>
            <ProgressBar percentage={uploadPercentage}/>
            <div className="upload-form-box">
                {InputGuide}
                {/* <img src={imageSrc} className="upload-form-box-image"></img> */}
                <div className="upload-form-preview-images">
                    {previewImages}
                </div>
                <input id="image" type="file" multiple onChange={imageSelectHandler}/>
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