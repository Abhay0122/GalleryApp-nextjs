import React, { createContext, useState } from 'react';

export const imageContext = createContext(null);

const Context = (props) => {
    const [images, setimages] = useState([]);

    return (
        <imageContext.Provider value={[images, setimages]}>
            {props.children}
        </imageContext.Provider>
    )
}

export default Context;