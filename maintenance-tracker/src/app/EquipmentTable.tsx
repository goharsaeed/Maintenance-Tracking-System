"use client"; // Ensures compatibility with Next.js

import { useState } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { Equipment } from "../app/types/types";

// Initial Equipment Data
const initialData: Equipment[] = [
  {
    id: "1",
    name: "Lathe Machine",
    location: "Factory Floor 1",
    department: "Machining",
    model: "LM-200",
    serialNumber: "SN123456",
    installDate: new Date("2020-01-15"),
    status: "Operational",
  },
  {
    id: "2",
    name: "Conveyor Belt",
    location: "Assembly Line A",
    department: "Assembly",
    model: "CB-X500",
    serialNumber: "SN654321",
    installDate: new Date("2018-05-20"),
    status: "Down",
  },
  {
    id: "3",
    name: "Packaging Machine",
    location: "Warehouse B",
    department: "Packaging",
    model: "PK-300",
    serialNumber: "SN789012",
    installDate: new Date("2019-09-10"),
    status: "Maintenance",
  },
];

// Define Column Configurations
const columns: ColumnDef<Equipment>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (info) => {
      const value = info.getValue<string>();
      return <span>{value}</span>;
    },
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "serialNumber",
    header: "Serial Number",
  },
  {
    accessorKey: "installDate",
    header: "Install Date",
    cell: (info) => new Date(info.getValue<Date>()).toLocaleDateString("en-US"),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => {
      const value = info.getValue<string>();
      return (
        <span
          className={`px-3 py-1 rounded text-sm font-semibold ${
            value === "Operational"
              ? "bg-green-200 text-green-800"
              : value === "Down"
              ? "bg-red-200 text-red-800"
              : "bg-yellow-200 text-yellow-800"
          }`}
        >
          {value}
        </span>
      );
    },
  },
];

const EquipmentTable = () => {
  const [data] = useState<Equipment[]>(initialData);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Create Table Instance
  const table = useReactTable({
    data,
    columns,
    state: { columnFilters },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // Filter by status
  const handleStatusFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setColumnFilters([
      { id: "status", value: event.target.value || "" },
    ]);
  };

  return (
    <div className="overflow-x-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <label htmlFor="statusFilter" className="mr-2 text-gray-700 font-semibold">Filter by Status:</label>
          <select
            id="statusFilter"
            className="border border-indigo-500 bg-white text-gray-700 px-4 py-2 rounded-md shadow-lg hover:ring-2 focus:outline-none focus:ring-indigo-500 focus:ring-2 transition duration-200"
            onChange={handleStatusFilterChange}
          >
            <option value="">All</option>
            <option value="Operational">Operational</option>
            <option value="Down">Down</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="border border-indigo-500 bg-white text-gray-700 px-4 py-2 rounded-md shadow-lg hover:ring-2 focus:outline-none focus:ring-indigo-500 focus:ring-2 transition duration-200"
            onChange={(e) =>
              setColumnFilters([
                { id: "name", value: e.target.value },
              ])
            }
          />
        </div>
      </div>
      <table className="table-auto border-collapse w-full shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-indigo-600 text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border border-gray-300 px-6 py-4 text-left text-sm font-medium cursor-pointer hover:bg-indigo-700"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  <span>
                    {{
                      asc: " 🔼", // Ascending indicator
                      desc: " 🔽", // Descending indicator
                    }[header.column.getIsSorted() as string] ?? null}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="text-gray-700">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-t hover:bg-gray-50 transition duration-150 ease-in-out">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="border border-gray-300 px-6 py-4 text-sm"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentTable;
