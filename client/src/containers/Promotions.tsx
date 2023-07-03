import React from 'react';
import ImageWithText from '../components/ImageWithText.tsx';
import { promotionsData } from '../data/promotions.js';
import { SelectionData } from '../App.tsx';

type PromotionsProps = {
    setTrip: (from: SelectionData, to: SelectionData) => void;
};

const Promotions: React.FC<PromotionsProps> = ({ setTrip }) => {
    return (
        <div className='promotions grid-container'>
            {promotionsData.map((el) => (
                <div
                    className='grid-item'
                    onClick={() => setTrip(el.code_departure, el.code_arrival)}
                    key={
                        el.code_departure?.value + '-' + el.code_arrival?.value
                    }
                >
                    <ImageWithText description={el.trip} img={el.img} />
                </div>
            ))}
        </div>
    );
};

export default Promotions;
