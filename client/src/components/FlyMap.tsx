// @ts-nocheck

import { dynamicApiKey } from '../utils/secret.ts';
import {
    GoogleMap,
    LoadScript,
    Marker,
    InfoWindow,
} from '@react-google-maps/api';
import { useState } from 'react';

function FlyMap() {
    const position = {
        lat: -3.745,
        lng: -38.523,
    };

    const containerStyle = {
        height: '350px',
    };

    const [activeMarker, setActiveMarker] = useState<any>(null);

    const handleActiveMarker = (marker: any) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };

    const handleOnLoad = (map: google.maps.Map<Element>) => {
        const bounds = new google.maps.LatLngBounds();
        // markers.forEach(({ position }) => bounds.extend(position));
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
