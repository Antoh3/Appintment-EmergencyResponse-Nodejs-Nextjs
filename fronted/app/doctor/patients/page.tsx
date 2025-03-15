"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import createAxiosInstance from "@/context/axiosInstance";
import { Patient } from "../(home)/HomePage";
import AppointmentStatusBadge from "@/components/AppointmentStatusBadge";
import { FaCheck } from "react-icons/fa";
import Link from "next/link";
import { FaBook } from "react-icons/fa";


export default function page() {
  const [patient, setPatients] = useState<Patient[]>([]);
  const axiosInstance = createAxiosInstance();

  useEffect(() => {
    fetchPatients();
  },[]);

  const fetchPatients = async () => {
    const res = await axiosInstance.get("/doctor/patients")
    setPatients(res.data);
  }

  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">All Patients</h1>

      <div className="flex flex-col gap-8 flex-wrap items-start ">
        <Table
          aria-label="Example static collection table"
          removeWrapper
          className="bg-white rounded-lg border p-2"
        >
          <TableHeader className="!bg-none">
            <TableColumn>Patient Name</TableColumn>
            <TableColumn>Email Address</TableColumn>
            <TableColumn>Date of Birth</TableColumn>
            <TableColumn>Gender</TableColumn>
            <TableColumn>PhoneNumber</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No patients yet."}>
            {patient?.map((item: any, i: number) => (
              <TableRow key={i}>
                <TableCell>{item?.firstName}-{item?.lastName}</TableCell>
                <TableCell>{item?.email}</TableCell>
                <TableCell>{item?.birthDate}</TableCell>
                <TableCell>{item?.gender}</TableCell>
                <TableCell>{item?.phoneNumber}</TableCell>
                <TableCell>
                  <span
                    className={
                      " px-2 py-1 rounded w-full block text-center"
                    }
                  >
                    <AppointmentStatusBadge status={item?.status} />
                  </span>
                </TableCell>
                <TableCell >
                  <>
                    <Tooltip
                      showArrow={true}
                      content={item.status === "rescheduled" ? "Rescheduled" : "Reschedule"}
                      color="warning"
                      placement="top-start">
                      <Button
                        isIconOnly
                        // color="danger"
                        aria-label="Reschedule patient"
                      // className="m-1 bg-yellow-200"
                      // disabled={item.status === "canceled"}
                      // onPress={() => {
                      //   setSelectedAppointment(item)
                      //   onRescheduleOpen()
                      // }}
                      >
                        {/* <RiEdit2Line /> */}
                        📅
                      </Button>
                    </Tooltip>
                    <Tooltip
                      showArrow={true}
                      color="danger"
                      content={item.status === "canceled" ? "FollowedUp" : "FollowUp"}
                      placement="top-end">
                      <Button
                        isIconOnly
                        // color="danger"
                        variant="faded"
                        aria-label="FollowUp patient"
                        className="m-1 bg-blue-400"
                      // isDisabled={item.status === "canceled"}
                      // onPress={() => {
                      //   setSelectedAppointment(item)
                      //   onCancelOpen()
                      // }}
                      >
                        <FaCheck />
                      </Button>
                    </Tooltip>
                    <Tooltip
                      showArrow={true}
                      color="success"
                      content={item.status === "active" ? "Write presctiption/recommendation" : "Write presctiption/recommendation"}
                      placement="top-end">
                      <Button
                        isIconOnly
                        // color="danger"
                        variant="faded"
                        aria-label="View patient data"
                        className="m-1 bg-green-300"
                      // isDisabled={item.status === "canceled"}
                      // onPress={() => {
                      //   setSelectedAppointment(item)
                      //   onCancelOpen()
                      // }}
                      >
                        <Link href={`/doctor/prescriptions/${item?.id}`}><FaBook /></Link>
                      </Button>
                    </Tooltip>
                  </>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
