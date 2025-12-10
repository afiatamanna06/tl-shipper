import React from "react";
import { Text, View } from "react-native";
import { Button } from "../ui/button";
import { toBanglaNumber } from "./review-panel";

type Props = {
  selected: number | null;
  onSelect: (n: number | null) => void;
};

const options = [null, 5, 4, 3, 2, 1];

export default function FilterPills({ selected, onSelect }: Props) {
  return (
    <View className="flex-row flex-wrap gap-2">
      {options.map((opt) => {
        const label = opt === null ? "সব" : `${opt} ★`;
        const active = opt === selected;

        return (
          <Button
            key={String(opt)}
            variant={active ? "solid" : "outline"}
            onPress={() => onSelect(opt)}
            className={`
          rounded-full px-3 h-7 
          ${active ? "bg-red-900" : "bg-white border-gray-200"}
        `}
          >
            <Text className={`text-sm ${active ? "text-white" : "text-black"}`}>
              {toBanglaNumber(label)}
            </Text>
          </Button>
        );
      })}
    </View>
  );
}
