import React from "react";
import { Text } from "react-native";
import { Box } from "../ui/box";
import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";
import { Badge } from "../ui/badge";
import { Review } from "@/constants/mockReviews";

function Stars({ n }: { n: number }) {
  return <Text>{'★'.repeat(n)}{'☆'.repeat(5 - n)}</Text>;
}

export default function ReviewItem({ review }: { review: Review }) {
  return (
    <Box className="p-4 border-b border-gray-200">
      <HStack className="justify-between items-center">
        <Stars n={review.rating} />
        <Text className="text-gray-400">{review.date}</Text>
      </HStack>

      <VStack className="mt-2 space-y-2">
        <Text>{review.text}</Text>
        <HStack className="space-x-2 flex-wrap">
          {review.tags?.map((t) => (
            <Badge key={t} variant="outline">{t}</Badge>
          ))}
        </HStack>
      </VStack>
    </Box>
  );
}
