"use client";

import { DataTable } from "@/components/UI/table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import axios from "axios";
import createAxiosInstance from "@/context/axiosInstance";
import AppointmentStatusBadge from "@/components/AppointmentStatusBadge";
import { AppointmentStatus } from "@/types";

interface Appointments {
  schedule: string;
  reason: string;
  patientName: string;
  status: AppointmentStatus;
}

const AppointmentsColumns = () => {
  const [data, setData] = useState<Appointments[]>([]);
  // console.log(data);
  
  const axiosInstance = createAxiosInstance();
  const fetchAppointments = async () => {
    await axiosInstance
    .get("/appointment/patient")
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }

  useEffect(() => {
    fetchAppointments();
  }, []);

  const columns: ColumnDef<Appointments>[] = [
    {
      header: "#",
      cell: ({ row }) => {
        return <p className="text-14-medium text-black">{row.index + 1}</p>;
      },
    },
    {
      accessorKey: "patientName",
      header: "Name",
      cell: ({ row }) => {
        return <p className="text-14-medium text-black">{row.original.patientName}</p>;
      },
    },
    {
      accessorKey: "schedule",
      header: "Schedule",
      cell: ({ row }) => {
        return <p className="text-14-medium text-black">{row.original.schedule}</p>;
      },
    },
    {
      accessorKey: "reason",
      header: "Reason",
      cell: ({ row }) => {
        return <p className="text-14-medium text-black">{row.original.reason}</p>;
      },
    },
    {
      accessorKey:"status",
      header:"Status",
      cell:({ row }) =>{
        return <div className="min-w-[115px]">
          <AppointmentStatusBadge status={row.original.status}/>
        </div>
      }
    }
  ];
  return <DataTable columns={columns} data={data} />;
};

export default AppointmentsColumns;
