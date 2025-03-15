"use client";

import { DataTable } from "@/components/UI/table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import axios from "axios";
import StatusBadge from "@/components/StatusBadge";
import { Status } from "@/types";
import createAxiosInstance from "@/context/axiosInstance";

interface DoctorRecord {
  firstName: string;
  // id: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  specialization: string;
  // action: string;
}

const DoctorColumns = () => {
  const [data, setData] = useState<DoctorRecord[]>([]);
  console.log(data);
  const axiosInstance = createAxiosInstance();

  const fetctDoctors = async () => {
    await axiosInstance
      .get("/doctor/all")
      .then((response) => {
        // console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    fetctDoctors();
  }, []);

  const columns: ColumnDef<DoctorRecord>[] = [
    {
      header: "#",
      cell: ({ row }) => {
        return <p className="text-14-medium text-black">{row.index + 1}</p>;
      },
    },
    {
      accessorKey: "firstName",
      header: "FirstName",
      cell: ({ row }) => {
        return <p className="text-14-medium text-black">{row.original.firstName}</p>;
      },
    },
    // {
    //   accessorKey: "id",
    //   header: "ID",
    //   cell: ({ row }) => {
    //     return <p className="text-14-medium">{row.original.id}</p>;
    //   },
    // },
    {
      accessorKey: "lastName",
      header: "LastName",
      cell: ({ row }) => {
        return <p className="text-14-medium text-black">{row.original.lastName}</p>;
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        return <p className="text-14-medium text-black">{row.original.email}</p>;
      },
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }) => {
        return <p className="text-14-medium text-black">{row.original.gender}</p>;
      },
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => {
        return <p className="text-14-medium text-black">{row.original.phone}</p>;
      },
    },
    {
      accessorKey: "specialization",
      header: "Specialization",
      cell: ({ row }) => {
        return <p className="text-14-medium text-black">{row.original.specialization}</p>;
      },
    },
    // {
    //   accessorKey: "status",
    //   header: "Status",
    //   cell: ({ row }) => {
    //     return <div className="min-w-[115px]">
    //       <StatusBadge status={row.original.status} />
    //     </div>;
    //   },
    // },
  ];
  return <DataTable columns={columns} data={data} />;
};

export default DoctorColumns;
