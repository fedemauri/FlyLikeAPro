import React, { useState } from 'react';
import { Figure } from 'react-bootstrap';
import a from './../img/a.png';

const ImageWithText = ({ img, description }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <Figure className='image-with-text'>
            <Figure.Image
                src={img}
                alt={description}
                onLoad={() => setIsLoading(false)}
            />
            <Figure.Caption className={isLoading ? 'd-none' : ''}>
                {description}
            </Figure.Caption>
        </Figure>
    );
};

export default ImageWithText;
