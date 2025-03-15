"use client"
import { Accordion, AccordionItem, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input, Textarea } from "@nextui-org/react";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { BsChatSquareDots } from "react-icons/bs";
import { useState, useEffect } from "react";
import { error } from "console";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Service } from "../services";

export default function Services() {
    const { isOpen, onOpen, onOpenChange,onClose } = useDisclosure();
    const [services,setServices] = useState([]);
    const [name,setName] = useState('');
    const [description,setDescription] = useState('')
    const [charged_per,setcharged_per] = useState('')
    const [cost,setCost] = useState('')
    const [editService, setEditService] = useState<Service | null>(null)

    useEffect(() =>{
        fetchServices()
    },[])

    const fetchServices = async() =>{
        const res = await fetch("http://localhost:5000/hospital/all_services")
        const data = await res.json()
        setServices(data);
    }

    const handleAddService = async() =>{
        await axios.post("http://localhost:5000/hospital/service",{
            name: name,
            description: description, 
            cost: cost,
            charged_per: charged_per
        })
        toast.success("Service added successfully")
        onClose()
        fetchServices()
        setName('')
        setDescription('')
        setCost('')
        setcharged_per('')
    }

    const updateService = async(id: any) =>{
        await fetch(`http://localhost:5000/hospital/services/${id}`,{
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: name, cost: cost, charged_per: charged_per, description: description})
        });
        toast.success("Service updated successfully",{
            duration:5000
          })
        fetchServices()
        setName('')
        setCost('')
        setDescription('')
        setcharged_per('')
    }

    const deleteService = async (service_id: number) =>{
       await axios.delete(`http://localhost:5000/hospital/delete_service/${service_id}`)
        toast.error("Service deleted",{
            duration:5000
        })
       fetchServices()
    }


    return (
        <main className="flex px-11 py-8 flex-col gap-4">
            <div className="flex justify-between">
                <h2 className="capitalize text-lg bold">available services</h2>
                <Button variant="solid" color="primary" className="capitalize" onPress={onOpen}>add service</Button>
            </div>
            <Modal size="xl" isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add Service</ModalHeader>
                            <ModalBody>
                                <Input
                                 isRequired 
                                 autoFocus 
                                 type="text"
                                 variant="bordered" 
                                 label="Title"  
                                 value={name}
                                 onChange={(e) => setName(e.target.value)}
                                 size="sm"
                                 />
                                 <Input
                                 isRequired 
                                 autoFocus 
                                 type="number"
                                 variant="bordered" 
                                 label="Cost"  
                                 value={cost}
                                 onChange={(e) => setCost(e.target.value)}
                                 size="sm"
                                 />
                                 <Input
                                 isRequired 
                                 autoFocus 
                                 type="text"
                                 variant="bordered" 
                                 label="Charged_per"  
                                 value={charged_per}
                                 onChange={(e) => setcharged_per(e.target.value)}
                                 size="sm"
                                 />
                                <Textarea 
                                isRequired 
                                type="text" 
                                variant="bordered" 
                                label="Description" 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" onClick={handleAddService}>
                                    Add Service
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Accordion variant="splitted">
                {services.map((service: any) => (
                    <AccordionItem
                        key={service.id}
                        aria-label={service.name}
                        title={service.name}
                    >   
                        {/* {service.cost} */}
                        {service.description}
                        <br />
                        <Button size="sm" className="m-3" onClick={() => {}}>
                        Edit
                        </Button>
                        <Button 
                            size="sm" 
                            color="danger" 
                            onClick={() => deleteService(service.id)}>
                        Delete
                        </Button>
                    </AccordionItem>
                ))}
            </Accordion>
        </main>
    )
}