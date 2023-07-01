import React from 'react';
import { Figure } from 'react-bootstrap';
import a from './../img/a.png';

const ImageWithText = ({ img, description }) => {
    return (
        <Figure className='image-with-text'>
            <Figure.Image src={img} alt={description} />
            <Figure.Caption>{description}</Figure.Caption>
        </Figure>
    );
};

export default ImageWithText;
