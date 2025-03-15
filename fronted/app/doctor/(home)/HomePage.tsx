"use client";
import React from "react";
import { CardSummary } from "@/components/UI/cards/CardSummary";
import { CardUpcomingAppointment } from "@/components/UI/cards/CardUpcomingAppointment";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Pagination,
  Button,
  Tooltip,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  ModalFooter,
} from "@nextui-org/react";
import AppointmentStatusBadge from "@/components/AppointmentStatusBadge";
import { AppointmentStatus } from "@/types";
import {
  now,
  getLocalTimeZone,
  Time,
} from "@internationalized/date";
import createAxiosInstance from "@/context/axiosInstance";
import { useState, useEffect, useMemo } from "react";
import { IoWarningOutline } from "react-icons/io5";
import { FaBook, FaCheck } from "react-icons/fa";
import { message } from "antd";
import Link from "next/link";


interface Appointment {
  id?: string;
  schedule: string;
  reason: string;
  patientName: string;
  status: AppointmentStatus;
  doctor: {
    firstName: string;
    lastName: string;
  }
}

export interface Patient {
  id?: string;
  firstname: string,
  lastname: string;
  gender: string;
  status: string;
  phoneNumber: string;
  email: string;
  birthDate: string;
}

const patients = [
  {
    name: "James Doe",
    email: "james@mail.com",
    appointmentDate: "20-06-2024",
    type: "General",
    status: "active",
  },
  {
    name: "Angie Jamale",
    email: "angie@mail.com",
    appointmentDate: "20-06-2024",
    type: "General",
    status: "followedup",
  },
  {
    name: "Mary Mwoke",
    email: "mary@mail.com",
    appointmentDate: "20-06-2024",
    type: "General",
    status: "scheduled",
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
];

export default function HomePage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
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

  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [newSchedule, setNewSchedule] = useState("");
  const [cancelationReason, setCancelationReason] = useState("");
  const [patient,setPatients] = useState<Patient[]>([]);
  const axiosInstance = createAxiosInstance();
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  

 

  // console.log("All appointments",appointments);
  console.log("All patients",patient);


  useEffect(() => {
    fetchData();
    fetchAppointmentStatus();
    fetchPatients()
  },[]);

  const fetchPatients = async () => {
    const res = await axiosInstance.get("/doctor/patients")
    setPatients(res.data);
  }

  const fetchAppointmentStatus = async () => {
    const res = await axiosInstance.get('/appointment/count');
    
    console.log("Data",res.data);
    
  }

  const fetchData = async () => {
    await axiosInstance
      .get("/appointment/doctor")
      .then((response) => {
        setAppointments(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  const handleApproveAppointment = async (id: string) => {
    try {
      const res = await axiosInstance
        .patch(`http://localhost:5001/appointment/approveappointment/${id}`, { status: "approved" })
      setAppointments((prev) =>
        prev.map((appt) => (appt.id === id ? { ...appt, status: "approved" } : appt))
      );
      if (res?.status === 200) {
        message.success("Appointment approved");
      }
    } catch (error) {
      console.error("Error in approvind appointment");

    }
  }

  const handleCancelRequest = async () => {
    if (!cancelationReason.trim()) return (message.error("Cancelationreson required"))
    if (!selectedAppointment) return;

    try {
      const res = await axiosInstance
        .patch(`http://localhost:5001/appointment/cancelappointment/${selectedAppointment.id}`,
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
      const res = await axiosInstance.patch(`/appointment/rescheduleappointment/${selectedAppointment.id}`, {
        schedule: newSchedule,
      });
      fetchData()
      setAppointments((prev) =>
        prev.map((appt) =>
          appt.id === selectedAppointment.id ? { ...appt, status: "rescheduled" } : appt
        )
      );
      onRescheduleOpenChange()

      if (res?.status === 200) {
        message.success("Appointment Rescheduled")
      }
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
    }
  };

  const handleCompleteAppointment = async (id: string | any) => {
    try {
      const res = await axiosInstance
        .patch(`http://localhost:5001/appointment/completeappointment/${id}`, { status: "completed" })
      setAppointments((prev) =>
        prev.map((appt) => (appt.id === id ? { ...appt, status: "completed" } : appt))
      );
      if (res?.status === 200) {
        message.success("Appointment completed successfully");
      }
    } catch (error) {
      console.error("Error in completing appointment");

    }
  }

  const pages = Math.ceil(appointments.length / rowsPerPage);
  const paginatedAppointments = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return appointments.slice(start, end);
  }, [page, appointments]);

  return (
    <main className="flex flex-col gap-4 mx-0 px-0 w-full">
      <div className="grid md:grid-cols-3 gap-4 flex-wrap items-start ">
        <div className="md:col-span-3 flex flex-col gap-4">
          <div className="grid md:grid-cols-3  gap-4 flex-wrap">
            <CardSummary title="Total Patients" value="50" />
            <CardSummary title="Total Appointments" value="20" />
            <CardSummary title="Upcoming Appointments" value="5 Today" />
          </div>
          <div className="md:col-span-3 flex flex-col flex-wrap gap-4" >
            {/* {appointments?.map((item: any, i: any) => ( */}
            <div className="grid md:grid-cols-2  gap-4 flex-wrap">
              {/* <div className="mb-10"> */}
              <div >
                <CardUpcomingAppointment
                  date={now(getLocalTimeZone())}
                  startTime={new Time(11, 30)}
                  endTime={new Time(12, 30)}
                  location={"Online"}
                  patient={{
                    name: "Emmanuel Muuo",
                    type: "Adult",
                    image: "/images/dr-green.png",
                  }}
                />
              </div>

              <div >
                <CardUpcomingAppointment
                  date={now(getLocalTimeZone())}
                  startTime={new Time(11, 30)}
                  endTime={new Time(12, 30)}
                  location={"Online"}
                  patient={{
                    name: "Emmanuel Muuo",
                    type: "Adult",
                    image: "/images/dr-green.png",
                  }}
                />
              </div>
            </div>

            {/* ))} */}
          </div>
          {/* start appointments */}
          <div>
            <h1 className="bold">Booked Appointments</h1>
            <Table
              aria-label="Example static collection table"
              removeWrapper
              className="grid md:overflow-scroll sm:overflow-scroll gap-8 flex-wrap w-full bg-white rounded-lg border p-2 mr-2"
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
                <TableColumn>Scheduled Date & Time</TableColumn>
                <TableColumn>Reason</TableColumn>
                <TableColumn>Status</TableColumn>
                <TableColumn>Actions</TableColumn>
              </TableHeader>
              <TableBody items={paginatedAppointments} emptyContent={"No appointments yet."}>
                {appointments?.map((item: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell>{item?.patientName}</TableCell>
                    <TableCell>{new Date(item?.schedule).toLocaleTimeString()}</TableCell>
                    <TableCell>{item?.reason}</TableCell>
                    <TableCell>
                      <span
                        className={
                          " rounded w-full block text-center"
                        }
                      >
                        <AppointmentStatusBadge status={item?.status} />
                      </span>
                    </TableCell>
                    <TableCell >
                      <>
                        <Tooltip
                          showArrow={true}
                          color="success"
                          content={item.status === "approved" ? "Appointment approved" : "Approve appointment"}
                          placement="top-start">
                          <Button
                            isIconOnly
                            color="success"
                            variant="faded"
                            aria-label="Approve Appointment"
                            className="m-1 bg-grren-200"
                            isDisabled={item.status === "canceled" || item.status === "approved" || item.status === "completed"}
                            onClick={() => handleApproveAppointment(item.id)}
                          >
                            <FaCheck />
                          </Button>
                        </Tooltip>
                        <Tooltip
                          showArrow={true}
                          content={item.status === "rescheduled" ? "Appointment rescheduled" : "Reschedule appointment"}
                          color="warning"
                          placement="top-start">
                          <Button
                            isIconOnly
                            // color="danger"
                            aria-label="Reschedule Appointment"
                            // className="m-1 bg-yellow-200"
                            // disabled={item.status === "canceled"}
                            isDisabled={item.status === "canceled" || item.status === "completed"}
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
                          content={item.status === "canceled" ? "Apppointment canceled" : "Cancel appointment"}
                          placement="top-end">
                          <Button
                            isIconOnly
                            // color="danger"
                            variant="faded"
                            aria-label="Cancel Appointment"
                            className="m-1 bg-red-500"
                            isDisabled={item.status === "canceled" || item.status === "completed"}
                            onPress={() => {
                              setSelectedAppointment(item)
                              onCancelOpen()
                            }}
                          >
                            <IoWarningOutline />
                          </Button>
                        </Tooltip>
                        <Tooltip
                          showArrow={true}
                          color="primary"
                          content={item.status === "completed" ? "Appointment completed" : "Complete appointment"}
                          placement="top-end">
                          <Button
                            isIconOnly
                            // color="danger"
                            variant="bordered"
                            aria-label="Cancel Appointment"
                            className="m-1 bg-blue-500"
                            isDisabled={item.status !== "approved"}
                            onClick={() => handleCompleteAppointment(item.id)}
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
                      <Button color="danger" onClick={handleCancelRequest}>
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
          {/* end appointments */}

          {/* start patient */}
          <div>
            <h1 className="bold">All Patients</h1>
            <Table
              aria-label="Example static collection table"
              removeWrapper
              className="bg-white md:overflow-scroll sm:overflow-scroll rounded-lg border p-2 mr-2"
            >
              <TableHeader className="!bg-none">
                <TableColumn>Patient Name</TableColumn>
                <TableColumn>Email Address</TableColumn>
                <TableColumn>Date of Birth</TableColumn>
                <TableColumn>Gender</TableColumn>
                <TableColumn>Status</TableColumn>
                <TableColumn>Actions</TableColumn>
              </TableHeader>
              <TableBody  emptyContent={"No patients yet."}>
                {patient?.map((item: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell>{item?.firstName}-{item?.lastName}</TableCell>
                    <TableCell>{item?.email}</TableCell>
                    <TableCell>{item?.birthDate}</TableCell>
                    <TableCell>{item?.gender}</TableCell>
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
          {/* end patient */}
        </div>

        {/* <div >
          <CardUpcomingAppointment
            date={now(getLocalTimeZone())}
            startTime={new Time(11, 30)}
            endTime={new Time(12, 30)}
            location={"Online"}
            patient={{
              name: "Emmanuel Muuo",
              type: "Adult",
              image: "/images/dr-green.png",
            }}
          />
        </div> */}

      </div>
    </main>
  );
}
