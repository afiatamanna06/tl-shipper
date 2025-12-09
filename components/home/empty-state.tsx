import React from "react";
import { Text } from "react-native";
import { Box } from "../ui/box";
import { VStack } from "../ui/vstack";

export default function EmptyState() {
  return (
    <Box className="flex-1 p-6 justify-center items-center">
      <VStack className="items-center">
        <Box className="text-6xl">
          <Text>😕</Text>
        </Box>
        <Text className="">কোনো রিভিউ নেই</Text>
        <Text className="mt-2">এই ড্রাইভারের জন্য এখনও রিভিউ নেই।</Text>
      </VStack>
    </Box>
  );
}
