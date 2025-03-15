"use client"

import React from 'react'
import { Button, Card, CardBody, Input, Modal, Select, Text, ModalBody, ModalContent, ModalHeader, ModalFooter, useDisclosure } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import createAxiosInstance from "@/app/context/axiosInstance";
import { message } from 'antd';



function AppointmentForm() {
    const [openModel, setOpenModel] = useState(false);
    const [formData, setFormData] = useState({
        doctorId: '',
        schedule: '',
        reason: '',
    })
    const [doctors, setDoctors] = useState([{}])
    // console.log(doctors.firstName);

    const axiosInstance = createAxiosInstance();
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSearchDoctors = async (query) => {
        try {
            const response = await axiosInstance.get(`/doctor/search?query=${query}`)
            setDoctors(response.data);
        } catch (error) {
            console.error("Error in fetching doctors", error);
        }
    }

    const handleSubmit = async (e) => {
        try {
            const response = await axiosInstance.post('/appointment/bookAppointment', formData)
            if (response?.status === 200) {
                message.success("Appointment booked");
            }
        } catch (error) {
            console.error('Error in booking appointment');

        }
    }
    return (
        <div >
            <div>
                <Button color='primary' onPress={onOpen} >
                    Book Appointment
                </Button>
            </div>
            <Modal isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>Book Appointment</ModalHeader>
                            <ModalBody>
                                <Card>
                                    <CardBody>
                                        <Input
                                            size='sm'
                                            label="Search Doctor"
                                            placeholder="Search by name or specialization"
                                            onChange={(e) => handleSearchDoctors(e.target.value)}
                                            variant="bordered"
                                            className="outline-primary border-primary"
                                        />
                                        <Select
                                            size='sm'
                                            // label="Select Doctor"
                                            className=' mb-3'
                                            options={doctors.map((doctor) => ({
                                                value: doctor.id,
                                                label: doctor.firstName,
                                            }))}
                                            onChange={(selectedDoctor) => {
                                                setFormData({ ...formData, doctorId: selectedDoctor });
                                            }}
                                        />
                                        <Input
                                            size='sm'
                                            type="datetime-local"
                                            label="Schedule"
                                            name="schedule"
                                            value={formData.schedule}
                                            onChange={handleInputChange}
                                            variant="bordered"
                                            className="outline-primary border-primary mb-3"
                                        />
                                        <Input
                                            size='sm'
                                            label="Reason for Appointment"
                                            name="reason"
                                            value={formData.reason}
                                            onChange={handleInputChange}
                                            variant="bordered"
                                            className="outline-primary border-primary mt-3"
                                        />
                                    </CardBody>
                                </Card>
                            </ModalBody>
                            <ModalFooter>
                                <Button color='danger' onPress={onClose}>Cancel</Button>
                                <Button color="primary" auto onClick={handleSubmit}>
                                    Book Appointment
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default AppointmentForm
