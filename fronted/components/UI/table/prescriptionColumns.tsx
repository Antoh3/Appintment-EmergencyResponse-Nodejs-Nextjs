"use client";

import { DataTable } from "@/components/UI/table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import axios from "axios";
import StatusBadge from "@/components/StatusBadge";
import { Status } from "@/types";

interface Prescriptions {
  issued_at: string;
  issued_by: string;
  patient_id: string;
  pharmacy: string;
  received_at: string;
  status: Status;
}

const PrescriptionColumns = () => {
  const [data, setData] = useState<Prescriptions[]>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/patient/view_prescription")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const columns: ColumnDef<Prescriptions>[] = [
    {
      header: "#",
      cell: ({ row }) => {
        return <p className="text-14-medium">{row.index + 1}</p>;
      },
    },
    {
      accessorKey: "issued_at",
      header: "Issued At",
      cell: ({ row }) => {
        return <p className="text-14-medium">{row.original.issued_at}</p>;
      },
    },
    {
      accessorKey: "issued_by",
      header: "Issued By",
      cell: ({ row }) => {
        return <p className="text-14-medium">{row.original.issued_by}</p>;
      },
    },
    {
      accessorKey: "patient_id",
      header: "Patient ID",
      cell: ({ row }) => {
        return <p className="text-14-medium">{row.original.patient_id}</p>;
      },
    },
    {
      accessorKey: "pharmacy",
      header: "Pharmacy",
      cell: ({ row }) => {
        return <p className="text-14-medium">{row.original.pharmacy}</p>;
      },
    },
    {
      accessorKey: "received_at",
      header: "Received At",
      cell: ({ row }) => {
        return <p className="text-14-medium">{row.original.received_at}</p>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return <div className="min-w-[115px]">
          <StatusBadge status={row.original.status} />
        </div>;
      },
    },
  ];
  return <DataTable columns={columns} data={data} />;
};

export default PrescriptionColumns;
