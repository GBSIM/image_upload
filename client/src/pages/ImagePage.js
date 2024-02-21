import '../index.css';
import React, { useContext, useEffect, useState } from 'react';
import "react-toastify/dist/ReactToastify.css";
import { useParams } from 'react-router-dom';
import { ImageContext } from '../context/ImageContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ImagePage = () => {
    const navigate = useNavigate();
    const { imageId } = useParams();
    const { images, myImages, setImages, setMyImages } = useContext(ImageContext);
    const [ isLiked, setIsLiked ] = useState(false);
    const [me] = useContext(AuthContext);

    const image = 
        images.find(image => image._id === imageId) || 
        myImages.find(image => image._id === imageId);

    useEffect(() => {
        if (me && image && image.likes.includes(me.userId)) {
            setIsLiked(true);
        }
    },[me, image])

    const updateImage = (images,image) => (
        [...images.filter((image) => image._id !== imageId), image].sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    );

    const onSubmit = async() => {
        const result = await axios.patch(`/images/${imageId}/${isLiked? "unlike": "like"}`);
        if (result.data.public) {
            setImages(updateImage(images,result.data));
        } else {
            setMyImages(updateImage(myImages,result.data));
        }
        setIsLiked(!isLiked);
    }

    const deleteHandler = async() => {
        try {
            if (window.confirm("정말 해당 이미지를 삭제하시겠습니까?")) {
                const result = await axios.delete(`/images/${imageId}`);
                toast.success(result.data.message);
                setImages(images.filter(image=>image._id!==imageId));
                setMyImages(myImages.filter(image=>image._id!==imageId));
                navigate('/');
            } else {
                return;
            }
        } catch(err) {
            toast.error(err.message);
        }
    }

    if (!image) return <h3>Loading ... </h3>
    return (
        <div className='app'>
            <h2>사진 - {imageId}</h2> 
            <img style={{width: '100%', maxWidth:'800px'}} alt={imageId} src={`http://localhost:4000/uploads/${image.key}`}></img>
            <div style={{width:'100%',display:'flex',flexDirection:'row',maxWidth:'800px',justifyContent:'space-between',marginTop:'10px'}}>
                <span>좋아요 {image.likes.length}</span>
                <div style={{display:'flex',flexDirection:'row',columnGap:'5px'}}>
                    {isLiked ? <button onClick={onSubmit}>좋아요 취소</button>: <button onClick={onSubmit}>좋아요</button>}
                    {me && image.user._id === me.userId && <button onClick={deleteHandler}>삭제하기</button>}
                </div>
            </div>
        </div>
    )
}

export default ImagePage;