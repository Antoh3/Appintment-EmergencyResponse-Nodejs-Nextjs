"use client";
// import '@/styles/App.css'
import '@/styles/index.css'
import React from "react";
import { Button, Input } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import { FaEnvelope, FaLock } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { loginUserForm, loginUserSchema } from "@/lib/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { LuLoader2 } from "react-icons/lu";
import { message } from "antd";
import Image from "next/image";
import createAxiosInstance from "@/context/axiosInstance";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { FaArrowRightToBracket } from "react-icons/fa6";

export default function Login() {
  const router = useRouter();
  const { setAuth } = useAuth();
  const axiosInstance = createAxiosInstance()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<loginUserForm>({
    resolver: zodResolver(loginUserSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(data: loginUserForm) {
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(
        "/patient/login",
        data
      );
      const { accessToken} = response.data;
      setAuth(accessToken);

      if (response?.status === 200) {
        message.success("Login successful.");
        console.log("Login successful: ", response.data);
        router.push("/auth/legal-details");
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 400) {
          message.error("Invalid email or password.");
        }
      } else {
        message.error("An error occurred. Please try again later.");
        console.error("Error during login: ", err);
      }
    } finally {
      setIsLoading(false);
    }
  }

  // const onSubmit: SubmitHandler<any> = (data: any) => {
  //   router.push("/app");
  // };

  return (
    // <>
    //   <div className="flex flex-col space-y-2 text-center">
    //   <h1 className="text-2xl font-semibold tracking-tight">Hello</h1>
    //     <Image
    //       alt="logo"
    //       className="mx-auto mb-2"
    //       height={200}
    //       src="/dokta-logo.svg"
    //       width={50}
    //     />
    //     <h1 className="text-2xl font-semibold tracking-tight">
    //       Login to your Account
    //     </h1>
    //   </div>
    //       <form
    //         onSubmit={handleSubmit(onSubmit)}
    //         className="w-full flex flex-col gap-4"
    //       >
    //         <Controller
    //           control={control}
    //           name="email"
    //           defaultValue=""
    //           render={({ field }) => (
    //             <div>
    //               <Input
    //                 {...field}
    //                 color="primary"
    //                 label="Email"
    //                 placeholder="Enter email address"
    //                 startContent={<FaEnvelope />}
    //                 type="text"
    //                 variant="bordered"
    //               />
    //               {errors.email && (
    //                 <p className="px-1 text-sm text-red-600">
    //                   {errors.email.message}
    //                 </p>
    //               )}
    //             </div>
    //           )}
    //         />

    //         <Controller
    //           control={control}
    //           name="password"
    //           defaultValue=""
    //           render={({ field }) => (
    //             <div>
    //               <Input
    //                 {...field}
    //                 color="primary"
    //                 label="Password"
    //                 placeholder="*****************"
    //                 startContent={<FaLock />}
    //                 type="password"
    //                 variant="bordered"
    //                 autoComplete="off"
    //               />
    //               {errors.password && (
    //                 <p className="px-1 text-sm text-red-600">
    //                   {errors.password.message}
    //                 </p>
    //               )}
    //             </div>
    //           )}
    //         />
    //         <Link href="" className="self-end text-primary font-bold">
    //       Forgot password?
    //     </Link>
    //     <Button
    //       className="bg-primary text-white w-full mt-4"
    //       type="submit"
    //       disabled={isLoading}
    //     >
    //       Login
    //       {isLoading && <LuLoader2 className="h-4 w-4 animate-spin" />}
    //     </Button>
    //       </form>
    //       <Link href={"/auth/register"} className="text-center">
    //     Don&apos;t have an account?{" "}
    //     <span className="font-bold text-primary ml-2">Create account</span>
    //   </Link>
    // </>
      <>
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Hello</h1>
            <Image
              alt="logo"
              className="mx-auto mb-2"
              height={200}
              src="/dokta-logo.svg"
              width={50}
            />
            <h1 className="text-2xl font-semibold tracking-tight">
              Login to your Account
            </h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-4 rounded-md shadow-md px-8 py-6 mt-8 bg-white"
          >
            <Controller
              control={control}
              name="email"
              defaultValue=""
              render={({ field }) => (
                <div className="mb-4">
                  <Input
                    {...field}
                    color="primary"
                    label="Email"
                    placeholder="Enter email address"
                    startContent={<FaEnvelope />}
                    type="text"
                    variant="bordered"
                    className="appearance-none w-full bg-gray-50 focus:outline-none focus:border-primary rounded-md px-3 py-2"
                  />
                  {errors.email && (
                    <p className="px-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              control={control}
              name="password"
              defaultValue=""
              render={({ field }) => (
                <div className="mb-4">
                  <Input
                    {...field}
                    color="primary"
                    label="Password"
                    placeholder="*****************"
                    startContent={<FaLock />}
                    type="password"
                    variant="bordered"
                    autoComplete="off"
                    className="appearance-none w-full bg-gray-50 focus:outline-none focus:border-primary rounded-md px-3 py-2"
                  />
                  {errors.password && (
                    <p className="px-1 text-sm text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Link href="" className="self-end text-primary font-bold">
              Forgot password?
            </Link>
            <Button
              className="bg-primary text-white w-full mt-4 py-2 rounded-md focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isLoading}
            >
               Login →
              {isLoading && <LuLoader2 className="h-4 w-4 animate-spin" />}
            </Button>
          </form>
          <Link href={"/auth/register"} className="text-center mt-4">
            Don't have an account?{" "}
            <span className="font-bold text-primary ml-2">Create account</span>
          </Link>
        </div>
      </>
  );
}
