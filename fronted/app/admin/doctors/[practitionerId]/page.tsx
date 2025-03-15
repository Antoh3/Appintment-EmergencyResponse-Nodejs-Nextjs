"use client"
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    Pagination,
    TableCell
} from "@nextui-org/react";
import { myPatients } from '../../practitionerPatients.js'
import { IoCallOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { useState, useMemo } from "react";



export default function PractitionerDetails() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const columns = [
        {
            uid: "1",
            name: "FIRST NAME"
        },
        {
            uid: "2",
            name: "SECOND NAME"
        },
        {
            uid: "3",
            name: "DATE DIAGNOSED"
        },
        {
            uid: "4",
            name: "STATUS"
        }
    ]

    const renderCell = (patient:any, columnKey:any) => {
        const cellValue = patient[columnKey];
        switch (columnKey) {
            case "1":
                return patient.full_name;
            case "2":
                return patient.age;
            case "3":
                return patient.date_diagnosed;
            case "4":
                return patient.status;
            default:
                return cellValue;
        }
    };

    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    const pages = Math.ceil(myPatients.length / rowsPerPage);

    const paginatedPatient = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return myPatients.slice(start, end);
    }, [page, myPatients]);

    return (
        <section className="px-11 py-5 flex flex-col gap-4">
            <div className="flex gap-8 border rounded bg-white p-5">
                <div className="w-[9rem] h-[9rem] rounded-full overflow-hidden">
                    <img src="https://www.shutterstock.com/image-photo/profile-photo-attractive-family-doc-600nw-1724693776.jpg" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="w-11/12 flex flex-col gap-3">

                    <div className="flex justify-between">
                        <div>
                            <h3>Dr. Remmy Kembi</h3>
                            <span className="text-zinc-400">Dentist</span>
                        </div>
                        <div >
                            <Button variant="solid" color="danger" className="capitalize" onPress={onOpen}>dismiss</Button>
                        </div>
                    </div>

                    <ul className="flex gap-2 py-2">
                        <li>
                            <Link href={""} className="text-lg"><IoCallOutline /></Link>
                        </li>
                        <li>
                            <Link href={""} className="text-lg"><TfiEmail /></Link>
                        </li>
                        <li>
                            <Link href={""} className="text-lg"><FaWhatsapp /></Link>
                        </li>
                    </ul>
                    <p className="bg-success-200 w-fit py-1 px-2 rounded-3xl capitalize text-sm">active</p>
                </div>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Are you sure you want to dismiss practitioner?</ModalHeader>
                            <ModalBody>
                                <span className="text-sm">This will disabled them from accessing their portal</span> 
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary">
                                    Yes
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <div className="flex justify-between">
                <h2 className="capitalize text-lg bold">Assigned Patients</h2>
                <Button variant="solid" color="primary" className="capitalize">asign Patient</Button>
            </div>
            {/* <p className="text-center my-4">No patients assigned</p> */}
            <div>
                <Table selectionMode="single" aria-label="Example table with custom cells"
                    bottomContent={
                        <div className="flex w-full justify-center">
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="primary"
                                page={page}
                                total={pages}
                                onChange={(page) => setPage(page)}
                            />
                        </div>
                    }
                >
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={paginatedPatient}>
                        {(patient) => (
                            <TableRow key={patient.id}>
                                {(columnKey) => <TableCell>{renderCell(patient, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </section>
    )
}