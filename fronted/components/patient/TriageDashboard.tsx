"use client";
import React from "react";
import { CardSummary } from "@/components/UI/cards/CardSummary";
import { TriageStats } from "@/components/UI/charts/TriageStats";

const patients = [
  {
    name: "James Doe",
    email: "james@mail.com",
    appointmentDate: "20-06-2024",
    type: "General",
    status: "Active",
  },
  {
    name: "Angie Jamale",
    email: "angie@mail.com",
    appointmentDate: "20-06-2024",
    type: "General",
    status: "Followup",
  },
  {
    name: "Mary Mwoke",
    email: "mary@mail.com",
    appointmentDate: "20-06-2024",
    type: "General",
    status: "Scheduled",
  },
];

export default function TriageDashboard() {
  return (
    <main className="flex flex-col gap-4">
      <div className="grid md:grid-cols-2 gap-4 flex-wrap items-start ">
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="grid md:grid-cols-4  gap-4 flex-wrap">
            <CardSummary title="Blood Group" value="A+" />
            <CardSummary title="Blood Pressure" value="108 mm Hg" />
            <CardSummary title="Weight" value="87 Kg" />
            <CardSummary title="Height" value="172 cm" />
          </div>

          <TriageStats />
        </div>
      </div>
    </main>
  );
}
