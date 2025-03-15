"use client";

import { cn } from "@/lib/utils";

import { SidebarNavItem } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "../NavIcons";

type PatientNavProps = {
  items: SidebarNavItem[];
};

const AppNav = ({ items }: PatientNavProps) => {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2 fixed">
      <div className="flex flex-row items-center border-b h-16 cursor-pointer">
        <Image
          alt="logo"
          className="w-8 2xl:w-10"
          height={100}
          priority={false}
          src="/dokta-logo.svg"
          width={100}
        />
        <h2 className="ml-2 text-xl 2xl:text-3xl font-medium text-primary">
          CARE <span className="text-xs">Pulse</span>
        </h2>
      </div>
      {items.map((item, index) => {
        if (item.items) {
          return (
            <div key={index} className="mt-4">
              <h3 className="pl-3 mb-2 text-medium font-semibold text-gray-500">{item.title}</h3>
              <div className="">
                {item.items.map((subItem:any, subIndex:any) => {
                  const SubIcon = Icons[subItem.icon || "arrowRight"];
                  return (
                    subItem.href && (
                      <Link key={subIndex} href={subItem.disabled ? "/" : subItem.href}>
                        <span
                          className={cn(
                            "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-primary/20 hover:border-primary",
                            path === subItem.href ? "bg-primary/20" : "bg-transparent",
                            subItem.disabled && "cursor-not-allowed opacity-80"
                          )}
                        >
                          <SubIcon className="mr-2 h-4 w-4" />
                          <span>{subItem.title}</span>
                        </span>
                      </Link>
                    )
                  );
                })}
              </div>
            </div>
          );
        }

        const Icon = Icons[item.icon || "arrowRight"];
        return (
          item.href && (
            <Link key={index} href={item.disabled ? "/" : item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-primary/20 hover:border-primary",
                  path === item.href ? "bg-primary/20" : "bg-transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
};


export default AppNav;
