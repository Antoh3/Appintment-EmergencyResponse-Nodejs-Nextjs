// "use client"

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppSidebar } from "@/components/DoctorSideBar";
import { siteConfig } from "@/config/site";
import createAxiosInstance from "../../context/axiosInstance";
// import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata:Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>){
  // const [patient,setPatient] = useState([]);
  // console.log(patient);

  // const axiosInstance = createAxiosInstance()

  // const fetchCurrentUser = async () =>{
  //     const res = await axiosInstance.get("/doctor/currentuser")
  //     // setPatient(res.data);
  //     console.log(fetchCurrentUser);
      
  // }

  return (
    
    <>
    {/* <main className="h-screen w-full  flex">
      <AppSidebar />
      <div className="flex-grow bg-primary/5 p-8">{children}</div>
    </main> */}
    <div className="flex min-h-screen flex-col space-y-6 mx-0">
      <div className="container grid flex-1 gap-0 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px]  flex-col md:flex ">
            <AppSidebar />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          <header className="sticky top-0 z-40 border-b bg-background mb-2 bg-green-200">
            <div className="container flex h-16 items-center justify-between py-4">
              <div className="text-xl font-bold">
                Welcome Dr. Emmanuel
                {/* Welcome {session?.user.name} */}
              </div>
            </div>
          </header>
          <div className="flex-grow bg-primary/5 p-8 ">
           {children}
          </div>
          {/* <SiteFooter className="border-t" /> */}
        </main>
      </div>
    </div>
    </>
  );
}
