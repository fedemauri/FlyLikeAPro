import ImageWithText from '../components/ImageWithText.tsx';
import atldxb from './../img/atl-dxb.jpeg';
import atllax from './../img/atl-lax.jpeg';
import atlsyd from './../img/atl-syd.jpeg';
import atlpek from './../img/atl-pek.jpeg';

const Promotions = ({ setTrip }) => {
    const promotions = [
        {
            code_departure: {
                value: 'ATL',
                label: 'Aeroporto Internazionale di Atlanta',
            },
            code_arrival: {
                value: 'DXB',
                label: 'Aeroporto Internazionale di Dubai',
            },
            trip: 'ATL - DXB',
            img: atldxb,
        },
        {
            code_departure: {
                value: 'ATL',
                label: 'Aeroporto Internazionale di Atlanta',
            },
            code_arrival: {
                value: 'LAX',
                label: 'Aeroporto Internazionale di Los Angeles',
            },
            trip: 'ATL - LAX',
            img: atllax,
        },
        {
            code_departure: {
                value: 'ATL',
                label: 'Aeroporto Internazionale di Atlanta',
            },
            code_arrival: {
                value: 'SYD',
                label: 'Aeroporto Internazionale di Sidney',
            },
            trip: 'ATL - SYD',
            img: atlsyd,
        },
        {
            code_departure: {
                value: 'ATL',
                label: 'Aeroporto Internazionale di Atlanta',
            },
            code_arrival: {
                value: 'PEK',
                label: 'Aeroporto Internazionale di Pechino',
            },
            trip: 'ATL - PEK',
            img: atlpek,
        },
    ];

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
