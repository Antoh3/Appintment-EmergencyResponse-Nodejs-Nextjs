"use client"

import { DataTable } from "@/components/UI/table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import axios from "axios";

interface Diagnosis {
  content: string;
  issued_by: string;
  recommendation: string;
}

const DiagnosisColumns = () => {
  const [data, setData] = useState<Diagnosis[]>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/patient/view_diagnosis")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const columns: ColumnDef<Diagnosis>[] = [
    {
      header: "#",
      cell: ({ row }) => {
        return <p className="text-14-medium">{row.index + 1}</p>;
      },
    },
    {
      accessorKey: "content",
      header: "Content",
      cell: ({ row }) => {
        return <p className="text-14-medium">{row.original.content}</p>;
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
      accessorKey: "recommendation",
      header: "Recommendation",
      cell: ({ row }) => {
        return <p className="text-14-medium">{row.original.recommendation}</p>;
      },
    },
  ];
  return <DataTable columns={columns} data={data} />;
};

export default DiagnosisColumns;
