"use client"
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
  Tooltip,
  Pagination
} from "@nextui-org/react";
import React, { useEffect, useMemo, useState } from 'react'
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import useIsEditing from "./useEdit.store";
import useEditedJournal from "./useEditedJournal.store";
import { getAllJournals, deleteJournal } from "./journal";
import { message } from "antd";

const JournalTable = () => {
  // const [data, setAllJournals] = useState<any[]>([]);
  const setIsEditing: (passedBoolean: boolean) => void = useIsEditing((state) => state.setIsEditing);
  const setEditedJournal: (passedJournal: object) => void = useEditedJournal((state) => state.setEditedJournal);
  const [deleting, setDeleting] = useState<boolean>(false);

  const fetchAllJournals = async () => {
    try {

      const data: object = {
        adult_id: "adult123",
        child_id: "child123"
      }

      const res = await getAllJournals(data)
      // setAllJournals(res)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    fetchAllJournals()
  }, [])

  const data = [
    {
      id: 1,
      content: "Today was a productive day. I managed to complete all my tasks ahead of schedule.",
      date_created: "2024-08-24T14:35:00Z"
    },
    {
      id: 2,
      content: "Spent some time learning TypeScript and making API fetch requests. It's getting easier!",
      date_created: "2024-08-25T10:20:00Z"
    },
    {
      id: 3,
      content: "Went for a long walk in the park. The weather was perfect.",
      date_created: "2024-08-26T08:15:00Z"
    },
    {
      id: 4,
      content: "Had a great time catching up with an old friend over dinner.",
      date_created: "2024-08-26T19:45:00Z"
    },
    {
      id: 5,
      content: "Today was a productive day. Worked on my TypeScript project.",
      date_created: "2024-08-25T19:45:00Z",
    },
    {
      id: 6,
      content: "Today was a productive day. I managed to complete all my tasks ahead of schedule.",
      date_created: "2024-08-24T14:35:00Z"
    },
    {
      id: 7,
      content: "Spent some time learning TypeScript and making API fetch requests. It's getting easier!",
      date_created: "2024-08-25T10:20:00Z"
    },
    {
      id: 8,
      content: "Went for a long walk in the park. The weather was perfect.",
      date_created: "2024-08-26T08:15:00Z"
    },
    {
      id: 9,
      content: "Had a great time catching up with an old friend over dinner.",
      date_created: "2024-08-26T19:45:00Z"
    },
    {
      id: 10,
      content: "Today was a productive day. Worked on my TypeScript project.",
      date_created: "2024-08-25T19:45:00Z",
    },
    {
      id: 11,
      content: "Today was a productive day. Worked on my TypeScript project.",
      date_created: "2024-08-25T19:45:00Z",
    },
    {
      id: 12,
      content: "Today was a productive day. Worked on my TypeScript project.",
      date_created: "2024-08-25T19:45:00Z",
    }
  ]
  
  interface Journal {
    id: number;
    content: string;
    date_created: string;
  }


  const columns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "content",
      label: "CONTENT",
    },
    {
      key: "date_created",
      label: "DATE",
    },
    {
      key: "#",
      label: "ACTION"
    }
  ];


  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(data.length / rowsPerPage);

  const paginatedJournals = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);

  return (
    <div className="mt-8">
      <Table aria-label="Available journals" selectionMode="single" bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }>
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={paginatedJournals} emptyContent={"No journal entry yet."}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "#" ? (
                    <div className="flex gap-2">
                      <Tooltip showArrow={true} content="Update journal" placement="top-end">
                        <Button
                          isIconOnly
                          color="warning"
                          variant="faded"
                          aria-label="Edit journal"
                          // onClick={() => handleJournalEdit(item.id, item.content)}
                        >
                          <RiEdit2Line />
                        </Button>
                      </Tooltip>
                      <Tooltip showArrow={true} content="Delete journal" color="danger" placement="top-start">
                        <Button
                          isIconOnly
                          color="danger"
                          aria-label="Delete journal"
                          disabled={deleting}
                          // onClick={() => handleDeleteJournal(item.id)}
                        >
                          <RiDeleteBin6Line />
                        </Button>
                      </Tooltip>

                    </div>
                  ) : (
                    getKeyValue(item, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default JournalTable