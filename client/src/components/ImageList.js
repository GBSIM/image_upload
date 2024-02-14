import React, { useContext } from 'react';
import { ImageContext } from './ImageContext';

import './ImageList.css';

const ImageList = () => {
    const [images] = useContext(ImageContext);
    
    const imageList = images.map(image => <img className='image' src={`http://localhost:4000/uploads/${image.key}`} key={image.key}></img>);

    return (
        <div className='image-list'>
            {imageList}
        </div>
    )
}

export default ImageList;