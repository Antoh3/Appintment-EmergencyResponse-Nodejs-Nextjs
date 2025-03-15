"use client"
import { CardSummary } from "@/components/UI/cards/CardSummary";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input, Select, SelectItem, TableHeader, TableColumn, TableBody, TableRow, TableCell, Checkbox } from "@nextui-org/react";
import { Table } from '@nextui-org/react';
import { CiShoppingTag } from "react-icons/ci";
import Link from "next/link";
import { Key, useEffect, useMemo, useState } from "react";
import { Bed, addBed, updateBed, deleteBed, getAllBeds, fetchBedStatus } from "../bed";
import { toast } from 'react-hot-toast'

export default function Beds(event: any) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [beds, setBeds] = useState<Bed[]>([]);
    console.log(beds);
    const [newBed, setNewBed] = useState<Bed>({ bed_number: '', ward_assigned: '', bed_type: '', occupied: false });
    const [editBed, setEditBed] = useState<Bed | null>(null);
    const [bedStatus, setBedStatus] = useState({
        AvailableBeds: 0,
        OccupiedBeds: 0,
        TotalBeds: 0
    });


    useEffect(() => {
        fetchBeds()
    }, [])

    const fetchBeds = async () => {
        try {
            const status = await fetchBedStatus()
            const data = await getAllBeds();
            setBeds(data);
            setBedStatus(status)
        } catch (error) {
            console.error('Error fetching beds:', error);
        }
    };

    const handleAddBed = async () => {
        try {
            await addBed(newBed);
            onClose()
            setNewBed({ bed_number: '', ward_assigned: '', bed_type: '', occupied: false });
            toast.success('Bed added')
            fetchBeds();
        } catch (error) {
            console.error('Error adding bed:', error);
        }
    };



    // const { checked } = event.target;

    const handleUpdateBed = async (bed_id: number) => {
        try {
          await updateBed(bed_id, editBed!);
          toast.success('Bed updated',{
            duration:5000
          })
          setEditBed(null);
          fetchBeds();
        } catch (error) {
          console.error('Error updating bed:', error);
        }
      };
    
      const handleDeleteBed = async (bed_id: number) => {
        try {
          await deleteBed(bed_id);
          fetchBeds();
          toast.error("Bed deleted",{
            duration:5000
          })
        } catch (error) {
          console.error('Error deleting bed:', error);
        }
      };
    


    // const occupied = ["true", "false"]

      

    return (
        <main className="flex px-11 py-5 flex-col gap-4">
            <div className="grid grid-cols-3 gap-4 w-full">
                <CardSummary
                    title="All Beds"
                    value={bedStatus.TotalBeds}
                    className="cursor-pointer"
                ></CardSummary>
                <CardSummary
                    title="Occupied"
                    value={bedStatus.OccupiedBeds}
                    className="cursor-pointer"
                />
                <CardSummary
                    title="Available"
                    value={bedStatus.AvailableBeds}
                    className="cursor-pointer"
                />
            </div>
            <div className="flex justify-between">
                <h2 className="capitalize text-lg bold">All Beds</h2>
                <Button variant="solid" color="primary" className="capitalize" onPress={onOpen}>Add Bed</Button>
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
                                        value={newBed.bed_number}
                                        onChange={(e) => setNewBed({ ...newBed, bed_number: e.target.value })}
                                        endContent={
                                            <CiShoppingTag
                                                className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                        }
                                        label="Bed Number"
                                        variant="bordered"
                                        className="outline-primary border-primary"
                                    />
                                    <Input
                                        size="sm"
                                        endContent={
                                            <CiShoppingTag
                                                className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                        }
                                        label="Ward Assigned"
                                        value={newBed.ward_assigned}
                                        onChange={(e) => setNewBed({ ...newBed, ward_assigned: e.target.value })}
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
                                        label="Bed Type"
                                        value={newBed.bed_type}
                                        onChange={(e) => setNewBed({ ...newBed, bed_type: e.target.value })}
                                        variant="bordered"
                                        className="outline-primary border-primary"
                                    />
                                    <Checkbox
                                        isSelected={newBed.occupied}
                                        onChange={(isSelected: any) => setNewBed({ ...newBed, occupied: isSelected })}
                                    >
                                        Occupied
                                    </Checkbox>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Cancel
                                    </Button>
                                    <Button color="primary" onClick={handleAddBed}>
                                        Add
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
                <div>
                    <Table aria-label="Bed Table">
                        <TableHeader>
                            <TableColumn>Bed id</TableColumn>
                            <TableColumn>Bed Number</TableColumn>
                            <TableColumn>Ward Assigned</TableColumn>
                            <TableColumn>Bed Type</TableColumn>
                            <TableColumn>Occupied</TableColumn>
                            <TableColumn>Actions</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {beds.map((bed) => (
                                <TableRow key={bed.id}>
                                    <TableCell>{bed.id}</TableCell>
                                    <TableCell>
                                        {editBed && editBed.id === bed.id ? (
                                            <Input
                                                value={editBed.bed_number}
                                                onChange={(e) => setEditBed({ ...editBed, bed_number: e.target.value })}
                                            />
                                        ) : (
                                            bed.bed_number
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editBed && editBed.id === bed.id ? (
                                            <Input
                                                value={editBed.ward_assigned}
                                                onChange={(e) => setEditBed({ ...editBed, ward_assigned: e.target.value })}
                                            />
                                        ) : (
                                            bed.ward_assigned
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editBed && editBed.id === bed.id ? (
                                            <Input
                                                value={editBed.bed_type}
                                                onChange={(e) => setEditBed({ ...editBed, bed_type: e.target.value })}
                                            />
                                        ) : (
                                            bed.bed_type
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editBed && editBed.id === bed.id ? (
                                            <Checkbox
                                                isSelected={editBed.occupied}
                                                onChange={(isSelected : any) => setEditBed({ ...editBed, occupied: isSelected })}
                                            >
                                                Occupied
                                            </Checkbox>
                                        ) : (
                                            bed.occupied ? 'true' : 'false'
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editBed && editBed.id === bed.id ? (
                                            <Button onClick={() => handleUpdateBed(bed.id!)}>Save</Button>
                                        ) : (
                                            <>
                                                <Button className="m-1" onClick={() => setEditBed(bed)}>Edit</Button>
                                                <Button color="danger" onClick={() => handleDeleteBed(bed.id!)}>Delete</Button>
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
