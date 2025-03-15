"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { Button, Spacer, Card, CardBody } from "@nextui-org/react";
import { LatLngExpression } from "leaflet";
import createAxiosInstance from "@/context/axiosInstance";
import L from "leaflet";
import VerifyLocation from "../VerifyLocation";
import { Tooltip } from "react-leaflet";

// Fix for missing marker icons
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "/leaflet/marker-icon-2x.png",
    iconUrl: "/leaflet/marker-icon.png",
    shadowUrl: "/leaflet/marker-shadow.png",
});


// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });
const Polyline = dynamic(() => import("react-leaflet").then((mod) => mod.Polyline), { ssr: false });



function TrackAmbulance({requestId} : {requestId:any}) {
    const [ambulanceData, setAmbulanceData] = useState<{ location: LatLngExpression | null; distance: string }>({
        location: null,
        distance: "",
    });
    const [data, setData] = useState({
        ambulanceLocation: {
            address: '',
        },
        patientLocation: {
            address: ''
        }
    })
    console.log("Request id", requestId);
    const [patientLocation, setPatientLocation] = useState<LatLngExpression | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const axiosInstance = createAxiosInstance();

    useEffect(() => {
        VerifyLocation()
            .then((l: any) => setPatientLocation(l))
            .catch((err) => alert(err.message));
        // console.log("Patient location",patientLocation);
    }, [])

    // Fetch ambulance data
    const fetchAmbulanceData = async () => {
        // const requestId = "145a5497-f6e1-47b6-9c44-5b1e04076e7e"

        if (!requestId) {
            setError("Request ID is missing.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.get(`/ambulance/trackambulance/${requestId}`)

            setData(response.data);

            const { ambulanceLocation, patientLocation, distance } = response.data;

            if (!ambulanceLocation || !patientLocation || !distance) {
                throw new Error("Invalid data received from the server");
            }

            setAmbulanceData({
                location: [ambulanceLocation.latitude, ambulanceLocation.longitude],
                distance,
            });
        } catch (error) {
            console.error("Error fetching ambulance data", error);
            setError("Failed to fetch ambulance data. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const interval = setInterval(() => {
            if (patientLocation) {
                fetchAmbulanceData
            }
        }, 10000);

        return (() => clearInterval(interval))
    }, [])

    return (
        <div style={{ padding: "20px" }}>
            <Card>
                <CardBody>
                    <h3>Track Ambulance</h3>
                    <Spacer y={1} />
                    <Button color="primary" onPress={fetchAmbulanceData} disabled={loading}>
                        {loading ? "Loading..." : "Refresh"}
                    </Button>
                    <Spacer y={1.5} className="mt-3" />
                    {ambulanceData.distance && (
                        <>
                            <p className="mt-3">
                                <strong>Distance :</strong>  {ambulanceData.distance}
                            </p>

                        </>
                    )}
                    {data.ambulanceLocation.address && (
                        <p className="mt-3">
                            <strong>Ambulance Location :</strong>  {data.ambulanceLocation.address}
                        </p>
                    )}
                    {data.patientLocation.address && (
                        <p className="mt-3">
                            <strong>Your Location :</strong> {data.patientLocation.address}
                        </p>
                    )}
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </CardBody>
            </Card>
            <Spacer y={2} />

            <MapContainer
                style={{ width: "100%", height: "500px" }}
                center={patientLocation || [0, 0]}
                zoom={5}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {ambulanceData.location && (
                    <Marker position={ambulanceData.location}>
                        <Tooltip>Ambulance Location</Tooltip>
                    </Marker>
                )}

                {patientLocation && (
                    <Marker position={patientLocation}>
                        <Tooltip>Your Location</Tooltip>
                    </Marker>
                )}

                {ambulanceData.location && patientLocation && (
                    <Polyline positions={[patientLocation, ambulanceData.location]} pathOptions={{ color: "blue" }} />
                )}
            </MapContainer>
        </div>
    )
}

export default TrackAmbulance
