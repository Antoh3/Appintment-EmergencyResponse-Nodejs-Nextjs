import { FaCheck } from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5";
import { FaRegHourglass } from "react-icons/fa6";
// import { AiOutlineCheckCircle } from 'react-icons/i'
import { FaRoute } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import { IoAirplaneOutline } from "react-icons/io5";
import { IoArchiveOutline } from "react-icons/io5";

export const genderOptions = [
  { key: "Male", label: "Male" },
  { key: "Female", label: "Female" },
];

export const statusIcon = {
  Scheduled: FaCheck,
  "In Progress": FaRegHourglass,
  Cancelled: IoWarningOutline,
  Pending: FaRegHourglass,
  Complete: FaCheck,
  Issued: FaCheck,
  "Not Issued": FaRegHourglass,
};

export const appointmentIcon ={
  scheduled : FaRegHourglass,
  approved: FaCheck,
  canceled: IoWarningOutline,
  active: FaCheck,
  followedup: FaCheck,
  available: IoAirplaneOutline,
  assinged: MdAssignment,
  on_route: FaRoute,
  mantainace: IoArchiveOutline,
  completed: FaCheck,
  pending: FaRegHourglass,
  accepted: FaCheck,
  rescheduled: FaRegHourglass,
  canceled_by_user: IoWarningOutline,
  canceled_by_admin: IoWarningOutline,
  canceled_by_doctor: IoWarningOutline
}
