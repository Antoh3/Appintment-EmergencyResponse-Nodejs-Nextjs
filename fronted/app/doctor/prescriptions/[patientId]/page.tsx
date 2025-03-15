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

const prescriptions = [
  {
    status: "Not Issued",
    pharmacy: "Lex pharmacy",
    issuedBy: "Dr. Dominic",
    issuedAt: "",
    receivedAt: "",
  },
  {
    status: "Issued",
    pharmacy: "Aga khan pharmacy",
    issuedBy: "Dr. Elvis",
    issuedAt: "3:00 PM",
    receivedAt: "3:00 PM",
  },
  {
    status: "Not Issued",
    pharmacy: "Sage pharmacy",
    issuedBy: "Dr. Neville",
    issuedAt: "",
    receivedAt: "",
  },
];

export default function page({ params }: { params: any }) {
  const [prescription, setPrescription] = useState([]);
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
      <PrescriptionForm patientId={patientId} />
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
                      <TableColumn>PhoneNumber</TableColumn>
                      {/* <TableColumn>Type</TableColumn> */}
                      <TableColumn>Presctiptions</TableColumn>
                      {/* <TableColumn>Gender</TableColumn> */}
                      {/* <TableColumn>Email</TableColumn> */}
                    </TableHeader>
                    <TableBody>
                      {prescription?.map((item: any, i: number) => (
                        <TableRow key={item.id}>
                          <TableCell>{item?.patient.firstName}-{item?.patient.lastName}</TableCell>
                          <TableCell>{item?.prescribedAt}</TableCell>
                          {/* <TableCell>{item?.type}</TableCell> */}
                          <TableCell>{item?.patient.phoneNumber}</TableCell>
                          <TableCell>{item?.content}</TableCell>
                          {/* <TableCell>{item?.patient.gender}</TableCell> */}
                          {/* <TableCell>{item?.patient.email}</TableCell> */}
                        </TableRow>
                      ))}
                    </TableBody>
        </Table>
      </div>
    </main>
  );
}
