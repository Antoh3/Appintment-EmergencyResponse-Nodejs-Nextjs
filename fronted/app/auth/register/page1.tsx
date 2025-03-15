"use client";
import React from "react";
import {
  Button,
  DatePicker,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import {
  FaArrowRightLong,
  FaCalendarDays,
  FaEnvelope,
  FaIdBadge,
  FaLocationDot,
  FaLock,
  FaPhone,
  FaRegAddressCard,
} from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { LuLoader2 } from "react-icons/lu";
import { message } from "antd";

import { genderOptions } from "@/constants";
import { registerUserForm, registerUserSchema } from "@/lib/validators/auth";

export default function Register() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<registerUserForm>({
    resolver: zodResolver(registerUserSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(data: registerUserForm) {
    setIsLoading(true);

    // Extracting the date parts and converting it to a proper date string or object
    const dateObj = data.birthDate;

    // const year = dateObj.year;
    // const month = String(dateObj.month).padStart(2, "0");
    // const day = String(dateObj.day).padStart(2, "0");

    // // Format as YYYY-MM-DD
    // const formattedDate = `${year}-${month}-${day}`;
    const formattedDate = `${dateObj.year}-${dateObj.month}-${dateObj.day}`;

    data.birthDate = formattedDate;

    try {
      const response = await axios.post(
        "http://localhost:5000/patient/user",
        data,
      );

      if (response?.status === 200) {
        message.success("Registration successful.");
        console.log("Registration successful: ", response.data.user);
        router.push("/auth/login");
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 400) {
          message.error("Patient already exists.");
          console.log("Patient already exists: ", err.response.data.message);
        }
      } else {
        message.error("An error occurred. Please try again later.");
        console.error("Error during registration: ", err);
      }
    } finally {
      setIsLoading(false);
    }
  }

  // const onSubmit: SubmitHandler<any> = (data) => {
  //   console.log(data);
  //   router.push("/auth/legal-details");
  // };

  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <Image
          alt="logo"
          className="mx-auto mb-2"
          height={200}
          src="/dokta-logo.svg"
          width={50}
        />
        <h1 className="header">Welcome 👋</h1>
        <p className="text-dark-700">Let us know more about yourself.</p>
        <h1 className="text-2xl font-semibold tracking-tight">
          Create Account
        </h1>
      </div>

      <form
        className="w-full flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          defaultValue=""
          name="email"
          render={({ field }) => (
            <div>
              <Input
                {...field}
                color="primary"
                label="Email"
                placeholder="example@mail.com"
                startContent={<FaEnvelope />}
                type="email"
                variant="bordered"
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
          defaultValue=""
          name="idNumber"
          render={({ field }) => (
            <div>
              <Input
                {...field}
                color="primary"
                label="ID Number"
                placeholder="Enter ID number"
                startContent={<FaRegAddressCard />}
                type="text"
                variant="bordered"
              />
              {errors.idNumber && (
                <p className="px-1 text-sm text-red-600">
                  {errors.idNumber.message}
                </p>
              )}
            </div>
          )}
        />
        <div className="flex flex-row justify-between gap-2">
          <Controller
            control={control}
            defaultValue=""
            name="firstName"
            render={({ field }) => (
              <div>
                <Input
                  {...field}
                  color="primary"
                  label="First name"
                  placeholder="Enter your first name"
                  startContent={<FaIdBadge />}
                  type="text"
                  variant="bordered"
                />
                {errors.firstName && (
                  <p className="px-1 text-sm text-red-600">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            control={control}
            defaultValue=""
            name="lastName"
            render={({ field }) => (
              <div>
                <Input
                  {...field}
                  color="primary"
                  label="Last name"
                  placeholder="Enter your last name"
                  startContent={<FaIdBadge />}
                  type="text"
                  variant="bordered"
                />
                {errors.lastName && (
                  <p className="px-1 text-sm text-red-600">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        <Controller
          control={control}
          name="birthDate"
          render={({ field }) => (
            <DatePicker
              {...field}
              color="primary"
              errorMessage="Please enter a valid date."
              label="Date of Birth"
              startContent={<FaCalendarDays className="text-black" />}
              variant="bordered"
            />
          )}
        />

        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <div>
              <Select
                {...field}
                className=""
                color="primary"
                label="Gender"
                placeholder="Select gender"
                startContent={<FaIdBadge />}
                variant="bordered"
              >
                {genderOptions.map((gender) => (
                  <SelectItem key={gender.key}>{gender.label}</SelectItem>
                ))}
              </Select>
              {errors.idNumber && (
                <p className="px-1 text-sm text-red-600">
                  {errors.idNumber.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          control={control}
          defaultValue=""
          name="password"
          render={({ field }) => (
            <div>
              <Input
                {...field}
                className="mt-2"
                color="primary"
                label="Password"
                placeholder="Enter a strong password"
                startContent={<FaLock />}
                type="password"
                variant="bordered"
              />
              {errors.password && (
                <p className="px-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          control={control}
          defaultValue=""
          name="permanentLocation"
          render={({ field }) => (
            <div>
              <Input
                {...field}
                color="primary"
                label="Permanent location"
                placeholder="Enter your permanent location"
                startContent={<FaLocationDot />}
                type="text"
                variant="bordered"
              />
              {errors.permanentLocation && (
                <p className="px-1 text-sm text-red-600">
                  {errors.permanentLocation.message}
                </p>
              )}
            </div>
          )}
        />
        <Controller
          control={control}
          defaultValue=""
          name="phoneNumber"
          render={({ field }) => (
            <div>
              <Input
                {...field}
                color="primary"
                label="Phone"
                placeholder="070..."
                startContent={<FaPhone />}
                type="phone"
                variant="bordered"
              />
              {errors.phoneNumber && (
                <p className="px-1 text-sm text-red-600">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          )}
        />

        <Button
          className="bg-primary text-white w-full mt-4"
          disabled={isLoading}
          endContent={
            isLoading ? (
              <LuLoader2 className="animate-spin" />
            ) : (
              <FaArrowRightLong />
            )
          }
          type="submit"
        >
          Create account
        </Button>
      </form>
      <Link className="text-center" href={"/auth/login"}>
        Already have an account?{" "}
        <span className="font-bold text-primary">Login</span>
      </Link>
    </>
  );
}
