import React from "react";
import Entypo from '@expo/vector-icons/Entypo';
import { Button } from "../ui/button";
import { VStack } from "../ui/vstack";

type Props = { onPress: () => void };

export default function RatingButton({ onPress }: Props) {
  return (
    <VStack className="items-center">
      <Button onPress={onPress} className="px-0 py-0 bg-transparent shadow-none">
        <Entypo name="chevron-right" size={18} color="gray" />
      </Button>
    </VStack>
  );
}
