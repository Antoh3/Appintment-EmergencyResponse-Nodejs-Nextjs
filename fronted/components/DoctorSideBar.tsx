"use client"

import Image from "next/image";
import {
  FiCalendar,
  FiHelpCircle,
  FiHome,
  FiSettings,
  FiUsers,
  FiLogOut
} from "react-icons/fi";
import { FaFilePrescription, FaUser } from "react-icons/fa";
import { MdOutlineInventory, MdRecommend } from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
// import { TbHeartHandshake, TbHeartHandshake, TbLogout2 } from "react-icons/tb";
import { GiHealthNormal } from "react-icons/gi";
import { FaNotesMedical } from "react-icons/fa";
import { RiStethoscopeFill } from "react-icons/ri";
import { FaClipboardList } from "react-icons/fa";
import Link from "next/link";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { LiaClipboardListSolid } from "react-icons/lia";
import { TbLogout2 } from "react-icons/tb";



const menuItems = [
  {
    title: "",
    children: [
      {
        title: "Home",
        icon: <FiHome />,
        link: "/doctor",
      },
      {
        title: "Patient Recommendation",
        icon: <FaClipboardList />,
        link: "/doctor/recommendations",
      },
      {
        title: "Patient Prescriptions",
        icon: <FaNotesMedical />,
        link: "/doctor/precriptions",
      },
      {
        title: "Appointments",
        icon: <AiOutlineCalendar />,
        link: "/doctor/appointments",
      },
      {
        title: "Patients",
        icon: <FiUsers />,
        link: "/doctor/patients",
      },
      // {
      //   title: "FeedBack & Reviews",
      //   icon: <BiMessageDetail />,
      //   link: "/doctor/journal",
      // },
    ],
  },
  {
    title: "Settings",
    children: [
      {
        title: "Profile",
        icon: <FaUser />,
        link: "/doctor/help",
      },
      {
        title: "Contact Doc",
        icon: <LiaClipboardListSolid />,
        subMenu: true,
        subMenuItems: [
          {
            title: "Chat",
            link: "/doctor/help"
          },
          {
            title: "VideoCall",
            link: "/doctor/help"
          },
        ]
      },
      {
        title: "Logout",
        icon: <TbLogout2 />,
        link: "/auth/doctor/login",
      },
      {
        title: "Profile",
        icon: <FaUser />,
        link: "/doctor/help",
      },
    ]
  }
]

export function AppSidebar() {
  return (
    <main className="w-[200px] 2xl:w-[250px]  h-full  fixed border-e overflow-scroll mb-5">
      <div className="flex flex-row items-center border-b h-16 cursor-pointer">
        <Image
          alt="logo"
          className="w-8 2xl:w-10"
          height={100}
          priority={false}
          src="/images/doctorlogo.jpg"
          width={100}
        />
        <h2 className="text-xl 2xl:text-3xl font-medium text-primary">
          Care <span className="text-xs">Pulse</span>
        </h2>
      </div>

      <div className="px-2 mt-10 flex flex-col justify-between gap-10 ">
        {
          menuItems.map((item: any, i) => (
            <div key={i} className="flex flex-col text-gray-600 gap-2">
              {item?.title && <p className="px-4 pb-2 font-medium">{item?.title}</p>}
              <div>
                {
                  item?.children?.map((childItem: any, j: number) => {
                    if (childItem?.subMenu) {
                      return (
                        <Accordion key={j} className="text-lg">
                          <AccordionItem key={j} aria-label={`Accordion ${j}`} startContent={childItem?.icon} title={<span className="text-sm">{childItem?.title}</span>} className="px-2">
                            {childItem?.subMenuItems.map((subItem: any, k: number) => (
                              <Link key={k} href={subItem?.link} className="text-sm flex py-2 rounded cursor-pointer border border-transparent hover:bg-primary/20 hover:border-primary px-4">{subItem?.title}</Link>
                            ))}
                          </AccordionItem>
                        </Accordion>
                      )
                    } else {
                      return (
                        <Link key={j} href={childItem?.link}
                          className="flex gap-4 items-center rounded px-4 py-2 w-full cursor-pointer border border-transparent hover:bg-primary/20 hover:border-primary">
                          <span className="text-lg">{childItem?.icon}</span>
                          <span className="text-sm">{childItem?.title}</span>
                        </Link>
                      )
                    }

                  })
                }
              </div>
            </div>
          ))
        }
      </div>
    </main>
  );
}
