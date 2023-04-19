import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from "next/router";
// import axios from 'axios';
import { imageContext } from '@/context/Context';

const CardId = () => {
    const [images] = useContext(imageContext);
    const [image, setImage] = useState('');
    const router = useRouter()
    // console.log(router);
    const { id } = router.query;

    const getImage = async () => {
        // const { data } = await axios.get(`https://picsum.photos/id/${id}/info`);

        const filteredImage = images.filter((i) => i.id === id)[0];
        // setImage(filteredImage[0]);
        setImage(filteredImage);
    };

    useEffect(() => {
        getImage();
    }, [])

    // console.log(image);

    return image ? (
        <div className='container p-5 mt-5'>
            <button className='btn btn-dark mb-5 shadow-lg' onClick={() => router.push('/')}>
                ❌
            </button>
            <div className="card shadow-lg" style={{ width: "18rem" }}>
                <img src={image.download_url} className="card-img-top" alt={image.author} />
                <div className="card-body">
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p>{image.author}</p>
                </div>
            </div>
        </div>
    ) : (
        <img src="/loading.gif" alt="err.." />
    )
};

export default CardId;