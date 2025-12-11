import React from "react";
import { Text } from "react-native";
import { Menu, MenuItem, MenuItemLabel } from "../ui/menu";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Button } from "../ui/button";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = {
  value: "new-to-old" | "old-to-new";
  onChange: (v: "new-to-old" | "old-to-new") => void;
};

export default function SortDropdown({ value, onChange }: Props) {
  return (
    <Menu
      placement="bottom left"
      className="w-48 bg-white border-0 shadow-lg text-gray-600"
      disabledKeys={["Settings"]}
      trigger={({ ...triggerProps }) => {
        return (
          <Button
            {...triggerProps}
            className="p-0 bg-transparent flex-row items-center gap-2 shadow-none"
          >
            <Text className="">
              {value === "new-to-old" ? "নতুন থেকে পুরানো" : "পুরাতন থেকে নতুন"}
            </Text>
            <MaterialIcons className="" name="sort" size={18} color="black" />
          </Button>
        );
      }}
    >
      <MenuItem
        key="new-to-old"
        textValue="new-to-old"
        className="w-[100%] flex-row justify-between pr-10"
        onPress={() => onChange("new-to-old")}
      >
        <MenuItemLabel size="sm" className="text-gray-600 w-[60%]">
          নতুন থেকে পুরানো
        </MenuItemLabel>
        {value === "new-to-old" && (
          <Text className="text-blue-500 w-10">
            <AntDesign name="check" size={16} />
          </Text>
        )}
      </MenuItem>
      <MenuItem
        key="old-to-new"
        textValue="old-to-new"
        className="w-[100%] flex-row justify-between pr-10"
        onPress={() => onChange("old-to-new")}
      >
        <MenuItemLabel size="sm" className="text-gray-600 w-[60%]">
          পুরানো থেকে নতুন
        </MenuItemLabel>
        {value === "old-to-new" && (
          <Text className="text-blue-500 w-10">
            <AntDesign name="check" size={16} />
          </Text>
        )}
      </MenuItem>
    </Menu>
  );
}
