"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/UI/DropdownMenu";
import UserAvatar from "./UserAvatar";

export function AppAccountNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar className="h-8 w-8" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">Emmanuel</p>

            <p className="w-[200px] truncate text-sm text-muted-foreground">
              emmanuel@gmail.com
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/patient">Home</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/patient/services">Services</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/patient/ambulance">Request Aid Car</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/patient/appointments">Appointments</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/patient/doctors">All Doctors</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/patient/feedback">FeedBack</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          {/* <Link href="/patient/allergies">Allergies</Link> */}
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/patient/additionalInfo">AdditionalInfo</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/patient/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/patient/help">Help & Support</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
