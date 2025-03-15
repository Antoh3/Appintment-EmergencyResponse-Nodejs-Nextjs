"use client";
import React from "react";
import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";

export default function SetPassword() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form data:", data);
  };

  const validatePasswordMatch = (value: any) => {
    const { passwordOne, passwordTwo } = getValues();

    if (passwordOne === passwordTwo) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <main className="w-full">
      <form
        action="/auth/legal-details"
        className="" /*onSubmit = {handleSubmit(onSubmit)}*/
        method="get"
      >
        <h1 className="text-2xl textDark mt-2 font-semibold text-center">
          Set your account password
        </h1>
        <p className="text mb-12 text-xs text-center mt-2">
          Enter your details below to proceed
        </p>
        <Input
          className="mb-2"
          {...register("passwordOne", {
            required: true,
            validate: validatePasswordMatch,
          })}
          label="Password"
          type="password"
        />

        <Input
          {...register("passwordTwo", {
            required: true,
            validate: validatePasswordMatch,
          })}
          label="Confirm Password"
          type="password"
        />
        <Button className="bg-primary text-white w-full mt-4" type="submit">
          Register <FaArrowRight />
        </Button>
      </form>
    </main>
  );
}
