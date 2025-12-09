import React from "react";
import { Menu, MenuItem, MenuItemLabel } from "../ui/menu";
import { Button, ButtonText } from "../ui/button";

type Props = {
  value: "new-to-old" | "old-to-new";
  onChange: (v: "new-to-old" | "old-to-new") => void;
};

export default function SortDropdown({ value, onChange }: Props) {
  return (
    <Menu
      placement="top"
      offset={5}
      disabledKeys={["Settings"]}
      trigger={({ ...triggerProps }) => {
        return (
          <Button {...triggerProps}>
            <ButtonText>
              {value === "new-to-old" ? "নতুন থেকে পুরাতন" : "পুরাতন থেকে নতুন"}
            </ButtonText>
          </Button>
        );
      }}
    >
      <MenuItem
        key="new-to-old"
        textValue="new-to-old"
        onPress={() => onChange("new-to-old")}
      >
        <MenuItemLabel size="sm">নতুন থেকে পুরাতন</MenuItemLabel>
      </MenuItem>
      <MenuItem
        key="old-to-new"
        textValue="old-to-new"
        onPress={() => onChange("old-to-new")}
      >
        <MenuItemLabel size="sm">পুরাতন থেকে নতুন</MenuItemLabel>
      </MenuItem>
    </Menu>
  );
}
