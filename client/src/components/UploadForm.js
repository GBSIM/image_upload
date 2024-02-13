import React, { useState } from "react";
import './UploadForm.css';
import axios from "axios";

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("이미지 파일을 업로드해주세요.");

    const imageSelectHandler = (event) => {
        const imageFile = event.target.files[0];
        setFile(imageFile);
        setFileName(imageFile.name);
    }

    const submitHandler = async(event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("image", file);
        try {
            const res = await axios.post('/upload', formData, {
                headers: {"Content-Type": "multipart/form-data"}
            });
            console.log({ res });
        } catch(err) {
            alert("Fail !!");
            console.error(err);
        }
    }

    return (
        <form className="upload-form" onSubmit={submitHandler}>
            <label htmlFor="image">{fileName}</label>
            <input id="image" type="file" onChange={imageSelectHandler}/>
            <button type="submit">제출하기</button>
        </form>
    )
}

export default UploadForm;