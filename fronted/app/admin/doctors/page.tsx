"use client"
import { CardSummary } from "@/components/UI/cards/CardSummary"
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
import Link from 'next/link'
import { practitioners } from '../practitioners.js'
import { useEffect, useState, useMemo } from "react";
import { useRouter } from 'next/navigation'


export default function Practitioner() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [doctors,setDoctors] = useState([])
    const router = useRouter();

    const navigateTpPractitioner = (id:any) => {
        router.push(`/admin/doctor/${id}`)
    }

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
            name: "PROFESSION"
        },
        {
            uid: "4",
            name: "SPECIALIZATION"
        }
    ]
    const renderCell = (practitioner:any, columnKey:any) => {
        const cellValue = practitioner[columnKey];
        switch (columnKey) {
            case "1":
                return practitioner.first_name;
            case "2":
                return practitioner.last_name;
            case "3":
                return practitioner.profession;
            case "4":
                return practitioner.specialization;
            default:
                return cellValue;
        }
    };

    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    const pages = Math.ceil(practitioners.length / rowsPerPage);

    const paginatedPractitioners = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return practitioners.slice(start, end);
    }, [page, practitioners]);

    return (
        <main className="flex px-11 py-5 flex-col gap-4">
            <div className="grid sm:grid-cols-3 gap-4 w-full">
                <CardSummary title="Total Practitioners" value={practitioners.length} />
                <CardSummary title="Specialized Practitioners" value="15" />
                <CardSummary title="Active RPractitioners" value="6" />
            </div>
            <div className="flex justify-between">
                <h2 className="capitalize text-lg bold">all practitioners</h2>
                <Button variant="solid" color="primary" className="capitalize" onPress={onOpen}>add practitioner</Button>
            </div>
            <div>
                <Modal size="5xl" placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Add Practitioner</ModalHeader>
                                <ModalBody>
                                    <p>
                                        Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                                        dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                                        Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                                        Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur
                                        proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                                    </p>
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
                </Modal>
            </div>
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
                    <TableBody items={paginatedPractitioners}>
                        {(practitioner) => (
                            <TableRow key={practitioner.id} className="cursor-pointer" onClick={() => navigateTpPractitioner(practitioner.id)}>
                                {(columnKey) => <TableCell>{renderCell(practitioner, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </main>
    )
}