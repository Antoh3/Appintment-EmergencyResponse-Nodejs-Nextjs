"use client";

import { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Input, Select, SelectItem, ModalContent } from "@nextui-org/react";
import axios from "axios";
import { CiShoppingTag } from "react-icons/ci";
import { message } from "antd";
import { number } from "zod";
interface Ambulance {
    id?: string;
    name: string;
    owner: string;
    status: string;
    type: string;
    location: string;
}
const AmbulanceModal = ({ isOpen, onOpenChange, ambulance, mode }: any) => {
    const [formData, setFormData] = useState({
        name: "",
        owner: "",
        status: "",
        type: "",
        licenseNumber:"",
        location: {
            latitude: 0,
            longitude: 0,
        },
    });
    const [selectedStatus, setSelectedStatus] = useState('Available')
    const [selectedType, setSelectedType] = useState('Available')

    useEffect(() => {
        if (mode === "update" && ambulance) {
            setFormData({
                name: ambulance.name || "",
                owner: ambulance.owner || "",
                status: ambulance.status || "",
                type: ambulance.type || "",
                licenseNumber: ambulance.licenseNumber || "",
                location: ambulance.location || {
                    latitude: 37.1526,
                    longitude: -0.711,
                },
            });
        } else {
            setFormData({
                name: "",
                owner: "",
                status: "",
                type: "",
                licenseNumber:"",
                location: {
                    latitude: 37.1526,
                    longitude: -0.711,
                },
            });
        }
    }, [ambulance, mode]);

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const data = {
                ...formData,
                // location:formData.location
            }
            if (mode === "add") {
                const res = await axios.post("http://localhost:5001/ambulance/createambulance", data);
                // console.log("Ambulance Added:", data);
                if(res?.status === 201){
                    message.success("Ambulance added successfully")
                }
            } else {
                const res = await axios.patch(`http://localhost:5001/ambulance/updateambulance1/${ambulance.id}`, formData);
                // console.log("clicked");
                if (res?.status === 201) {
                    message.success("Ambulance updated")
                }
                
                // console.log("Ambulance Updated:", formData);
            }
            onOpenChange(); // Close modal after successful operation
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const ambulancesType = [
        { key: "Basic", label: "Basic Ambulance" },
        { key: "Advanced", label: "Advanced Ambulance" },
        { key: "Motuary", label: "Motuary Ambulance" },
        { key: "Patient", label: "Patient Transport Ambulance" },
        { key: "4X4", label: "4x4 Off-Road Ambulance" }
    ];

    const ambulanceStat = [
        { key: "available", label: "Available" },
        { key: "assinged", label: "Assinged" },
        { key: "on_route", label: "On_route" },
        { key: "mantainace", label: "mantainace" }
    ]

    return (
        // <Modal size="md" placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
        //     <ModalHeader className="flex flex-col gap-1">{mode === "add" ? "Add Ambulance" : "Update Ambulance"}</ModalHeader>
        //     <ModalBody>
        //         <Input
        //             label="Ambulance  name"
        //             name="name"
        //             value={formData.name}
        //             onChange={handleChange}
        //             fullWidth
        //         />
        //         <Input
        //             label="Ambulance  Owner"
        //             name="owner"
        //             value={formData.owner}
        //             onChange={handleChange}
        //             fullWidth
        //         />
        //         {/* <Input
        //             label="Driver Name"
        //             name="owner"
        //             value={formData.location}
        //             onChange={handleChange}
        //             fullWidth
        //         /> */}
        //         <Select
        //             isRequired
        //             className="max-w-xs mb-5"
        //             defaultSelectedKeys={["Basic"]}
        //             size='sm'
        //             // color='primary'
        //             label="Aid car type"
        //             placeholder="Select aid car type"
        //             name="type"
        //             value={formData.type}
        //             // onSelectionChange={(value:any) => setSlelectedAmbulance(value)}
        //             onChange={handleChange}
        //         // onValueChange={(value:any) => setSlelectedAmbulance(value)}
        //         >
        //             {ambulancesType.map((ambulance) => (
        //                 <SelectItem key={ambulance.key} value={ambulance.key} >{ambulance.label}</SelectItem>
        //             ))}
        //         </Select>
        //         <Select
        //             isRequired
        //             className="max-w-xs mb-5"
        //             defaultSelectedKeys={["Available"]}
        //             size='sm'
        //             name="status"
        //             value={formData.status}
        //             // color='primary'
        //             label="Ambulance status"
        //             placeholder="Select aid car status"
        //             // onSelectionChange={(value:any) => setSlelectedAmbulance(value)}
        //             onChange={handleChange}
        //         // onValueChange={(value:any) => setSlelectedAmbulance(value)}
        //         >
        //             {ambulanceStat.map((ambulance) => (
        //                 <SelectItem key={ambulance.key} value={ambulance.key} >{ambulance.label}</SelectItem>
        //             ))}
        //         </Select>
        //     </ModalBody>
        //     <ModalFooter>
        //         <Button color="primary" onClick={handleSubmit}>
        //             {mode === "add" ? "Add" : "Update"}
        //         </Button>
        //         <Button color="danger" variant="light" onClick={onOpenChange}>
        //             Cancel
        //         </Button>
        //     </ModalFooter>
        // </Modal>

        <Modal size="md" placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{mode === "add" ? "Add Ambulance" : "Update Ambulance"}</ModalHeader>
                        <ModalBody>
                            <Input
                                label="Ambulance  name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                fullWidth
                            />
                            <Input
                                label="Ambulance  Owner"
                                name="owner"
                                value={formData.owner}
                                onChange={handleChange}
                                fullWidth
                            />
                            <Input
                                label="LicenseNumber"
                                name="licenseNumber"
                                value={formData.licenseNumber}
                                onChange={handleChange}
                                fullWidth
                            />
                            {/* <Input
                                label="Driver Name"
                                name="owner"
                                value={JSON.stringify(formData.location)}
                                onChange={handleChange}
                                fullWidth
                                hidden
                            /> */}
                            <Select
                                isRequired
                                className="max-w-xs mb-5"
                                defaultSelectedKeys={["Basic"]}
                                size='sm'
                                // color='primary'
                                label="Aid car type"
                                placeholder="Select aid car type"
                                name="type"
                                value={formData.type}
                                // onSelectionChange={(value:any) => setSlelectedAmbulance(value)}
                                onChange={handleChange}
                            // onValueChange={(value:any) => setSlelectedAmbulance(value)}
                            >
                                {ambulancesType.map((ambulance) => (
                                    <SelectItem key={ambulance.key} value={ambulance.key} >{ambulance.label}</SelectItem>
                                ))}
                            </Select>
                            <Select
                                isRequired
                                className="max-w-xs mb-5"
                                defaultSelectedKeys={["Available"]}
                                size='sm'
                                name="status"
                                value={formData.status}
                                // color='primary'
                                label="Ambulance status"
                                placeholder="Select aid car status"
                                // onSelectionChange={(value:any) => setSlelectedAmbulance(value)}
                                onChange={handleChange}
                            // onValueChange={(value:any) => setSlelectedAmbulance(value)}
                            >
                                {ambulanceStat.map((ambulance) => (
                                    <SelectItem key={ambulance.key} value={ambulance.key} >{ambulance.label}</SelectItem>
                                ))}
                            </Select>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={handleSubmit}>
                                {mode === "add" ? "Add" : "Update"}
                            </Button>
                            <Button color="danger" variant="light" onClick={onOpenChange}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default AmbulanceModal;
