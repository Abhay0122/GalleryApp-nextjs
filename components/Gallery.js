import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import ReactPaginate from 'react-paginate';
import Link from 'next/link';
import { imageContext } from '@/context/Context';

const Gallery = () => {
    const [images, setimages] = useContext(imageContext);
    const [pageCount, setpageCount] = useState(null);

    const getImages = async () => {
        const { data } = await axios.get(`https://picsum.photos/v2/list?page=${pageCount}&limit=8`)
        // console.log(data);
        setimages(data);
    };

    useEffect(() => {
        getImages();
    }, [pageCount])

    const handlePageClick = (e) => {
        setpageCount(e.selected + 1);
    };

    return (
        <>
            <h1 className='mb-4 mt-5 text-center fw-light'>Gallery App</h1>
            <div className='container bg-light p-4 mb-5 d-flex justify-content-center align-items-center flex-wrap'>
                {images ? (images.map((img, idx) => (
                    <div key={img.id} className='card me-3 mb-3'>
                        <img height={100} width={250} src={img.download_url} alt={img.author} />
                        <Link className='text-decoration-none text-dark' href={`/card/${img.id}`}>
                            <p className='p-1 text-center'>{img.author}</p>
                        </Link>
                    </div>
                ))) : (<div>
                    <img src='/loading.gif' alt='loader err...' />
                </div>)}
            </div>
            {/* pagination */}

            <ReactPaginate
                nextLabel="next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={10}
                previousLabel="prev"
                renderOnZeroPageCount={null}
            />
            {/*  */}
        </>
    )
}

export default Gallery;