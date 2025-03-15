import { SVGProps } from "react";
import { Icons } from "./NavIcons";
import type { Icon } from "react-icons";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

  
  

declare type Gender = 'Male' | 'Female';
declare type AppointmentStatus = 'scheduled' | 'rescheduled' | 'canceled_by_doctor' | 'canceled_by_user' | 'canceled_by_admin' | 'accepted' | 'pending' | 'approved' | 'completed' | 'canceled' | 'active' | 'followedup' | 'available' | 'assinged' | 'on_route' | 'mantainace'
declare type Status = "In Progress" | "Scheduled" | "Cancelled" | "Pending" | "Complete" | "Issued" | "Not Issued";

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);

export type PatientConfig = {
  sidebarNav: SidebarNavItem[];
};
