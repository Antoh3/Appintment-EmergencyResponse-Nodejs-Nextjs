"use client";

import React, { useState } from 'react';
import { Button, Card, CardBody, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, useDisclosure } from '@nextui-org/react';
import axios, { AxiosError } from 'axios';
import createAxiosInstance from "@/context/axiosInstance";
import { message } from 'antd';

function AppointmentForm() {
    const [formData, setFormData] = useState({
        doctorId: '',
        schedule: '',
        reason: '',
    });
    // console.log("Formdata",formData);
    const [doctorSearch, setDoctorSearch] = useState(''); // Holds the current value of the input
    // console.log('Doctor search', doctorSearch);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    // console.log("filtered dcotors", filteredDoctors);
   
    
    
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const axiosInstance = createAxiosInstance();

    // Handle input changes for schedule and reason
    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Search doctors based on user input
    const handleSearchDoctors = async (query: string | any) => {
        setDoctorSearch(query); // Update the input field as the user types
        if (query.trim() === '') {
            setFilteredDoctors([]);
            return;
        }
        try {
            const response = await axiosInstance.get(`/doctor/search?query=${query}`)
            console.log("response data", response.data);
            // setDoctors(response.data);
            setFilteredDoctors(response.data);
        } catch (error) {
            console.error("Error fetching doctors", error);
        }
    };

    // Handle doctor selection
    const handleDoctorSelect = (doctor: string | any) => {
        setDoctorSearch(`${doctor.firstName} ${doctor.lastName}`); // Display selected doctor's name
        setFormData({
            ...formData,
            doctorId: doctor.id, // Set the doctorId correctly
        });
        setFilteredDoctors([]); // Clear the dropdown after selection
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (!formData.doctorId || !formData.schedule || !formData.reason) {
            message.error("Please fill in all fields.");
            return;
        }
        try {
            const response = await axiosInstance.post('/appointment/bookAppointment', {
                doctorId: formData.doctorId,
                schedule: formData.schedule,
                reason: formData.reason,
            });
            if (response?.status === 200) {
                setFormData({ doctorId: '', schedule: '', reason: '' });
                setDoctorSearch('');
                message.success("Appointment booked");
                onClose();
            }
        } catch (error) {
            if (error instanceof AxiosError) {
               if (error.response?.status === 401 || error.response?.status === 403) {
                message.warning("Please login first");
               }

            }else{
                console.error('Error booking appointment:', error);
                message.error("Try again later")
            }
        }
    };

    return (
        <div>
            <Button color='primary' onPress={onOpen}>
                Book Appointment
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Book Appointment</ModalHeader>
                            <ModalBody>
                                <Card>
                                    <CardBody>
                                        {/* Doctor Search Input */}
                                        <Input
                                            size='sm'
                                            label="Search Doctor"
                                            placeholder="Search by name or specialization"
                                            value={doctorSearch}
                                            onChange={(e) => handleSearchDoctors(e.target.value)}
                                            variant="bordered"
                                            className="outline-primary border-primary"
                                        />
                                        {/* Doctor List */}
                                        {filteredDoctors.length > 0 && (
                                            <div style={{ border: '1px solid #ddd', borderRadius: '5px', marginTop: '5px' }}>
                                                {filteredDoctors.map((doctor: string | any) => (
                                                    <div
                                                        key={doctor.id}
                                                        onClick={() => handleDoctorSelect(doctor)}
                                                        style={{
                                                            padding: '8px',
                                                            cursor: 'pointer',
                                                            borderBottom: '1px solid #eee',
                                                            zIndex:"100"
                                                        }}
                                                        
                                                    >
                                                        {doctor.firstName} {doctor.lastName} - {doctor.specialization}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {/* Schedule Input */}
                                        <Input
                                            size='sm'
                                            type="datetime-local"
                                            label="Schedule"
                                            name="schedule"
                                            value={formData.schedule}
                                            onChange={handleInputChange}
                                            variant="bordered"
                                            className="outline-primary border-primary mt-3"
                                        />
                                        {/* Reason Input */}
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
                                <Button color="primary"  onClick={handleSubmit}>
                                    Book Appointment
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}

export default AppointmentForm;
