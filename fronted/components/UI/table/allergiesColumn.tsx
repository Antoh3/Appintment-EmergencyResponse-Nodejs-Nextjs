"use client";

import { DataTable } from "@/components/UI/table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import axios from "axios";

interface Allergies {
  substance: string;
  confirmed_by: string;
  date: string;
}

const AllergiesColumns = () => {
  const [data, setData] = useState<Allergies[]>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/patient/view_Allergies")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const columns: ColumnDef<Allergies>[] = [
    {
      header: "#",
      cell: ({ row }) => {
        return <p className="text-14-medium">{row.index + 1}</p>;
      },
    },
    {
      accessorKey: "substance",
      header: "Substance",
      cell: ({ row }) => {
        return <p className="text-14-medium">{row.original.substance}</p>;
      },
    },
    {
      accessorKey: "confirmed_by",
      header: "Issued By",
      cell: ({ row }) => {
        return <p className="text-14-medium">{row.original.confirmed_by}</p>;
      },
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        return <p className="text-14-medium">{row.original.date}</p>;
      },
    },
  ];
  return <DataTable columns={columns} data={data} />;
};

export default AllergiesColumns;
