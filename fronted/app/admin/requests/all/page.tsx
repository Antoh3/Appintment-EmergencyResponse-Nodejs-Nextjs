"use client"
import { CardSummary } from "@/components/UI/cards/CardSummary";
import { Button, Tooltip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input, Select, SelectItem, Textarea, Checkbox, CardBody, CheckboxGroup, Card } from "@nextui-org/react";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    Pagination,
    TableCell
} from "@nextui-org/react";
import { CiShoppingTag } from "react-icons/ci";
import Link from "next/link";
import React, { Key, use, useEffect, useMemo, useState } from "react";
// import { getAllRequests, sendRequest, Request, getLabRequests, aproveRequests } from "../../requests";
import { request } from "http";
import { toast } from 'react-hot-toast'
import axios from "axios";
import AppointmentStatusBadge from "@/components/AppointmentStatusBadge";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { message } from "antd";
import { FiChevronsRight } from "react-icons/fi";

export interface Request {
    id: string,
    aidCarType: string,
    status: string,
    ambulance: {
        name: string,
        owner: string,
    },
    patient: {
        firstName: string,
        lastName: string,
    }

}

export default function page() {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [allRequests, setAllRequests] = useState({
        total: 0,
        formattesStatus: {
            pending: 0,
            accepted: 0,
            canceled: 0,
            completed: 0,
            canceled_by_user: 0,
            canceled_by_admin: 0,
        }
    })

    // console.log(allRequests);

    const [requests, setRequests] = useState<Request[]>([])
    const [editRequest, setEditRequest] = useState<Request | null>(null);
    // console.log("", requests);

    const [labRequest, setLabRequest] = useState('')
    const [description, setDescription] = useState('')


    const ambulances = [
        { key: "Basic", label: "Basic Ambulance" },
        { key: "Advanced", label: "Advanced Ambulance" },
        { key: "Motuary", label: "Motuary Ambulance" },
        { key: "Patient", label: "Patient Transport Ambulance" },
        { key: "4X4", label: "4x4 Off-Road Ambulance" }
    ];
    const fetchData = async () => {
        const ambulanceRequest = await axios.get(`http://localhost:5001/ambulance/requeststatus`)
        const ambulanceReques = await axios.get(`http://localhost:5001/ambulance/ambulancerequestsadmin`)

        setRequests(ambulanceReques.data);
        setAllRequests(ambulanceRequest.data)
    }

    useEffect(() => {
        fetchData()
    }, [])



    const handleCancelAmbulanceRequest = async (id: string | any) => {
        try {
            const res = await axios
                .patch(`http://localhost:5001/patient/cancelrequestadmin/${id}`, { status: "canceled_by_admin" })
            setRequests((prev) =>
                prev.map((appt) => (appt.id === id ? { ...appt, status: "canceled_by_admin" } : appt))
            );
            
            fetchData()
            // console.log("data", res.data);
            if (res?.status === 200) {
                message.success("Request canceled");
            }

            // setAllRequests(res.data)
        } catch (error) {
            console.error("Error in canceling request");

        }
    }

    const handleAcceptAmbulanceRequest = async (id: string | any) => {
        try {
            const res = await axios
                .patch(`http://localhost:5001/ambulance/accepterequestadmin/${id}`, { status: "accepted" })
            setRequests((prev) =>
                prev.map((appt) => (appt.id === id ? { ...appt, status: "accepted" } : appt))
            );
            fetchData()
            if (res?.status === 200) {
                message.success("Request accepted");
            }
        } catch (error) {
            console.error("Error in canceling request");

        }
    }

    const handleCompleteAmbulanceRequest = async (id: string | any) => {
        try {
            const res = await axios
                .patch(`http://localhost:5001/ambulance/completerequestadmin/${id}`, { status: "completed" })
            setRequests((prev) =>
                prev.map((appt) => (appt.id === id ? { ...appt, status: "completed" } : appt))
            );

            fetchData()

            if (res?.status === 200) {
                message.success("Request completed");
            }
        } catch (error) {
            console.error("Error in canceling request");

        }
    }


    // const handleSendRequest = async (e: React.FormEvent) => {
    //     e.preventDefault()
    //     await sendRequest({ request_type: labRequest, details: description })
    //     toast.success("Request send succefully", {
    //         duration: 5000
    //     })
    //     onClose()
    //     setLabRequest('')
    //     setDescription('')
    //     fetchData()
    // }

    // const handleApprove = async (id: number) => {
    //     await aproveRequests(id, "Approved")
    //     const request = await getAllRequests()
    //     const status = await getLabRequests()
    //     toast.success("Request approved", {
    //         duration: 5000
    //     })
    //     setAllRequests(request)
    //     setRequests(status)
    //     setEditRequest(null)
    // }

    const totalRequests = allRequests.total
    const pendingRequests = allRequests.formattesStatus.pending
    const acceptedRequests = allRequests.formattesStatus.accepted
    const canceledRequests = allRequests.formattesStatus.canceled | allRequests.formattesStatus.canceled_by_admin | allRequests.formattesStatus.canceled_by_user
    const completedRequests = allRequests.formattesStatus.completed

    const requestType = ['lab', 'patient']
    return (
        <main className="flex px-11 py-5 flex-col gap-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
                <CardSummary
                    title="All Requests"
                    value={totalRequests ? totalRequests : 0}
                    className="cursor-pointer"
                ></CardSummary>
                <CardSummary
                    title="Pending "
                    value={pendingRequests ? pendingRequests : 0}
                    className="cursor-pointer"
                ></CardSummary>
                <CardSummary
                    title="Accepted"
                    value={acceptedRequests ? acceptedRequests : 0}
                    className="cursor-pointer"
                />
                <CardSummary
                    title="Canceled"
                    value={canceledRequests ? canceledRequests : 0}
                    className="cursor-pointer"
                />
                <CardSummary
                    title="Completed"
                    value={completedRequests ? completedRequests : 0}
                    className="cursor-pointer"
                />
            </div>
            <div className="flex justify-between">
                <h2 className="capitalize text-lg bold">All Requets</h2>
                <Button variant="solid" color="primary" className="capitalize" onPress={onOpen}>Send Rquest</Button>
            </div>
            <div>
                <Modal size="xl" placement="center" isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Send Request</ModalHeader>
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
                                            // onChange={handleAidCarChange}
                                            // onValueChange={(value:any) => setSlelectedAmbulance(value)}
                                            >
                                                {ambulances.map((ambulance) => (
                                                    <SelectItem key={ambulance.key} value={ambulance.key} >{ambulance.label}</SelectItem>
                                                ))}
                                            </Select>

                                            <CheckboxGroup
                                                isRequired
                                                description="Select What the ambulance should have"
                                                // isInvalid={isInvalid}
                                                label="The ambulance Should have: "
                                                className=' border-2 border-transparent'
                                            // onValueChange={(value:any) => {
                                            //     setIsInvalid(value.length < 1);
                                            //     setSelectedFeatures(value)
                                            // }}
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
                                    <Button color="primary"  >
                                        Call Now
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
            <div>
                <Table aria-label="Bed Table">
                    <TableHeader>
                        <TableColumn>Ambulance Name</TableColumn>
                        <TableColumn>Ambulance Type</TableColumn>
                        <TableColumn>Ambulance Owner</TableColumn>
                        <TableColumn>PatientName</TableColumn>
                        <TableColumn>Status</TableColumn>
                        <TableColumn>Actions</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {requests.map((request: any) => (
                            <TableRow key={request.id}>
                                <TableCell>{request.ambulance.name}</TableCell>
                                <TableCell>{request.aidCarType}</TableCell>
                                <TableCell>{request.ambulance.owner}</TableCell>
                                <TableCell>{request.patient.firstName} - {request.patient.lastName}</TableCell>
                                <TableCell>
                                    <span
                                        className={
                                            " rounded w-full block text-center"
                                        }
                                    >
                                        <AppointmentStatusBadge status={request.status} />
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Tooltip showArrow={true} content="Accept Request" placement="top-end">
                                            <Button
                                                isIconOnly
                                                color="warning"
                                                variant="faded"
                                                aria-label="Accept Request"
                                                onClick={() => handleAcceptAmbulanceRequest(request.id)}
                                            >
                                                <RiEdit2Line />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip showArrow={true} content="Cancel Request" color="danger" placement="top-start">
                                            <Button
                                                isIconOnly
                                                color="danger"
                                                aria-label="Cancel Request"
                                                // disabled={deleting}
                                                onClick={() => handleCancelAmbulanceRequest(request.id)}
                                            >
                                                <RiDeleteBin6Line />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip showArrow={true} content="Complete Request" color="danger" placement="top-start">
                                            <Button
                                                isIconOnly
                                                color="success"
                                                aria-label="Complete Request"
                                                // disabled={deleting}
                                                onClick={() => handleCompleteAmbulanceRequest(request.id)}
                                            >
                                                <FiChevronsRight />
                                            </Button>
                                        </Tooltip>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

        </main>
    )
}
