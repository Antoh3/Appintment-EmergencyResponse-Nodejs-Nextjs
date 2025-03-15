import { PatientConfig } from "@/types";

export const patientConfig: PatientConfig = {
  sidebarNav: [
    {
      title: "",
      items: [
        {
          title: "Home",
          href: "/patient",
          icon: "home",
        },
        {
          title: "All services",
          href: "/patient/services",
          icon: "calendar",
        },
        {
          title: "Request AidCar",
          href: "/patient/ambulance",
          icon: "ambulance",
        },
        {
          title: "Appointments",
          href: "/patient/appointments",
          icon: "calendar",
        },
        {
          title: "All Doctors",
          href: "/patient/doctors",
          icon: "users",
        },
        // {
        //   title: "FeedBack",
        //   href: "/patient/feedback",
        //   icon: "feedback",
        // },
        // {
        //   title: "TrackAmbulance",
        //   href: "/patient/track",
        //   icon: "allergies",
        // },
        // {
        //   title: "Additional Info",
        //   href: "/patient/additionalInfo",
        //   icon: "calendar",
        // },
      ],
    },
    {
      title: "Help & Support",
      items: [
        {
          title: "Video Call",
          href: "/patient",
          icon: "profile",
        },
        {
          title: "Profile",
          href: "/patient/settings",
          icon: "profile",
        },
        {
          title: "Chat",
          href: "/patient/help",
          icon: "help",
        },
        {
          title: "Logout",
          href: "/",
          icon: "logout",
        },
      ],
    },
  ],
};
