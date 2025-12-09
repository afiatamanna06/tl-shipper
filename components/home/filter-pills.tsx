import React from "react";
import { Text } from "react-native";
import { HStack } from "../ui/hstack";
import { Button } from "../ui/button";

type Props = {
  selected: number | null;
  onSelect: (n: number | null) => void;
};

const options = [null, 5, 4, 3, 2, 1];

export default function FilterPills({ selected, onSelect }: Props) {
  return (
    <HStack className="space-x-2 flex-wrap">
      {options.map((opt) => {
        const label = opt === null ? "সব" : `${opt}★`;
        const active = opt === selected;
        return (
          <Button
            key={String(opt)}
            variant={active ? "solid" : "outline"}
            onPress={() => onSelect(opt)}
            className="px-3 py-1 rounded-full"
          >
            <Text className={`${active ? "text-white" : "text-black"}`}>
              {label}
            </Text>
          </Button>
        );
      })}
    </HStack>
  );
}
