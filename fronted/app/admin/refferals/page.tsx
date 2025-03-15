"use client"
import { CardSummary } from "@/components/UI/cards/CardSummary";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input, Select, SelectItem, Textarea, Checkbox } from "@nextui-org/react";
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
import { Key, use, useEffect, useMemo, useState } from "react";
import { toast } from 'react-hot-toast';
import { approveReferals,getAllReferrals,getRefferalStats,Refferal,referPatient } from "../referrals";

function page() {
    const { isOpen, onOpen, onOpenChange,onClose } = useDisclosure();

    const [refferals, setReffrals] = useState([]);
    console.log(refferals);
    const [status, setStatus] = useState({
        total:0,
        pending:0,
        approved:0
    })
    const [patientName, setPatientName] = useState('')
    const [sendFrom, setSendFrom] = useState('')
    const [recivedBy, setReceivedBy] = useState('')
    const [reason,setReason] = useState('')
    const [editRefferal, seteditRefferal] = useState<Refferal | null>(null);
    


    console.log(status);

    async function fetchData() {
        const allRefferals = await getAllReferrals()
        const stats = await getRefferalStats()
        setReffrals(allRefferals)
        setStatus(stats)
    }
    

    useEffect(()=>{
        fetchData()
    },[])

    const handleApprove = async (id:number) =>{
        await approveReferals(id, "Approved")
        const updatedRefferlas = await getAllReferrals()
        const updatedStats = await getRefferalStats()
        toast.success('Refferal approved',{
            duration:5000
          })
        setReffrals(updatedRefferlas)
        setStatus(updatedStats)
        seteditRefferal(null)
    }

    const handleReferPatient = async ()=>{
        await referPatient({patient_name:patientName,reffering_hospital:sendFrom,receiving_hospital:recivedBy,reason:reason})
        onClose()
        toast.success('Patient reffered',{
            duration:5000
          })
        setPatientName('')
        setReason('')
        setReceivedBy('')
        setReceivedBy('')
        fetchData()
    }

    const verified = ["Approved","Pending"]

    return (
        <main className="flex px-11 py-5 flex-col gap-4">
            <div className="grid grid-cols-3 gap-4 w-full">
                <CardSummary 
                title="All Referrals" 
                value={status.total} 
                className="cursor-pointer" 
                ></CardSummary>
                <CardSummary 
                title="Approved" 
                value={status.approved} 
                className="cursor-pointer" 
                />
                <CardSummary 
                title="Pending" 
                value={status.pending} 
                className="cursor-pointer" 
                />
            </div>
            <div className="flex justify-between">
                <h2 className="capitalize text-lg bold">All Refferals</h2>
                <Button variant="solid" color="primary" className="capitalize" onPress={onOpen}>Refer Patient</Button>
            </div>
            <div>
                <Modal size="xl" placement="center" isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Add Bed</ModalHeader>
                                <ModalBody>
                                    <Input
                                        autoFocus
                                        isRequired
                                        size="sm"
                                        value={patientName}
                                        onChange={(e) => setPatientName(e.target.value)}
                                        endContent={
                                            <CiShoppingTag 
                                            className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                        }
                                        label="Patient Name"
                                        variant="bordered"
                                        className="outline-primary border-primary"
                                    />
                                    <Input
                                        size="sm"
                                        isRequired
                                        endContent={
                                            <CiShoppingTag 
                                            className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                        }
                                        label="Send From"
                                        value={sendFrom}
                                        onChange={(e) => setSendFrom(e.target.value)}
                                        variant="bordered"
                                        className="outline-primary border-primary"
                                    />
                                    <Input
                                        isRequired
                                        size="sm"
                                        endContent={
                                            <CiShoppingTag 
                                            className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                        }
                                        label="Send To"
                                        value={recivedBy}
                                        onChange={(e) => setReceivedBy(e.target.value)}
                                        variant="bordered"
                                        className="outline-primary border-primary"
                                    />
                                    <Textarea 
                                    isRequired 
                                    type="text" 
                                    variant="bordered" 
                                    label="Description" 
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    />
                                    {/* <Select
                                        isRequired
                                        variant="bordered"
                                        label="Status"
                                        className="w-full"
                                        size="sm"
                                        // value={bedOccupied}
                                        // onChange={(e) => setBedOccupied(e.target.value)}
                                        defaultSelectedKeys={"Available"}
                                    >
                                        {verified.map((status, i) => (
                                            <SelectItem key={i}>
                                                {status}
                                            </SelectItem>
                                        ))}
                                    </Select> */}
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Cancel
                                    </Button>
                                    <Button color="primary" onClick={handleReferPatient}>
                                        Refer
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
            <div>
            <div>
                    <Table aria-label="Bed Table">
                        <TableHeader>
                            <TableColumn>Refferal Id</TableColumn>
                            <TableColumn>Patient Name</TableColumn>
                            <TableColumn>Send From</TableColumn>
                            <TableColumn>Send To</TableColumn>
                            <TableColumn>Reason</TableColumn>
                            <TableColumn>Status</TableColumn>
                            <TableColumn>Actions</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {refferals.map((referal:any) => (
                                <TableRow key={referal.id}>
                                    <TableCell>{referal.id}</TableCell>
                                    <TableCell>{referal.patient}</TableCell>
                                    <TableCell>{referal.Send_from}</TableCell>
                                    <TableCell>{referal.Send_to}</TableCell>
                                    <TableCell>{referal.reason}</TableCell>
                                    <TableCell>
                                        {editRefferal && editRefferal.id === referal.id ? (
                                            <Checkbox
                                                value={editRefferal.status}
                                                onChange={(e) => seteditRefferal({ ...editRefferal, status: e.target.value })}
                                            >
                                                Approve
                                            </Checkbox>
                                        ) : (
                                            referal.status ? 'Pending' : 'Approved'
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editRefferal && editRefferal.id === referal.id ? (
                                            <Button onClick={() => handleApprove(referal.id!)}>Save</Button>
                                        ) : (
                                            <>
                                                <Button color="secondary" onClick={() => seteditRefferal(referal)}>Approve</Button>
                                                <Button color="danger" onClick={() => seteditRefferal(null)}>Cancel</Button>
                                                {/* <Button color="danger" onClick={() => handleDeleteBed(bed.id!)}>Delete</Button> */}
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </main>
    )
}

export default page
