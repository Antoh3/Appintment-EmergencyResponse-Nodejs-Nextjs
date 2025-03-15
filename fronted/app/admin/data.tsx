import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue} from "@nextui-org/react";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { LuEye } from "react-icons/lu";
import React, { Key } from "react";

const users = [
  {
    name: "Tony Reichert",
    email: "tony.reichert@example.com",
    role: "CEO",
    department: "Management",
    status: "active",
    actions: ["view", "edit", "delete"],
    avatar: "https://i.pravatar.cc/150?u=tony.reichert@example.com",
  },
  {
    name: "Zoey Lang",
    email: "zoey.lang@example.com",
    role: "Technical Lead",
    department: "Development",
    status: "paused",
    actions: ["view", "edit", "delete"],
    avatar: "https://i.pravatar.cc/150?u=zoey.lang@example.com",
  },
  {
    name: "Jane Fisher",
    email: "jane.fisher@example.com",
    role: "Senior Developer",
    department: "Development",
    status: "active",
    actions: ["view", "edit", "delete"],
    avatar: "https://i.pravatar.cc/150?u=jane.fisher@example.com",
  },
  {
    name: "William Howard",
    email: "william.howard@example.com",
    role: "Community Manager",
    department: "Marketing",
    status: "vacation",
    actions: ["view", "edit", "delete"],
    avatar: "https://i.pravatar.cc/150?u=william.howard@example.com",
  },
  {
    name: "Kristen Copper",
    email: "kristen.cooper@example.com",
    role: "Sales Manager",
    department: "Sales",
    status: "active",
    actions: ["view", "edit", "delete"],
    avatar: "https://i.pravatar.cc/150?u=kristen.cooper@example.com",
  },
];
  
  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Role",
      selector: "role",
      sortable: true,
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
    },
    {
      name: "Actions",
    },
  ];
  

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function PractitionerRequest() {
  const renderCell = React.useCallback((user:any, columnKey: string | number) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{radius: "lg", src: user.avatar}}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{user.department}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[cellValue]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <LuEye />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <FiEdit3 />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <MdDeleteOutline />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
  <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.selector} align={column.selector === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={users}>
        {(item) => (
          <TableRow key={item.email}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
