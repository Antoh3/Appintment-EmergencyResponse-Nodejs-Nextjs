'use client'
import { myPatients } from '../practitionerPatients.js';
import { useState, useMemo } from 'react';
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    Pagination,
    TableCell,
    Button,
    Tooltip
} from "@nextui-org/react";
import { CardSummary } from '@/components/UI/cards/CardSummary';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { RiEdit2Line, RiDeleteBin2Line, RiDeleteBin6Line } from 'react-icons/ri';

export default function Patients() {

    const columns = [
        {
            uid: "1",
            name: "FULL NAME"
        },
        {
            uid: "2",
            name: "AGE"
        },
        {
            uid: "3",
            name: "DATE DIAGNOSED"
        },
        {
            uid: "4",
            name: "STATUS"
        },
        {
            uid: "5",
            name: "ACTION"
        }
    ]
    const renderCell = (patient: any, columnKey: any) => {
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
        <main className="flex px-11 py-5 flex-col gap-4">
            <div className="grid sm:grid-cols-3 gap-4 w-full">
                <CardSummary title="Total Patients" value="1000" />
                <CardSummary title="Assigned Patients" value="200" />
                <CardSummary title="Unassigned Patients" value="6" />
            </div>
            <div className="flex justify-between">
                <h2 className="capitalize text-lg bold">all patients</h2>
            </div>
            <div>
                <Table
                    selectionMode="single"
                    aria-label="Example table with custom cells"
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
                    <TableBody items={paginatedPatient} emptyContent={"No patients yet"}>
                        {myPatients.map((patient) => (
                            <TableRow key={patient.id}>
                                <TableCell>{patient.full_name}</TableCell>
                                <TableCell>{patient.age}</TableCell>
                                <TableCell>{patient.date_diagnosed}</TableCell>
                                <TableCell>{patient.status}</TableCell>
                                <TableCell className='flex gap-2'>
                                    <Tooltip showArrow={true} content="Update journal" placement="top-end">
                                        <Button
                                            isIconOnly
                                            color="warning"
                                            variant="faded"
                                            aria-label="Edit journal"
                                        // onClick={() => handleJournalEdit(item.id, item.content)}
                                        >
                                            <RiEdit2Line />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip showArrow={true} content="Delete journal" color="danger" placement="top-start">
                                        <Button
                                            isIconOnly
                                            color="danger"
                                            aria-label="Delete journal"
                                        // onClick={() => handleDeleteJournal(item.id)}
                                        >
                                            <RiDeleteBin6Line />
                                        </Button>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </main>
    )
}