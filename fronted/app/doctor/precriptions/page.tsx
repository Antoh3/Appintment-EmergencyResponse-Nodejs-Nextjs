"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import StatusBadge from "@/components/StatusBadge";
import PrescriptionForm from "@/components/patient/PatientPrescriptionForm";
import createAxiosInstance from "@/context/axiosInstance";

interface Prescription {
    id:string;
    content:string;
    type:string;
    prescribedAt:Date;
    patient:{
        id:string
        firstName:string;
        lastName:string;
        birthDate:string;
        email:string;
        gender:string;
        phoneNumber:string;
    }
}

export default function page({ params }: { params: any }) {
  const [prescription, setPrescription] = useState<Prescription[]>([]);
  const axiosInstance = createAxiosInstance();
  const { patientId } = params;

  console.log(prescription);


  useEffect(() => {
    handleFecthPrescription();
  },[])

  const handleFecthPrescription = async () => {
    const res = await axiosInstance.get('/doctor/prescription');
    setPrescription(res.data);
  }


  return (
    <main className="flex flex-col gap-4">
      {/* <PrescriptionForm pat/> */}
      <h1 className="text-3xl font-bold">Prescription Records</h1>
      <div className="flex flex-col gap-8 flex-wrap items-start ">
        <Table
          aria-label="Example static collection table"
          removeWrapper
          className="bg-white rounded-lg border p-2"
        >
          <TableHeader className="!bg-none">
            <TableColumn>Issued To</TableColumn>
            <TableColumn>Issued on</TableColumn>
            <TableColumn>Type</TableColumn>
            <TableColumn>Presctiptions</TableColumn>
            <TableColumn>Gender</TableColumn>
            <TableColumn>Email</TableColumn>
            <TableColumn>PhoneNumber</TableColumn>
          </TableHeader>
          <TableBody>
            {prescription?.map((item: any, i: number) => (
              <TableRow key={item.id}>
                <TableCell>{item?.patient.firstName}-{item?.patient.lastName}</TableCell>
                <TableCell>{item?.prescribedAt}</TableCell>
                <TableCell>{item?.type}</TableCell>
                <TableCell>{item?.content}</TableCell>
                <TableCell>{item?.patient.gender}</TableCell>
                <TableCell>{item?.patient.email}</TableCell>
                <TableCell>{item?.patient.phoneNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
