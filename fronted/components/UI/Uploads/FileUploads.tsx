"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { FaX } from "react-icons/fa6";

export default function FileUploads(props: any) {
  const [file, setFile] = useState<string | null>(null);
  const [fileEnter, setFileEnter] = useState<boolean>(false);

  const handleFileUpload = (uploadedFile: File) => {
    let blobUrl = URL.createObjectURL(uploadedFile);

    setFile(blobUrl);
  };

  return (
    <div className="w-full">
      {!file ? (
        <div
          className={`${fileEnter ? "border-4" : "border-2"} mx-auto bg-white flex flex-col w-full h-[125px] overflow-auto border-dashed items-center justify-center rounded-lg cursor-pointer`}
          onDragEnd={(e) => {
            e.preventDefault();
            setFileEnter(false);
          }}
          onDragLeave={(e) => {
            setFileEnter(false);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setFileEnter(true);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setFileEnter(false);
            if (e.dataTransfer.items) {
              // @ts-ignore
              [...e?.dataTransfer?.items].forEach((item) => {
                if (item.kind === "file") {
                  const file = item.getAsFile();

                  if (file) {
                    handleFileUpload(file);
                  }
                }
              });
            } else {
              // @ts-ignore
              [...e.dataTransfer.files].forEach((file) => {
                handleFileUpload(file);
              });
            }
          }}
        >
          <label
            className="h-full w-full flex flex-col justify-center text-center cursor-pointer"
            htmlFor="file"
          >
            {props.data}
          </label>
          <input
            className="hidden"
            id="file"
            type="file"
            onChange={(e) => {
              let files = e.target.files;

              if (files && files[0]) {
                handleFileUpload(files[0]);
              }
            }}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center h-[125px] relative bg-white rounded-lg border-2 border-green-500">
          <Button
            isIconOnly
            className="z-10 absolute right-1 top-1 rounded-lg"
            color="danger"
            size="sm"
            onClick={() => setFile(null)}
          >
            <FaX />
          </Button>
          {/*<object*/}
          {/*  className="rounded-md w-full h-full object-cover"*/}
          {/*  data={file}*/}
          {/*  type="image/png" //need to be updated based on type of file*/}
          {/*/>*/}
        </div>
      )}
    </div>
  );
}
