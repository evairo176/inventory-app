"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

export function DataTableToolbar({
  table,
  filterKeys,
}: {
  table: any;
  filterKeys: any;
}) {
  //IF any of the keys have a value
  const isFiltered = filterKeys.some(
    (key: any) => table.getState().columnFilters[key]?.length > 0,
  );

  const handleInputChange = (key: any, value: any) => {
    table.getColumn(key)?.setFilterValue(value);
  };

  const handleResetClick = () => {
    filterKeys.forEach((key: any) => {
      table.getColumn(key)?.setFilterValue("");
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-row items-center space-x-2">
        {filterKeys.map((key: any) => (
          <Input
            key={key}
            placeholder={`Filter ${key}...`}
            value={table.getColumn(key)?.getFilterValue() ?? ""}
            onChange={(event) => handleInputChange(key, event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
          />
        ))}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={handleResetClick}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
