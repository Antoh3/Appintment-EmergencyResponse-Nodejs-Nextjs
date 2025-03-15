"use client";

import Link from "next/link";
import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import HomePage from "@/components/HomePage";

export default function Home() {
  // const router = useRouter();

  // useEffect(() => {
  //   router.push("/auth/login");
  // }, []);

  return (
    <main className="flex flex-col mx-0 px-0 w-full gap-4 justify-center items-center h-screen">
      <HomePage />
    </main>
  );
}
