import React from "react";
import { FlatList } from "react-native";
import LoadingState from "./loading-state";
import EmptyState from "./empty-state";
import { Review } from "@/constants/mockReviews";
import ReviewItem from "./review-item";

export default function ReviewList({ reviews, loading = false }: { reviews: Review[]; loading?: boolean; }) {
  if (loading) return <LoadingState />;
  if (!reviews || reviews.length === 0) return <EmptyState />;

  return (
    <FlatList
      data={reviews}
      keyExtractor={(i) => i.id}
      renderItem={({ item }) => <ReviewItem review={item} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 160 }}
    />
  );
}
