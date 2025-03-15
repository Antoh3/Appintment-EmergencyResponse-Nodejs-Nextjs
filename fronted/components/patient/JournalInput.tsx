"use client";
import React, { useEffect, useState } from "react";
import { Button, Textarea } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import { FaEnvelope, FaLock } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { LuLoader2 } from "react-icons/lu";
import { message } from "antd";
import { journalForm, journalSchema } from "@/lib/validators/patient";
import { createJournal, updateJournal } from "@/app/doctor/journal/journal";
import useIsEditing from "@/app/doctor/journal/useEdit.store";
import useEditedJournal from "@/app/doctor/journal/useEditedJournal.store";


export default function JournalInput() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<journalForm>({
    resolver: zodResolver(journalSchema),
  });

  const isEditing: boolean = useIsEditing((state) => state.isEditing);
  const editedJournal: object = useEditedJournal((state) => state.editedJournal)
  const setIsEditing: (passedBoolean: boolean) => void = useIsEditing((state) => state.setIsEditing);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [formValue, setFormValue] = useState<string>("");

  useEffect(() => {
    if (isEditing && editedJournal) {
      setFormValue(editedJournal.content || "");
    }
  }, [isEditing, editedJournal]);


  async function onSubmit(data: journalForm) {
    setIsLoading(true);

    try {
      if (isEditing) {

        const updatedJournal: object = {
          adult_id: "adult123",
          body: data.entry,
          child_id: "child123",
          journal_id: editedJournal.id
        }
        
        console.log(updatedJournal)
        const response = await updateJournal(updatedJournal)

        if (response?.status === 200) {
          message.success("feedback send successfully.");
          console.log("feedback sent successfully: ", response);
          setIsEditing(false);
          router.push("/app/journal");
        }
      } else {

        const createdJournal: object = {
          adult_id: "adult123",
          body: data.entry,
          child_id: "child123"
        }

        console.log(createdJournal)

        const response = await createJournal(createdJournal)

        if (response?.status === 200) {
          message.success("feedback  send successfully.");
          console.log("feedback send successfully: ", response);
          router.push("/app/journal");
        }
      }
    } catch (err) {
      message.error("An error occurred. Please try again later.");
      console.error("Error during feedbackinput: ", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-4"
    >
      <Controller
        control={control}
        name="entry"
        defaultValue={isEditing ? editedJournal.content : ""}
        render={({ field }) => (
          <div>
            <Textarea
              {...field}
              label={isEditing ? "feedback Update" : "feedback Entry"}
              value={formValue}
              variant="bordered"
              labelPlacement="outside"
              placeholder={
                isEditing
                  ? ""
                  : "Write your feed back....."
              }
              onChange={(e) => {
                field.onChange(e.target.value);
                setFormValue(e.target.value);
              }}
              
            />
            {errors.entry && (
              <p className="px-1 text-sm text-red-600">
                {errors.entry.message}
              </p>
            )}
          </div>
        )}
      />

      {isEditing ?
        <div className="flex mt-4 gap-4">
          <Button
            className="w-1/2"
            onClick={() => {
              setIsEditing(false);
              setFormValue("");
            }}
          >Cancel</Button>
          <Button
            className="bg-primary text-white w-1/2"
            type="submit"
            disabled={isLoading}
          >
            Update
            {isLoading && <LuLoader2 className="h-4 w-4 animate-spin" />}
          </Button>
        </div>
        : <Button
          className="bg-primary text-white w-full mt-4"
          type="submit"
          disabled={isLoading}
        >
          Save
          {isLoading && <LuLoader2 className="h-4 w-4 animate-spin" />}
        </Button>}
    </form>
  );
}
