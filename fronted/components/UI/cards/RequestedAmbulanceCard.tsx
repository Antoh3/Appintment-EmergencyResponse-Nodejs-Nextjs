"use client";
import { FiMapPin } from "react-icons/fi";
import Image from "next/image";
import { Button, DatePicker, TimeInput } from "@nextui-org/react";
import { useMemo, useState } from "react";
import { Time, ZonedDateTime } from "@internationalized/date";

type Appointment = {
  ambulance: { 
    name: string; 
    // type: string; 
    image: string 
    };
//   location: string;
  date: ZonedDateTime;
//   startTime: Time;
//   endTime: Time;
};

export const RequestedAmbulanceCard = (props: Appointment) => {
  let [date, setDate] = useState(props.date);
//   let [startTime, setStartTime] = useState(props.startTime);
//   let [endTime, setEndTime] = useState(props.endTime);
  // To be used in update appointment api call
  let dateTime = useMemo(() => {
    return {
      date: date.toString(),
    //   startTime: startTime.toString(),
    //   endTime: endTime.toString(),
    };
  }, [date]);
  return (
    <div className="flex flex-col flex-wrap justify-between border rounded-lg w-full max-w-xl bg-white">
      <p className="p-4 border-b text-lg font-bold">Booked Ambulance</p>
      <div className="p-4  flex flex-col gap-2 text-gray-600">
        <DatePicker
          className="max-w-md"
          isDisabled
          granularity="day"
          label={date.toDate().toDateString()}
          value={date}
          onChange={async (e) => {
            setDate(e);
            // TODO: Update appointment api call
          }}
        />
        <div className="flex pt-2 gap-4 items-center">
          {/* <TimeInput
            value={date}
            onChange={async (e) => {
              setDate(e);
              // TODO: Update appointment api call
            }}
          /> */}
          {/* -
          <TimeInput
            value={endTime}
            onChange={async (e) => {
              setEndTime(e);
              // TODO: Update appointment api call
            }}
          /> */}
        </div>
        {/* <p className="flex gap-4 items-center">
          <FiMapPin />
          {props?.location}
        </p> */}
      </div>
      <div className="flex gap-4 p-4 pt-0 my-4">
        <Image
          src={props?.ambulance?.image}
          alt={"image"}
          width={200}
          height={200}
          className="w-[60px] h-[60px] rounded object-cover"
        />
        <div>
          <p className="text-xl font-bold">{props?.ambulance?.name}</p>
          {/* <p className="text-gray-600">{props?.patient?.type}</p> */}
        </div>
      </div>
      <div className="p-4 border-t flex gap-4">
        {/* <Button variant="solid" color="primary" className="w-full">
          Reschedule
        </Button> */}
        <Button
          variant="bordered"
          color="danger"
          className="md:w-full opacity-80 w-full bg-red-400/20"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
