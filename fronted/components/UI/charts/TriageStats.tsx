"use client";
import React from "react";
import { Button, Input } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { LuLoader2 } from "react-icons/lu";
import { message } from "antd";
import { triageForm, triageSchema } from "@/lib/validators/triage";

export function TriageStats(props: any) {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<triageForm>({
    resolver: zodResolver(triageSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(data: triageForm) {
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/auth/login/adult",
        data
      );

      if (response?.status === 200) {
        message.success("Login successful.");
        console.log("Login successful: ", response.data.user);
        router.push("/app");
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
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

  return (
    <div className="flex flex-col flex-wrap border rounded-lg w-full bg-white min-h-[300px]">
      <p className="p-4 border-b text-lg font-bold">Triage Details</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-row gap-4 p-4"
      >
        <Controller
          control={control}
          name="blood_pressure"
          defaultValue=""
          render={({ field }) => (
            <div>
              <Input
                {...field}
                color="primary"
                label="Blood Pressure"
                type="text"
                variant="bordered"
                defaultValue="108 mm Hg"
              />
              {errors.blood_pressure && (
                <p className="px-1 text-sm text-red-600">
                  {errors.blood_pressure.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          control={control}
          name="weight"
          defaultValue=""
          render={({ field }) => (
            <div>
              <Input
                {...field}
                color="primary"
                label="Weight"
                type="text"
                variant="bordered"
                defaultValue="87 Kg"
              />
              {errors.weight && (
                <p className="px-1 text-sm text-red-600">
                  {errors.weight.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          control={control}
          name="height"
          defaultValue=""
          render={({ field }) => (
            <div>
              <Input
                {...field}
                color="primary"
                label="Height"
                type="text"
                variant="bordered"
                defaultValue="172 cm"
              />
              {errors.height && (
                <p className="px-1 text-sm text-red-600">
                  {errors.height.message}
                </p>
              )}
            </div>
          )}
        />

        <Button type="submit" color="primary">
          Save
        </Button>
      </form>
    </div>
  );
}
