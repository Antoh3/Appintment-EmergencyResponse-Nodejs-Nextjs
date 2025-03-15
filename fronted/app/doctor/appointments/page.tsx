"use client";
import React from "react";
import { CardSummary } from "@/components/UI/cards/CardSummary";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Button,
  Pagination,
  Checkbox,
  useDisclosure,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  ModalFooter,
  ModalContent
} from "@nextui-org/react";
import StatusBadge from "@/components/StatusBadge";
import { Tooltip } from "@nextui-org/react";
import { FaCheck } from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5";
import { RiDeleteBin6Line, RiEdit2Line, RiLoopRightFill } from "react-icons/ri";
import { useEffect, useState, useMemo } from "react";
import { AppointmentStatus } from "@/types";
import createAxiosInstance from "@/context/axiosInstance";
import AppointmentStatusBadge from "@/components/AppointmentStatusBadge";
import { message } from "antd";
import { now, getLocalTimeZone, Time } from "@internationalized/date";

const patients = [
  {
    name: "James Doe",
    appointmentDate: "20-06-2024",
    status: "Scheduled",
    duration: "30mins",
    time: "10:00AM",
    // type: "General",
  },
  {
    name: "Angie Jamale",
    appointmentDate: "20-06-2024",
    status: "Cancelled",
    duration: "30mins",
    time: "10:00AM",
    // type: "General",
  },
  {
    name: "Mary Mwoke",
    appointmentDate: "20-06-2024",
    status: "Pending",
    duration: "30mins",
    time: "10:00AM",
    // type: "General",
  },
];

interface Appointment {
  id?: string;
  schedule: string;
  reason: string;
  patientName: string;
  status: string;
  doctor: {
    firstName: string,
    lastName: string,
  }
}

export default function page() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  // const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
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
  const [status,setStatus] = useState({
    total:0,
    formattesStatus:{
      scheduled:0,
      rescheduled:0,
      approved:0,
      canceled:0,
      completed:0,
    }
  })
  console.log("Status",status);
  
  const axiosInstance = createAxiosInstance();
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  // console.log("All appointments",appointments);


  useEffect(() => {
    fetchData();
    fetchAppointmentStatus();
  },[]);

  const fetchAppointmentStatus = async () => {
    const res = await axiosInstance.get('/appointment/count');
    
    setStatus(res.data)
    
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
        .patch(`/appointment/approveappointment/${id}`, { status: "approved" })
      setAppointments((prev) =>
        prev.map((appt) => (appt.id === id ? { ...appt, status: "approved" } : appt))
      );
      // setStatus()

      fetchData();
      fetchAppointmentStatus();
      if (res?.status === 200) {
        message.success("Appointment approved");
      }
    } catch (error) {
      console.error("Error in approving appointment");

    }
  }

  const handleCancelRequest = async () => {
    if (!cancelationReason.trim()) return (message.error("Cancelationreson required"))
    if (!selectedAppointment) return;

    try {
      const res = await axiosInstance
        .patch(`/appointment/cancelappointment/${selectedAppointment.id}`,
          { cancelationReason });

      setAppointments((prev) =>
        prev.map((appt) =>
          appt.id === selectedAppointment.id ? { ...appt, status: "canceled" } : appt
        )
      );
     
      onCancelOpenChange();

      fetchData();
      fetchAppointmentStatus();
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
      setAppointments((prev) =>
        prev.map((appt) =>
          appt.id === selectedAppointment.id ? { ...appt, status: "rescheduled" } : appt
        )
      );
      // setStatus(res.data);
      onRescheduleOpenChange()
      fetchData();
      fetchAppointmentStatus();

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
        .patch(`/appointment/completeappointment/${id}`, { status: "completed" })
      setAppointments((prev) =>
        prev.map((appt) => (appt.id === id ? { ...appt, status: "completed" } : appt))
      );
      // setStatus(res.data);

      fetchData();
      fetchAppointmentStatus();
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
    <main className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Appointments</h1>

      <div className="flex flex-col gap-4 flex-wrap items-start ">
        <div className="grid md:grid-cols-3 sm:grid-cols-2  gap-8 flex-wrap w-full">
          <CardSummary title="Total Appointments" value={status.total ? status.total : 0} />
          <CardSummary title="Completed Appointments" value={status.formattesStatus.completed ?  status.formattesStatus.completed : 0} />
          <CardSummary title="Scheduled Appointments" value={status.formattesStatus.scheduled ? status.formattesStatus.scheduled : 0} />
          <CardSummary title="Approved Appointments" value={status.formattesStatus.approved  ?  status.formattesStatus.approved : 0} />
          <CardSummary title="Rescheduled Appointments" value={status.formattesStatus.rescheduled ?  status.formattesStatus.rescheduled : 0} />
          <CardSummary title="Cancelled Appointments" value={status.formattesStatus.canceled ?  status.formattesStatus.canceled : 0} />
        </div>

        <Table
          aria-label="Example static collection table"
          removeWrapper
          className="grid md:overflow-scroll sm:overflow-scroll gap-8 flex-wrap w-full bg-white rounded-lg border p-2 "
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
            <TableColumn>PatientName</TableColumn>
            <TableColumn>Scheduled Date & time</TableColumn>
            <TableColumn>Reason</TableColumn>
            <TableColumn>status</TableColumn>
            {/* <TableColumn>Time</TableColumn> */}
            <TableColumn>Action</TableColumn>
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
                      "rounded w-full block text-center"
                    }
                  >
                    <AppointmentStatusBadge status={item?.status} />
                  </span>
                </TableCell>
                <TableCell className="">
                  <>
                    <Tooltip
                      showArrow={true}
                      color="success"
                      content={item.status === "approved" ? "Approved" : "Approve"}
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
                      content={item.status === "rescheduled" ? "Rescheduled" : "Reschedule"}
                      color="warning"
                      placement="top-start">
                      <Button
                        isIconOnly
                        // color="danger"
                        aria-label="Reschedule Appointment"
                        // className="m-1 bg-yellow-200"
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
                      content={item.status === "canceled" ? "canceled" : "cancel"}
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
                        className="m-1 bg-blue-400"
                        isDisabled={item.status !== "approved"}
                        onPress={() => {
                          handleCompleteAppointment(item.id)
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
    </main>
  );
}
