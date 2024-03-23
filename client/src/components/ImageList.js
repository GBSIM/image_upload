import React, { useContext, useState } from 'react';
import { ImageContext } from '../context/ImageContext';
import { Link } from 'react-router-dom';

import './ImageList.css';
import { AuthContext } from '../context/AuthContext';

const ImageList = () => {
    const [me] = useContext(AuthContext);
    const { images, myImages, isPublic, setIsPublic, loaderMoreImages, imageError, imageLoading } = useContext(ImageContext);
    
    let imageList;
    if (isPublic) {
        imageList = images.map(image => 
        <Link to={`/images/${image._id}`} key={image._id}>
            <img className='image' src={`http://localhost:4000/uploads/${image.key}`} key={image.key}></img>
        </Link>); 
    } else {
        imageList = myImages.map(image => 
        <Link to={`/images/${image._id}`} key={image._id}>
            <img className='image' src={`http://localhost:4000/uploads/${image.key}`} key={image.key}></img>
        </Link>);
    }

    return (
        <div className='image-list'>
            <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",columnGap:"10px"}}>
                <h2>{(isPublic ? "공개" : "개인")} 사진 모음</h2>
                {me &&<button onClick={() => setIsPublic(!isPublic)}>{(isPublic ? "개인" : "공개" ) + " 사진 보기" }</button>}
            </div>
            <div className='image-list-images'>
                {imageList}
            </div>
            {imageError && <div>에러가 발생했어요.</div>}
            {imageLoading ? <div>로딩 중 ...</div> : <button onClick={() => loaderMoreImages()}>이미지 더 불러오기</button>}
        </div>
    )
}

export default ImageList;