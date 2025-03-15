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
import createAxiosInstance from "@/context/axiosInstance";

interface Recommendation {
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

const diagnosis = [
  {
    content: "",
    date: "2024-09-11",
    issuedBy: "Dr. Dominic",
    recommendations: "",
  },
  {
    content: "",
    date: "2024-08-01",
    issuedBy: "Dr. Neville",
    recommendations: "",
  },
  {
    content: "",
    date: "2024-09-01",
    issuedBy: "Dr. Elvis",
    recommendations: "",
  },
];

export default function page() {
  const axiosInstance = createAxiosInstance();
  const [recommendation,setRecommendation] = useState<Recommendation[]>([]);
  console.log("reccom",recommendation);
  

  useEffect(() => {
      handleFecthRecoomendation();
    })
  
    const handleFecthRecoomendation = async () => {
      const res = await axiosInstance.get('/doctor/recommendation');
      setRecommendation(res.data);
    }

  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Recommendations Records</h1>

      <div className="flex flex-col gap-8 flex-wrap items-start ">
        <Table
          aria-label="Example static collection table"
          removeWrapper
          className="bg-white md:overflow-scroll sm:overflow-scroll rounded-lg border p-2"
        >
          <TableHeader className="!bg-none">
                      <TableColumn>Issued To</TableColumn>
                      <TableColumn>Email</TableColumn>
                      <TableColumn>PhoneNumber</TableColumn>
                      <TableColumn>Gender</TableColumn>
                      <TableColumn>Issued on</TableColumn>
                      {/* <TableColumn>Type</TableColumn> */}
                      <TableColumn>Presctiptions</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {recommendation?.map((item: any, i: number) => (
                        <TableRow key={item.id}>
                          <TableCell>{item?.patient.firstName}-{item?.patient.lastName}</TableCell>
                          <TableCell>{item?.patient.email}</TableCell>
                          <TableCell>{item?.patient.phoneNumber}</TableCell>
                          <TableCell>{item?.patient.gender}</TableCell>
                          <TableCell>{item?.prescribedAt}</TableCell>
                          {/* <TableCell>{item?.type}</TableCell> */}
                          <TableCell>{item?.content}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
        </Table>
      </div>
    </main>
  );
}
