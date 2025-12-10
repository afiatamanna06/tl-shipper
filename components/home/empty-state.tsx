import React from "react";
import { Text, Image } from "react-native";
import { Box } from "../ui/box";
import { VStack } from "../ui/vstack";

export default function EmptyState() {
  return (
    <Box className="flex-1 p-6 justify-center items-center">
      <VStack className="items-center">
        <Image
          source={require("../../assets/images/sad.png")}
          className="w-24 h-24 mb-4 object-cover"
        />
        <Text className="">কোনো রিভিউ নেই</Text>
      </VStack>
    </Box>
  );
}
