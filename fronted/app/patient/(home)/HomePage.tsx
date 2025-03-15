"use client";
import React from "react";
import { CardSummary } from "@/components/UI/cards/CardSummary";
import { CardUpcomingAppointment } from "@/components/UI/cards/UpcommingPatientAppointment";
import { RequestedAmbulanceCard } from "@/components/UI/cards/RequestedAmbulanceCard";
import {
  Button,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { Tooltip } from "@nextui-org/react";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import AppointmentStatusBadge from "@/components/AppointmentStatusBadge";
// import { fetchAppointments,Appointment } from "../appointments";
import { useState, useEffect, useMemo } from "react";


import {
  now,
  getLocalTimeZone,
  Time,
} from "@internationalized/date";
import { AppointmentStatus } from "@/types";
import createAxiosInstance from "@/context/axiosInstance";
import axios from "axios";
import { FaCheck } from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5";
import { message } from "antd";

interface Appointment {
  id?: string;
  schedule: string;
  reason: string;
  patientName: string;
  status: AppointmentStatus;
  doctor: {
    firstName: string,
    lastName: string,
  }
}

interface Ambulance {
  id?: string;
  aidCarType: string;
  status: string;
  ambulance: {
    owner: string,
    name: string
  },
  patient: {
    firstName: string,
    lastName: string
  }
}


const patients = [
  {
    name: "James Doe",
    email: "james@mail.com",
    appointmentDate: "20-06-2024",
    type: "General",
    status: "assigned",
  },
  {
    name: "Angie Jamale",
    email: "angie@mail.com",
    appointmentDate: "20-06-2024",
    type: "General",
    status: "available",
  },
  {
    name: "Mary Mwoke",
    email: "mary@mail.com",
    appointmentDate: "20-06-2024",
    type: "General",
    status: "on_route",
  },
  {
    name: "Mary Mwoke",
    email: "mary@mail.com",
    appointmentDate: "20-06-2024",
    type: "General",
    status: "mantainance",
  },
];
const appointments = [
  {
    name: "James Doe",
    email: "james@mail.com",
    appointmentDate: "20-06-2024",
    type: "General",
    status: "scheduled",
  },
  {
    name: "Angie Jamale",
    email: "angie@mail.com",
    appointmentDate: "20-06-2024",
    type: "General",
    status: "approved",
  },
  {
    name: "Mary Mwoke",
    email: "mary@mail.com",
    appointmentDate: "20-06-2024",
    type: "General",
    status: "canceled",
  },
  {
    name: "Mary Mwoke",
    email: "mary@mail.com",
    appointmentDate: "20-06-2024",
    type: "General",
    status: "Completed",
  },
];

export default function HomePage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [ambulances, setAmbulances] = useState<Ambulance[]>([]);
  console.log(ambulances);

  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [newSchedule, setNewSchedule] = useState("");
  const [cancelationReason, setCancelationReason] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<Ambulance | null>(null)

  const {
    isOpen: isRescheduleOpen,
    onOpen: onRescheduleOpen,
    onOpenChange: onRescheduleOpenChange,
    onClose: onRescheduleClose
  } = useDisclosure();

  const {
    isOpen: isCancelOpen,
    onOpen: onCancelOpen,
    onOpenChange: onCancelOpenChange,
    onClose: onCancelClose
  } = useDisclosure();


  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const axiosInstance = createAxiosInstance();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axiosInstance
      .get("/appointment/patient")
      .then((response) => {
        setAppointments(response.data);
        // console.log("Data",response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    await axiosInstance
      .get("/ambulance/ambulancerequests")
      .then((response) => {
        setAmbulances(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  const handleCancelAppointment = async () => {
    if (!cancelationReason.trim()) return (message.error("Cancelationreson required"))
    if (!selectedAppointment) return;

    try {
      const res = await axiosInstance
        .patch(`http://localhost:5001/patient/cancelappointment/${selectedAppointment.id}`,
          { cancelationReason });

      setAppointments((prev) =>
        prev.map((appt) =>
          appt.id === selectedAppointment.id ? { ...appt, status: "canceled" } : appt
        )
      );
      onCancelOpenChange();

      if (res?.status === 200) {
        message.success("Appointment canceled");
      }

    } catch (error) {
      console.error("Error in canceling appointment", error);

    }
  }

  const rescheduleAppointment = async () => {
    if (!newSchedule.trim()) return (message.error("New appointment time and date required"))
    if (!selectedAppointment || !newSchedule) return;

    try {
      const res = await axiosInstance.patch(`/patient/rescheduleappointment/${selectedAppointment.id}`, {
        schedule: newSchedule,
      });

      setAppointments((prev) =>
        prev.map((appt) =>
          appt.id === selectedAppointment.id ? { ...appt, status: "rescheduled" } : appt
        )
      );
      onRescheduleOpenChange()
      fetchData()
      if (res?.status === 200) {
        message.success("Appointment Rescheduled")
      }
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
    }
  };

  const handleCancelAmbulanceRequest = async (id: string | any) => {
    try {
      const res = await axiosInstance
        .patch(`http://localhost:5001/patient/cancelrequest/${id}`, { status: "canceled" })
      setAmbulances((prev) =>
        prev.map((appt) => (appt.id === id ? { ...appt, status: "canceled" } : appt))
      );

      fetchData();

      if (res?.status === 200) {
        message.success("Request canceled");
      }
    } catch (error) {
      console.error("Error in canceling request");

    }
  }

  const pages = Math.ceil(appointments.length / rowsPerPage);
  const paginatedAppointments = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return appointments.slice(start, end);
  }, [page, appointments]);


  const pages1 = Math.ceil(ambulances.length / rowsPerPage);
  const paginatedAmbulanceRequests = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return ambulances.slice(start, end);
  }, [page, ambulances]);


  return (
    <main className="flex flex-col gap-4">
      <div className="grid md:grid-cols-3 gap-4 flex-wrap items-start ">
        <div className="md:col-span-3 flex flex-col flex-wrap gap-4">
          <div className="grid md:grid-cols-4  gap-4 flex-wrap">
            {/* <CardSummary title="Total Patients" value="50" /> */}
            <CardSummary title="Total Appointments" value="20" />
            <CardSummary title="Finished Appointments" value="20" />
            <CardSummary title="Upcoming Appointments" value="5  Today" />
            <CardSummary title="Canceled Appointments" value="5  Today" />
          </div>

          {/* start upcommingappointments cards */}

          <div className="md:col-span-3 flex flex-col flex-wrap gap-4" >
            {/* {appointments?.map((item: any, i: any) => ( */}
            <div className="grid md:grid-cols-2  gap-4 flex-wrap">
              {/* <div className="mb-10"> */}
              <CardUpcomingAppointment
                date={now(getLocalTimeZone())}
                // date={item.schedule}
                startTime={new Time(11, 30)}
                endTime={new Time(12, 30)}
                // location={"Online"}
                patient={{
                  name: `Dr. Emmanuel`,
                  // type: "Adult",
                  image: "/images/dr-cameron.png",
                }}
              />

              {/* </div>
              <div> */}
              <RequestedAmbulanceCard
                date={now(getLocalTimeZone())}
                // date={da}
                // startTime={new Time(11, 30)}
                // endTime={new Time(12, 30)}
                // location={"Online"}
                ambulance={{
                  name: `City Ambulance`,
                  // type: "Adult",
                  image: "/media/homepage_ambulance.webp",
                }}
              />
              {/* </div> */}
            </div>

            {/* ))} */}
          </div>


          {/* start appointments table */}
          <div>
            <h1>All Appointments</h1>
            <Table
              aria-label="Example static collection table"
              removeWrapper
              className="bg-white rounded-lg border p-2 gap-2"
              selectionMode="single" bottomContent={
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
              }>
              <TableHeader className="!bg-none">
                <TableColumn>Patient Name</TableColumn>
                <TableColumn>Dr. Name</TableColumn>
                <TableColumn>Appointment Date</TableColumn>
                <TableColumn>Reason</TableColumn>
                <TableColumn>Status</TableColumn>
                <TableColumn>Action</TableColumn>

              </TableHeader>
              <TableBody items={paginatedAppointments} emptyContent={"No appointments yet."}>
                {appointments?.map((item: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell>{item?.patientName}</TableCell>
                    <TableCell>{`Dr. ${item.doctor.firstName}`}</TableCell>
                    <TableCell>{item?.schedule}</TableCell>
                    <TableCell>{item?.reason}</TableCell>
                    {/* <TableCell>{item?.type}</TableCell> */}
                    <TableCell>
                      <span
                        className={
                          " px-2 py-1 rounded w-30 bordered block text-center"
                        }
                      >
                        <AppointmentStatusBadge status={item?.status} />
                      </span>
                    </TableCell>
                    <TableCell >
                      <>
                        <Tooltip
                          showArrow={true}
                          content={item.status === "rescheduled" ? "Appointment rescheduled" : "Reschedule appointment"}
                          color="warning"
                          placement="top-start">
                          <Button
                            isIconOnly
                            // color="danger"
                            variant="bordered"
                            aria-label="Reschedule appointment"
                            // className="m-1 bg-yellow-200"
                            disabled={item.status === "canceled"}
                            onPress={() => {
                              setSelectedAppointment(item)
                              onRescheduleOpen()
                            }}
                          >
                            {/* <RiEdit2Line /> */}
                            📅
                          </Button>
                        </Tooltip>
                        <Tooltip
                          showArrow={true}
                          color="danger"
                          content={item.status === "canceled" ? "Appointment canceled" : "Cancel appointment"}
                          placement="top-end">
                          <Button
                            isIconOnly
                            // color="danger"
                            variant="bordered"
                            aria-label="Cancel Appointment"
                            className="m-1 bg-red-200"
                            isDisabled={item.status === "canceled"}
                            onPress={() => {
                              setSelectedAppointment(item)
                              onCancelOpen()
                            }}
                          >
                            <IoWarningOutline />
                          </Button>
                        </Tooltip>
                      </>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* Cancellation Modal */}
            <Modal isOpen={isCancelOpen} onOpenChange={onCancelOpenChange} onClose={onCancelClose}>
              <ModalContent>
                {(onCancelClose) => (
                  <>
                    <ModalHeader>Cancel Appointment</ModalHeader>
                    <ModalBody>
                      <p>Are you sure you want to cancel this appointment?</p>
                      <Input
                        required
                        type="text"
                        label="Cancellation Reason"
                        onChange={(e) => setCancelationReason(e.target.value)}
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" onClick={handleCancelAppointment}>
                        Confirm
                      </Button>
                      <Button onPress={onCancelClose}>
                        Close
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>

            {/* Reschedule Modal */}
            <Modal isOpen={isRescheduleOpen} onOpenChange={onRescheduleOpenChange} onClose={onRescheduleClose}>
              <ModalContent>
                {(onRescheduleClose) => (
                  <>
                    <ModalHeader>Reschedule Appointment</ModalHeader>
                    <ModalBody>
                      <p>Select a new date and time:</p>
                      <Input required type="datetime-local" onChange={(e) => setNewSchedule(e.target.value)} />
                    </ModalBody>
                    <ModalFooter>
                      <Button color="warning" onClick={rescheduleAppointment}>
                        Reschedule
                      </Button>
                      <Button onPress={onRescheduleClose}>
                        Close
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>

          {/* start ambulance requests table */}
          <div>
            <h1>Ambulance Requests</h1>
            <Table
              aria-label="Example static collection table"
              removeWrapper
              className="bg-white rounded-lg border p-2"
              selectionMode="single" bottomContent={
                <div className="flex w-full justify-center">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages1}
                    onChange={(page) => setPage(page)}
                  />
                </div>
              }>
              <TableHeader className="!bg-none">
                <TableColumn>Patient Name</TableColumn>
                <TableColumn>Ambulance Name</TableColumn>
                <TableColumn>Ambulance Owner</TableColumn>
                <TableColumn>Ambulance type</TableColumn>
                <TableColumn>Status</TableColumn>
                <TableColumn>Action</TableColumn>
              </TableHeader>
              <TableBody items={paginatedAmbulanceRequests} emptyContent={"No ambulancerequests yet."}>
                {ambulances?.map((item: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell>{`${item.patient.firstName}-${item.patient.lastName}`}</TableCell>
                    <TableCell>{item?.ambulance.name}</TableCell>
                    <TableCell>{item?.ambulance.owner}</TableCell>
                    <TableCell>{item?.aidCarType}</TableCell>
                    {/* <TableCell>{item?.type}</TableCell> */}
                    <TableCell>
                      <span
                        className={
                          " px-2 py-1 rounded w-full block text-center"
                        }
                      >
                        <AppointmentStatusBadge status={item?.status} />
                      </span>
                    </TableCell>
                    <TableCell>
                      <Tooltip
                        showArrow={true}
                        color="danger"
                        content={item.status === "canceled" ? "Canceled" : "Cancel"}
                        placement="top-end">
                        <Button
                          isIconOnly
                          // color="danger"
                          variant="bordered"
                          aria-label="Cancel Appointment"
                          className="m-1 bg-red-200"
                          isDisabled={item.status === "canceled"}
                          onPress={() => {
                            handleCancelAmbulanceRequest(item.id)
                          }}
                        >
                          <IoWarningOutline />
                        </Button>
                      </Tooltip>
                      <Tooltip
                        showArrow={true}
                        color="success"
                        content={item.status !== "canceled" ? "TrackAmbulance" : "Request Canceled"}
                        placement="top-end">
                        <Button
                          isIconOnly
                          color="primary"
                          variant="faded"
                          aria-label="View patient data"
                          className="m-1 bg-green-300"
                        >
                          <Link href={`/patient/track/${item?.id}`}>🚑</Link>
                        </Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* end ambulance requests */}

        </div>
      </div>
    </main>
  );
}
