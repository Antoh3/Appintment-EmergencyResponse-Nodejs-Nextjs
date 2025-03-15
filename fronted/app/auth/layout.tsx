"use client";
import Image from "next/image";

const phrases = [
  "Expand Your Reach. Connect with More Patients Effortlessly",
  "Streamline Your Workflow. Integrated Tools for Efficient Practice Management",
  "Enhance Patient Care. Deliver Quality Health Services Anytime, Anywhere",
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <main className="container grid h-screen w-full flex-col items-center justify-center overflow-auto lg:max-w-none lg:grid-cols-2 lg:px-0">
    <main className=" flex h-full w-full flex-col items-center justify-center overflow-auto lg:max-w-none lg:flex-cols-2 lg:px-0">
      <div className="lg:p-8">
        <div className="mx-auto flex flex-col w-full justify-center space-y-6 sm:w-[350px]">
          {children}
        </div>
      </div>
    </main>
  );
}
