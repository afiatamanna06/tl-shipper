import React from "react";
import { Text, View } from "react-native";
import { Box } from "../ui/box";
import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";
import { Badge } from "../ui/badge";
import { Review } from "@/constants/mockReviews";
import { AntDesign } from "@expo/vector-icons";

export function Stars({ n }: { n: number }) {
  return (
    <View style={{ flexDirection: "row" }}>
      {Array.from({ length: n }).map((_, i) => (
        <AntDesign
          key={`star-filled-${i}`}
          name="star"
          size={16}
          color="#FFB400"
        />
      ))}
      {Array.from({ length: 5 - n }).map((_, i) => (
        <Text key={`star-empty-${i}`} className="text-gray-200">
          <AntDesign name="star" size={16} />
        </Text>
      ))}
    </View>
  );
}

export default function ReviewItem({ review }: { review: Review }) {
  return (
    <Box className="p-4 border border-neutral-100 shadow-lg bg-white rounded-lg">
      <HStack className="gap-3 items-center">
        <Stars n={review.rating} />
        <Text className="text-gray-500 text-sm">{review.date}</Text>
      </HStack>

      <VStack className="space-y-2">
        {review.text ? (
          <Text className="text-neutral-500 mt-2">{review.text}</Text>
        ) : null}
        <HStack className="gap-2 mt-3 flex-wrap">
          {review.tags?.map((t) => (
            <Badge key={t} className="bg-neutral-100 rounded-full">
              <Text>{t}</Text>
            </Badge>
          ))}
        </HStack>
      </VStack>
    </Box>
  );
}
