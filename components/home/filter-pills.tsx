import React from "react";
import { Text, View } from "react-native";
import { Button } from "../ui/button";
import { toBanglaNumber } from "./review-panel";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  selected: number | null;
  onSelect: (n: number | null) => void;
};

const options = [null, 5, 4, 3, 2, 1];

export default function FilterPills({ selected, onSelect }: Props) {
  return (
    <View className="flex-row flex-wrap gap-2">
  {options.map((opt) => {
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
        <View className="flex-row items-center gap-1">
          {opt !== null ? (
            <>
              <Text className={`text-sm ${active ? "text-white" : "text-neutral-500"}`}>
                {toBanglaNumber(opt)}
              </Text>
              <AntDesign
                name="star"
                size={10}
                color={active ? "white" : "gray"}
              />
            </>
          ) : (
            <Text className={`text-sm ${active ? "text-white" : "text-black"}`}>
              সব
            </Text>
          )}
        </View>
      </Button>
    );
  })}
</View>
  );
}
