'use client'

import React, { useState, useEffect } from 'react'
import { Button, Spacer, Card, CardBody } from '@nextui-org/react'
import axios from 'axios'
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import VerifyLocation from '@/components/VerifyLocation';
import { message } from 'antd';
import TrackAmbulance  from '@/components/patient/TrackAmbulance';



function Page({ params }: { params: any }) {
    const { requestId } = params
    return (
        <div style={{padding: '20px'}}>
            <TrackAmbulance requestId={requestId} />
        </div>
    )
}

export default Page
