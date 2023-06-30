import { dynamicApiKey } from '../utils/secret.ts';
import {
    GoogleMap,
    LoadScript,
    Marker,
    InfoWindow,
} from '@react-google-maps/api';
import { log } from 'console';

import { useState } from 'react';

function FlyMap(
    {
        /*coordinate*/
    }
) {
    //const position = getCoordinateObj(coordinate);
    const position = {
        lat: -3.745,
        lng: -38.523,
    };

    const containerStyle = {
        height: '350px',
    };

    const [activeMarker, setActiveMarker] = useState(null);

    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };

    const handleOnLoad = (map) => {
        const bounds = new google.maps.LatLngBounds();
        markers.forEach(({ position }) => bounds.extend(position));
        map.fitBounds(bounds);
    };

    return (
        <LoadScript googleMapsApiKey={dynamicApiKey}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                onLoad={handleOnLoad}
                onClick={() => setActiveMarker(null)}
            >
                {/* {markers.map(({ id, name, position }) => (
                    <Marker
                        key={id}
                        position={position}
                        onClick={() => handleActiveMarker(id)}
                    >
                        {activeMarker === id ? (
                            <InfoWindow
                                onCloseClick={() => setActiveMarker(null)}
                            >
                                <div>{name}</div>
                            </InfoWindow>
                        ) : null}
                    </Marker>
                ))} */}
            </GoogleMap>
        </LoadScript>
    );
}

export default FlyMap;
