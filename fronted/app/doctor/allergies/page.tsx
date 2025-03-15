"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

const allergies = [
  {
    substance: "Peanuts",
    confirmedBy: "Dr. Dominic",
    date: "2024-09-11",
  },
  {
    substance: "Dust",
    confirmedBy: "Dr. Neville",
    date: "2024-08-01",
  },
  {
    substance: "Pollen",
    confirmedBy: "Dr. Elvis",
    date: "2024-09-01",
  },
];

export default function page() {
  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Allergies</h1>

      <div className="flex flex-col gap-8 flex-wrap items-start ">
        <Table
          aria-label="Example static collection table"
          removeWrapper
          className="bg-white rounded-lg border p-2"
        >
          <TableHeader className="!bg-none">
            <TableColumn>Substance</TableColumn>
            <TableColumn>Confirmed by</TableColumn>
            <TableColumn>Date</TableColumn>
          </TableHeader>
          <TableBody>
            {allergies?.map((item: any, i: number) => (
              <TableRow key={i}>
                <TableCell>{item?.substance}</TableCell>
                <TableCell>{item?.confirmedBy}</TableCell>
                <TableCell>{item?.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
