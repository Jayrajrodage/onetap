import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import React from "react";
import { Button } from "@heroui/button";

import { profileFilter, view } from "@/types";

interface viewProps {
  filter: profileFilter;
  setFilter: React.Dispatch<React.SetStateAction<profileFilter>>;
}

const View: React.FC<viewProps> = ({ filter, setFilter }) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="capitalize" size="sm" variant={"bordered"}>
          {filter.view}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="view"
        selectedKeys={new Set([filter.view])}
        selectionMode="single"
        variant="flat"
        onSelectionChange={(keys) => {
          const view = (Array.from(keys)[0] as view) || "day";

          setFilter((prev) => ({
            ...prev,
            view,
          }));
        }}
      >
        <DropdownItem key="day">Day</DropdownItem>
        <DropdownItem key="week">Week</DropdownItem>
        <DropdownItem key="month">Month</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default View;
