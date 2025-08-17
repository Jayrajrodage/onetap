import type { Selection } from "@react-types/shared";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import React from "react";
import { Button } from "@heroui/button";

const View = () => {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["day"])
  );

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
    [selectedKeys]
  );

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="capitalize" size="sm" variant={"bordered"}>
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="view"
        selectedKeys={selectedKeys}
        selectionMode="single"
        variant="flat"
        onSelectionChange={setSelectedKeys}
      >
        <DropdownItem key="day">Day</DropdownItem>
        <DropdownItem key="week">Week</DropdownItem>
        <DropdownItem key="month">Month</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default View;
