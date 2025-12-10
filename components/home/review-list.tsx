import React from "react";
import { View } from "react-native";
import LoadingState from "./loading-state";
import EmptyState from "./empty-state";
import { Review } from "@/constants/mockReviews";
import ReviewItem from "./review-item";

export default function ReviewList({
  reviews,
  loading = false,
}: {
  reviews: Review[];
  loading?: boolean;
}) {
  if (loading) return <LoadingState />;
  if (!reviews || reviews.length === 0) return <EmptyState />;

  return (
    <View style={{ paddingBottom: 30 }}>
      {reviews.map((item, index) => (
        <View
          key={item.id}
          style={{ marginBottom: index !== reviews.length - 1 ? 16 : 0 }}
        >
          <ReviewItem review={item} />
        </View>
      ))}
    </View>
  );
}
