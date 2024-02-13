import React, { useState } from "react";
import { toast } from "react-toastify";
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
            toast.success("이미지 업로드에 성공하였습니다.");
        } catch(err) {
            alert("Fail !!");
            console.error(err);
            toast.error("Fail !!");
        }
    }

    return (
        <form className="upload-form" onSubmit={submitHandler}>
            <div className="upload-form-box">
                <span className="upload-form-box-file-name">{fileName}</span>
                <input id="image" type="file" onChange={imageSelectHandler}/>
            </div>
            <button className="upload-form-submit-button" type="submit">제출하기</button>
        </form>
    )
}

export default UploadForm;