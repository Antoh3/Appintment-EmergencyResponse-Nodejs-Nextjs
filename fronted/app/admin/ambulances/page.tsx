"use client"
import { CardSummary } from "@/components/UI/cards/CardSummary"
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Input, Tooltip, SelectItem, Select } from "@nextui-org/react";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    Pagination,
    TableCell
} from "@nextui-org/react";
import Link from 'next/link'
import { practitioners } from '../practitioners.js'
import { useEffect, useState, useMemo, SetStateAction } from "react";
import { useRouter } from 'next/navigation'
import axios from "axios";
import AppointmentStatusBadge from "@/components/AppointmentStatusBadge";
import { CiShoppingTag } from "react-icons/ci";
import { RiDeleteBin6Line, RiEdit2Fill, RiEdit2Line } from "react-icons/ri";
import { string } from "zod";
import { message } from "antd";
import AmbulanceModal from "@/components/AmbulanceModal";

interface Ambulance {
    id?: string;
    name: string;
    owner: string;
    status: string;
    type: string;
    location: string;
}


export default function Ambulance() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [ambulances, setAmbulances] = useState<Ambulance[]>([])
    const [ambulanceStatus, setAmbulanceStatus] = useState({
        total: 0,
        formattesStatus: {
            available: 0,
            mantainace: 0,
            on_route: 0,
            assinged: 0,
        }
    })
    const [formData, setFormData] = useState({
        name: string,
        licenseNumber: string,
        location: string,
        type: string,
        owner: string,
        status: string
    })
    const {
        isOpen: isAmbulanceChangeStatus,
        onOpen: onAmbulanceOpen,
        onOpenChange: onAmbulanceOpenChange,
        onClose: onAmbulanceClose
    } = useDisclosure();
    const [selectedAmbulance, setSelectedAmbulance] = useState<Ambulance | null>(null)
    const [updateAmbulance, setUpdateAmbulance] = useState(null);
    const [modalMode, setModalMode] = useState("add");
    const [selectedStatus, setSelectedStatus] = useState('Available')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1);
    const rowsPerPage = 10;
    const total = 6;
    const router = useRouter();


    const totalambulances = ambulanceStatus.total;
    const assignedAmbulances = ambulanceStatus.formattesStatus.assinged;
    const availableAmbulances = ambulanceStatus.formattesStatus.available;
    const on_routeAmbulances = ambulanceStatus.formattesStatus.on_route;
    const underMantainace = ambulanceStatus.formattesStatus.mantainace;

    const columns = [
        {
            uid: "1",
            name: "AmbulanceName"
        },
        {
            uid: "2",
            name: "Ownet"
        },
        {
            uid: "3",
            name: "Type"
        },
        {
            uid: "4",
            name: "Status"
        },
        {
            uid: "5",
            name: "Action"
        }
    ]

    const fetchData = async () => {
        try {
            const res = await axios.get(`http://localhost:5001/ambulance/getall?page=${currentPage}$limit=${rowsPerPage}`)
            const ambulance = await axios.get(`http://localhost:5001/ambulance/ambulancestatus`)

            console.log("data", res.data);

            setAmbulances(res.data.ambulances);
            setTotalPages(res.data.totalPages)
            setAmbulanceStatus(ambulance.data)
        } catch (error) {
            console.error("Erroin in fetching data");

        }
    }

    useEffect(() => {
        fetchData();
    }, [currentPage])

    const handlePageChange = async (page: number) => {
        console.log("current page", page);
        setCurrentPage(page)
    }

    const handleAidCarChange = (event: any) => {
        setSelectedStatus(event.target.value)
    }

    const handleAddClick = async () => {
        setUpdateAmbulance(null);
        setModalMode("add");
        fetchData()
        onOpen();
    };

    const handleUpdateClick = async (ambulance: any) => {
        setUpdateAmbulance(ambulance);
        setModalMode("update");
        fetchData();
        onOpen();
    };

    const handleChangeAmbulanceStatus = async () => {
        const formData = {
            status: selectedStatus
        }

        const res = await axios.patch(`http://localhost:5001/ambulance/updateambulancestatus/${selectedAmbulance?.id}`, formData);
        fetchData()
        onAmbulanceClose()
        if (res?.status === 200) {
            message.success("Ambulance updated")
        }
    }

    const handleDeleteAmbulance = async (id: string | any) => {

        const res = await axios.delete(`http://localhost:5001/ambulance/deleteambulance/${id}`)

        fetchData()
        if (res?.status === 200) {
            message.success("Ambulance deleted")
        }
    }

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


    // const pages = Math.ceil(practitioners.length / rowsPerPage);

    // const paginatedPractitioners = useMemo(() => {
    //     const start = (page - 1) * rowsPerPage;
    //     const end = start + rowsPerPage;

    //     return practitioners.slice(start, end);
    // }, [page, practitioners]);

    return (
        <main className="flex px-11 py-5 flex-col gap-4">
            <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-4 w-full">
                <CardSummary title="Total ambulances" value={totalambulances ? totalambulances : 0} />
                <CardSummary title="Assinged ambulances" value={assignedAmbulances ? assignedAmbulances : 0} />
                <CardSummary title="On_route ambulances" value={on_routeAmbulances ? on_routeAmbulances : 0} />
                <CardSummary title="Available ambulances" value={availableAmbulances ? availableAmbulances : 0} />
                <CardSummary title="Under mantainance" value={underMantainace ? underMantainace : 0} />
            </div>
            <div className="flex justify-between">
                <h2 className="capitalize text-lg bold">All Ambulances</h2>
                <Button variant="solid" color="primary" className="capitalize" onPress={handleAddClick}>add ambulance</Button>
            </div>
            <div>
                {/* <Modal size="md" placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Add Ambulance</ModalHeader>
                                <ModalBody>
                                    <Input
                                        size="sm"
                                        endContent={
                                            <CiShoppingTag
                                                className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                        }
                                        label="Ambulance Name"
                                        // value={newBed.ward_assigned}
                                        // onChange={(e) => setNewBed({ ...newBed, ward_assigned: e.target.value })}
                                        variant="bordered"
                                        className="outline-primary border-primary"
                                    />
                                    <Input
                                        size="sm"
                                        endContent={
                                            <CiShoppingTag
                                                className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                        }
                                        label="License Number"
                                        // value={newBed.ward_assigned}
                                        // onChange={(e) => setNewBed({ ...newBed, ward_assigned: e.target.value })}
                                        variant="bordered"
                                        className="outline-primary border-primary"
                                    />
                                    <Input
                                        size="sm"
                                        endContent={
                                            <CiShoppingTag
                                                className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                        }
                                        label="Ambulance Location"
                                        // value={newBed.ward_assigned}
                                        // onChange={(e) => setNewBed({ ...newBed, ward_assigned: e.target.value })}
                                        variant="bordered"
                                        className="outline-primary border-primary"
                                    />
                                    <Input
                                        size="sm"
                                        endContent={
                                            <CiShoppingTag
                                                className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                        }
                                        label="Owner"
                                        // value={newBed.ward_assigned}
                                        // onChange={(e) => setNewBed({ ...newBed, ward_assigned: e.target.value })}
                                        variant="bordered"
                                        className="outline-primary border-primary"
                                    />
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
                                        {ambulancesType.map((ambulance) => (
                                            <SelectItem key={ambulance.key} value={ambulance.key} >{ambulance.label}</SelectItem>
                                        ))}
                                    </Select>
                                    <Select
                                        isRequired
                                        className="max-w-xs mb-5"
                                        defaultSelectedKeys={["Available"]}
                                        size='sm'
                                        // color='primary'
                                        label="Ambulance status"
                                        placeholder="Select aid car status"
                                    // onSelectionChange={(value:any) => setSlelectedAmbulance(value)}
                                    // onChange={handleAidCarChange}
                                    // onValueChange={(value:any) => setSlelectedAmbulance(value)}
                                    >
                                        {ambulanceStat.map((ambulance) => (
                                            <SelectItem key={ambulance.key} value={ambulance.key} >{ambulance.label}</SelectItem>
                                        ))}
                                    </Select>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={onClose}>
                                        Action
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal> */}
            </div>
            <div>
                <Table selectionMode="single" aria-label="Example table with custom cells" bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            // isCompact
                            showControls
                            // showShadow
                            color="primary"
                            initialPage={1}
                            page={currentPage}
                            total={totalPages}
                            onChange={handlePageChange}
                        />
                    </div>

                }>
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody emptyContent={"No available amulance requests yet"}>
                        {ambulances?.map((ambulance: any) => (
                            <TableRow key={ambulance.id}>
                                <TableCell>{ambulance.name}</TableCell>
                                <TableCell>{ambulance.owner}</TableCell>
                                <TableCell>{ambulance.type}</TableCell>
                                <TableCell>
                                    <span
                                        className={
                                            " rounded w-full block text-center"
                                        }
                                    >
                                        <AppointmentStatusBadge status={ambulance.status} />
                                    </span>
                                    {/* {ambulance.status} */}
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Tooltip showArrow={true} content="Update ambulance" color="secondary" placement="top-end">
                                            <Button
                                                isIconOnly
                                                color="secondary"
                                                variant="faded"
                                                aria-label="Edit journal"
                                                onClick={() => handleUpdateClick(ambulance)}
                                            >
                                                <RiEdit2Line />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip showArrow={true} content="Change ambulance  status" color="success" placement="top-start">
                                            <Button
                                                isIconOnly
                                                color="success"
                                                aria-label="Change status"
                                                // disabled={deleting}
                                                onPress={() => {
                                                    setSelectedAmbulance(ambulance)
                                                    onAmbulanceOpen()
                                                }}
                                            >
                                                <RiEdit2Fill />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip showArrow={true} content="Delete ambulance" color="danger" placement="top-start">
                                            <Button
                                                isIconOnly
                                                color="danger"
                                                aria-label="Delete Ambulance"
                                                // disabled={deleting}
                                                onClick={() => handleDeleteAmbulance(ambulance.id)}
                                            >
                                                <RiDeleteBin6Line />
                                            </Button>
                                        </Tooltip>
                                    </div>
                                </TableCell>

                            </TableRow>

                        ))}
                    </TableBody>
                </Table>

                <Modal isOpen={isAmbulanceChangeStatus} onOpenChange={onAmbulanceOpenChange} onClose={onAmbulanceClose}>
                    <ModalContent>
                        {(onAmbulanceClose) => (
                            <>
                                <ModalHeader>Change ambulance status</ModalHeader>
                                <ModalBody>
                                    <Select
                                        isRequired
                                        className="max-w-xs mb-5"
                                        defaultSelectedKeys={["Available"]}
                                        size='sm'
                                        // color='primary'
                                        label="Ambulance status"
                                        placeholder="Select aid car status"
                                        // onSelectionChange={(value:any) => setSlelectedAmbulance(value)}
                                        onChange={handleAidCarChange}
                                    // onValueChange={(value:any) => setSlelectedAmbulance(value)}
                                    >
                                        {ambulanceStat.map((ambulance) => (
                                            <SelectItem key={ambulance.key} value={ambulance.key} >{ambulance.label}</SelectItem>
                                        ))}
                                    </Select>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="warning" onClick={handleChangeAmbulanceStatus}>
                                        Change
                                    </Button>
                                    <Button onPress={onAmbulanceClose}>
                                        Close
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>

                <AmbulanceModal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    ambulance={updateAmbulance}
                    mode={modalMode}
                />

            </div>
        </main>
    )
}