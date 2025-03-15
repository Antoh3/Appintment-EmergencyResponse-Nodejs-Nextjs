import { CardSummary } from "@/components/UI/cards/CardSummary"
import Link from "next/link"

export default function HospitalPage(){
    return(
        <main className="flex px-11 py-5 flex-col gap-4">
            <h1 className="text-3xl font-bold">Admin dashboard</h1>
            <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                <CardSummary title="All Patients" value="1500"/>
                <Link href={"/hospitals/practitioners"}><CardSummary title="Total Practitioners" value="25"/></Link>
                <CardSummary title="All appointments" value="15"/>
                <CardSummary title="Active Requests" value="6"/> 
                
            </div>
            <div className="w-full grid grid-cols-3 gap-3">
                <div className="col-span-2 rounded-lg bg-white p-4 border grid place-content-center">Patients visit analysis</div>
                <div className="col-span-1 flex flex-col gap-4 ">
                    <div className="rounded-lg bg-white p-4 border">Emergency Ambulance Requests</div>
                    <div className="rounded-lg bg-white p-4 border">Active Practitioners</div>
                </div>
            </div>
        </main>
    )
}