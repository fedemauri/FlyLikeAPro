import ImageWithText from '../components/ImageWithText.tsx';
import { promotions } from '../data/promotions.js';

const Promotions = ({ setTrip }) => {
    return (
        <div class='promotions grid-container'>
            {promotions.map((el) => (
                <div
                    class='grid-item'
                    onClick={() => setTrip(el.code_departure, el.code_arrival)}
                >
                    <ImageWithText description={el.trip} img={el.img} />
                </div>
            ))}
        </div>
    );
};

export default Promotions;
