
import {
    Button,
    Select,
    SelectItem,
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Checkbox,
    CheckboxGroup,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalFooter,
    useDisclosure,
    Tooltip
} from '@nextui-org/react';
import { message } from 'antd';
import axios, { AxiosError } from 'axios';
import React, { useState } from 'react'
import createAxiosInstance from '@/context/axiosInstance';

function Ambulanceform() {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const [isInvalid, setIsInvalid] = useState(true);
    const [selectedAmbulance, setSlelectedAmbulance] = useState("Basic");
    const [selectedFeatures,setSelectedFeatures] = useState([]);
    const axiosInstance = createAxiosInstance();
    // console.log(selectedFeatures);
    

    const ambulances = [
        { key: "Basic", label: "Basic Ambulance" },
        { key: "Advanced", label: "Advanced Ambulance" },
        { key: "Motuary", label: "Motuary Ambulance" },
        { key: "Patient", label: "Patient Transport Ambulance" },
        { key: "4X4", label: "4x4 Off-Road Ambulance" }
    ];

    const handleAidCarChange = (event:any) =>{
        setSlelectedAmbulance(event.target.value)
    }

    const handleSubmit = async () =>{
        try {
            const formData = {
                aidCarType:selectedAmbulance,
                selectedItems:selectedFeatures
            }
    
            const response = await axiosInstance.post("/ambulance/requestambulance", formData)
            if (response?.status === 201) {
                message.success("Aid car on the way")
                onClose();
            }
            else{
                message.error("Error in requesting ambulance");
            }
            console.log(formData);
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 404) {
                    message.error("No available ambulances");
                }
                if (error.response?.status === 401) {
                    message.error("Login first")
                }
                if (error.response?.status === 403) {
                    message.error("You must be logged first")
                }
                if(error.response?.status === 400){
                    message.error("No available ambulances near you");
                }
            }else{
                console.error(error)
            }
        }
        
    }

    return (
        <div>
            <Button color='primary' size='sm' onPress={onOpen}>
                Request Emergency service
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Request Aid Car</ModalHeader>
                            <ModalBody>
                                <Card>
                                    <CardBody>
                                        <Select
                                            isRequired
                                            className="max-w-xs mb-5"
                                            defaultSelectedKeys={["Basic"]}
                                            size='sm'
                                            // color='primary'
                                            label="Aid car type"
                                            placeholder="Select aid car type"
                                            // onSelectionChange={(value:any) => setSlelectedAmbulance(value)}
                                            onChange={handleAidCarChange}
                                            // onValueChange={(value:any) => setSlelectedAmbulance(value)}
                                        >
                                            {ambulances.map((ambulance) => (
                                                <SelectItem key={ambulance.key} value={ambulance.key} >{ambulance.label}</SelectItem>
                                            ))}
                                        </Select>

                                        <CheckboxGroup
                                            isRequired
                                            description="Select What the ambulance should have"
                                            isInvalid={isInvalid}
                                            label="The ambulance Should have: "
                                            className=' border-2 border-transparent'
                                            onValueChange={(value:any) => {
                                                setIsInvalid(value.length < 1);
                                                setSelectedFeatures(value)
                                            }}
                                        >
                                            <Tooltip
                                                content="Helps oxygen supply to patients with breathing difficulties"
                                                placement="top-start"
                                                color="primary"
                                            >
                                                <Checkbox value="oxygen-cylinder">Oxygen Cylinder</Checkbox>
                                            </Tooltip>
                                            <Checkbox value="blood-presure-machine">Blood Presure Machine</Checkbox>
                                            <Tooltip
                                                content="Doctor"
                                                placement="top-start"
                                                color="primary"
                                            >
                                                <Checkbox value="paramedic">Paramedic</Checkbox>
                                            </Tooltip>
                                            <Tooltip
                                                content="used for listening to patient heart beats"
                                                placement="top-start"
                                                color="primary"
                                            >
                                                <Checkbox value="stethoscope">Stethoscope</Checkbox>
                                            </Tooltip>
                                            <Checkbox value="wheelchair">Wheelchair</Checkbox>
                                        </CheckboxGroup>
                                    </CardBody>
                                </Card>
                            </ModalBody>
                            <ModalFooter>
                                <Button color='danger' onPress={onClose}>Cancel</Button>
                                <Button color="primary"  onClick={handleSubmit}>
                                    Call Now
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>

    )
}

export default Ambulanceform