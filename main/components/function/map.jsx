"use client";

import { useState, useEffect } from "react";
import { Map as MapLibreMap, NavigationControl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { OlaMaps } from "../OlaMapsWebSDK/olamaps-js-sdk.es";
import polyline from 'polyline';
import "../../../main/map.css";
// 88.5,22.5;88.6,22.6
const COORDS = [
    { longitude: 88.5, latitude: 22.5 },
    { longitude: 88.6, latitude: 22.6 },
]

export default function MapComponent({ height = "100%", width = "100%", theme = "light", coords = COORDS }) {
    const color = theme === "light" ? "#2400ff" : "#32cd32";

    const [mapReady, setMapReady] = useState(false);
    if (coords.length < 2) {
        coords = COORDS;
    }

    useEffect(() => {
        if (!mapReady) return;
        const olaMaps = new OlaMaps({
            apiKey: 'G5RJX7p2Bfa2UWJuE73IcyfNokde0j4V9LaoPB9t',
        })
        const map = olaMaps.init({
            container: "central-map",
            center: [(coords[0]['longitude'] + coords[1]['longitude']) / 2, (coords[0]['latitude'] + coords[1]['latitude']) / 2],
            // zoom: 13,
            style: `https://api.olamaps.io/tiles/vector/v1/styles/default-${theme}-standard/style.json`,
            transformRequest: (url, resourceType) => {
                if (url.includes("?")) {
                    url += "&api_key=G5RJX7p2Bfa2UWJuE73IcyfNokde0j4V9LaoPB9t";
                } else {
                    url += "?api_key=G5RJX7p2Bfa2UWJuE73IcyfNokde0j4V9LaoPB9t";
                }
                return { url, resourceType };
            },
        });
        const latitudes = coords.map(coord => coord.latitude);
        const longitudes = coords.map(coord => coord.longitude);

        const bounds = [
            [Math.min(...longitudes), Math.min(...latitudes)], // Southwest corner
            [Math.max(...longitudes), Math.max(...latitudes)]  // Northeast corner
        ];

        // Fit the bounds to the map
        map.fitBounds(bounds, { padding: 50 });
        // navigator.geolocation.getCurrentPosition((position) => {
        //     const { longitude, latitude } = position.coords;
        //     map.setCenter([longitude, latitude]);
        //     olaMaps
        //         .addMarker({ offset: [0, 0], anchor: "bottom" })
        //         .setLngLat([longitude, latitude])
        //         .addTo(map);
        // });
        // coords.forEach(({ longitude, latitude }) => {
        //     olaMaps
        //         .addMarker({ offset: [0, 0], anchor: "bottom" })
        //         .setLngLat([longitude, latitude])
        //         .addTo(map);
        // });

        const destinationPopup = olaMaps.addPopup({ offset: [0, -30], anchor: 'bottom' }).setHTML(`<div class="text-black">Destination</div>`)
        const popup = olaMaps.addPopup({ offset: [0, -30], anchor: 'bottom' }).setHTML(`<div class="text-black">Your current location</div>`)

        olaMaps
            .addMarker({ offset: [0, 0], anchor: "bottom" })
            .setLngLat([coords[0].longitude, coords[0].latitude])
            .setPopup(popup)
            .addTo(map);

        olaMaps
            .addMarker({ offset: [0, 0], anchor: "bottom", color: 'red' })
            .setLngLat([coords[1].longitude, coords[1].latitude])
            .setPopup(destinationPopup)
            .addTo(map);

        const fetchRoute = async () => {
            // const url = `http://dev.virtualearth.net/REST/v1/Routes?wayPoint.1=${coords[0].latitude},${coords[0].longitude}&wayPoint.2=${coords[1].latitude},${coords[1].longitude}&tolerances=0.0000000001&travelMode=Walking&key=${bingMapsKey}`;
            const url = `https://cors-anywhere.herokuapp.com/https://apis.mappls.com/advancedmaps/v1/a8e4b0b63dc2437172bbaa15902abbda/route_adv/driving/${coords[0].longitude},${coords[0].latitude};${coords[1].longitude},${coords[1].latitude}?geometries=polyline&rtype=0&steps=true&region=IND&overview=full`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            });
            const data = await response.json();
            if (data.routes && data.routes.length > 0) {
                const route = data.routes[0];
                const encodedPolyline = route.geometry;

                // Decode the polyline
                const coordinates = polyline.decode(encodedPolyline).map(coord => [coord[1], coord[0]]);

                // Draw the route on the map
                map.addLayer({
                    id: 'route',
                    type: 'line',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'FeatureCollection',
                            features: [
                                {
                                    type: 'Feature',
                                    geometry: {
                                        type: 'LineString',
                                        coordinates: coordinates
                                    },
                                },
                            ],
                        },
                    },
                    layout: {},
                    paint: {
                        'line-color': color,
                        'line-width': 5,
                        'line-opacity': 1,
                        'line-blur': 4,
                    },
                });
            }
        };

        if (coords.length >= 2) {
            fetchRoute();
        }
        const nav = new NavigationControl({
            visualizePitch: true,
        });
        map.addControl(nav, "top-left");

        return () => {
            map.remove();
        };
    }, [mapReady, theme]);

    return (
        <div
            style={{ width, height, overflow: "hidden" }}
            ref={() => setMapReady(true)}
            id="central-map"
        />
    );
}