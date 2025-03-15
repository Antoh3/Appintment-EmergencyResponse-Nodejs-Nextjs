import clsx from "clsx";
import { statusIcon } from "@/constants";
import { Status } from "@/types";

const StatusBadge = ({ status }: { status: Status }) => {
  const Icons = statusIcon[status];

  const getColor = (status: string) => {
    switch (status) {
      case "Scheduled":
      case "Complete":
      case "Completed":
      case "Issued":
        return "text-green-500";
      case "In Progress":
      case "Pending":
      case "Accepted":
      case "Not Issued":
        return "text-blue-500";
      case "Cancelled":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };
  return (
    <div
      className={clsx("status-badge", {
        "bg-green-600/20": status === "Scheduled" || status === "Complete" || status === "Issued" ,
        "bg-blue-600/20": status === "In Progress" || status === "Pending" || status === "Not Issued",
        "bg-red-600/20": status === "Cancelled",
      })}
    >
      <Icons className={clsx("h-fit w-4 mr-2", getColor(status))} />
      <p className={clsx("text-12-semibold capitalize", getColor(status))}>
        {status}
      </p>
    </div>
  );
};

export default StatusBadge;
