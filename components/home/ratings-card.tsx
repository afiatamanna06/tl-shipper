import { Text } from "react-native";
import React from "react";
import { Box } from "../ui/box";
import { Review, toBanglaNumber } from "@/constants/mockReviews";
import { MaterialIcons, Fontisto } from "@expo/vector-icons";
import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";

interface RatingsCardProps {
  initialRating: number | string;
  reviews: Review[];
}

const RatingsCard = ({ initialRating, reviews }: RatingsCardProps) => {
  const ratingCount = reviews.length;
  return (
    <Box className="mt-4 mx-4 p-4 bg-red-900/5 rounded-xl">
      <HStack className="items-center">
        {/* Left Rating */}
        <VStack className="items-center">
          <HStack className="items-center gap-1">
            <Text className="text-yellow-500 text-lg ml-1">
              <MaterialIcons name="stars" size={24} />
            </Text>
            <Text className="text-3xl font-bold">
              {typeof initialRating === "number"
                ? initialRating.toFixed(1)
                : initialRating}
            </Text>
          </HStack>
          <Text className="text-gray-600 mt-1">
            ({toBanglaNumber(ratingCount)} রেটিং)
          </Text>
        </VStack>

        {/* Bars */}
        <VStack className="flex-1 ml-6">
          {[5, 4, 3, 2, 1].map((s) => {
            const total = reviews.length;
            const count = reviews.filter((r) => r.rating === s).length;
            const percent = total ? Math.round((count / total) * 100) : 0;
            return (
              <HStack key={s} className="items-center mb-1.5">
                <Text className="text-xs mr-1">{toBanglaNumber(s)}</Text>
                <Text className="text-xs text-yellow-500">
                  <Fontisto name="star" size={10} />
                </Text>
                <Box className="mx-1 w-40 h-[6px] bg-neutral-200 rounded-full overflow-hidden">
                  <Box
                    style={{ width: `${percent}%` }}
                    className="h-full bg-red-900 rounded-full"
                  />
                </Box>
                <Text className="text-gray-500 text-xs text-right w-9">
                  {(percent.toString().length === 1
                    ? "  "
                    : percent.toString().length === 2
                    ? " "
                    : "") + toBanglaNumber(percent)}
                  %
                </Text>
              </HStack>
            );
          })}
        </VStack>
      </HStack>
    </Box>
  );
};

export default RatingsCard;
