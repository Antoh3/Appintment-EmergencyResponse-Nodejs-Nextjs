"use client"
import React from "react";
import {Button, Input} from "@nextui-org/react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {FaEnvelope, FaIdBadge} from "react-icons/fa6";
import Link from "next/link";
import LegalDocsUpload from "@/app/auth/uploads/LegalDocsUpload";
import {useRouter} from "next/navigation";
import createAxiosInstance from "@/context/axiosInstance";
import { message } from "antd";
import { AxiosError } from "axios";

export default async function LegalDetails() {
    const router = useRouter();
    const axiosInstance = createAxiosInstance();

    const {control, handleSubmit} = useForm({
        defaultValues: {
            registrationNumber: "",
        },
    })

    const onSubmit: SubmitHandler<any> = async (data) => {
       try {
        const response = await axiosInstance.post('/doctor/validate-reg-no', data)

        if (response?.status === 200) {
            message.success("successfully uploaded");
            console.log(data)
            router.push("/patient")
        }
       } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response?.status === 404) {
                message.error("Provide valid registration number");
            }
        }else{
            message.error("An error occurred. Please try again later.");
            console.error("Error during uploading legal : ", error);
        }
       }
        
    }

    return (
        <main className="w-full flex flex-col gap-8  my-4">

            <div>
                <h1 className="text-4xl textDark font-semibold">Legal Details</h1>
                <p className="text text-lg mt-2">Enter your details below to proceed</p>
            </div>

            <form
                className="w-full flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="registrationNumber"
                    control={control}
                    render={({field}) =>
                        <Input {...field}
                               variant="bordered"
                               color="primary"
                               type="text"
                               label="Registration number"
                               placeholder="Enter board issued registration number"
                               startContent={<FaEnvelope/>}
                        />
                    }
                />

                {/* <Controller
                    name="idNumber"
                    control={control}
                    render={({field}) =>
                        <Input {...field}
                               variant="bordered"
                               color="primary"
                               type="text"
                               label="ID Number"
                               placeholder="Enter your national ID number"
                               startContent={<FaIdBadge/>}
                        />
                    }
                /> */}

                <LegalDocsUpload/>
                <Button type="submit" className="bg-primary text-white w-full mt-4">Finish</Button>
            </form>
            <Link href={"/patient"}>I&apos;ll do this later
                <span className="font-bold text-primary ml-2">Skip</span></Link>
        </main>
    );
}
