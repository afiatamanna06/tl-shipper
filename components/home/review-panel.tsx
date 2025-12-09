import { Review } from "@/constants/mockReviews";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import { Box } from "../ui/box";
import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";
import FilterPills from "./filter-pills";
import SortDropdown from "./sort-dropdown";
import ReviewList from "./review-list";
import { Button } from "../ui/button";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const SNAP = {
  FULL: 0,
  MID: SCREEN_HEIGHT * 0.1,
  HIDDEN: SCREEN_HEIGHT,
};

type Props = {
  visible: boolean;
  onClose: () => void;
  reviews: Review[];
  initialRating?: number;
};

export default function ReviewPanel({
  visible,
  onClose,
  reviews,
  initialRating = 5.0,
}: Props) {
  const translateY = useSharedValue(SNAP.HIDDEN);
  const startY = useSharedValue(0);

  const [filter, setFilter] = useState<number | null>(null);
  const [sort, setSort] = useState<"new-to-old" | "old-to-new">("new-to-old");
  const [loading] = useState(false);

  // open/close animation
  useEffect(() => {
    translateY.value = withSpring(visible ? SNAP.MID : SNAP.HIDDEN, {
      damping: 18,
      stiffness: 120,
    });
  }, [visible]);

  // --- NEW REANIMATED v3 GESTURE ---
  const panGesture = Gesture.Pan()
    .onStart(() => {
      startY.value = translateY.value;
    })
    .onUpdate((event) => {
      const next = startY.value + event.translationY;
      translateY.value = Math.max(0, Math.min(next, SNAP.HIDDEN));
    })
    .onEnd((event) => {
      const vy = event.velocityY;
      const curr = translateY.value;

      if (vy > 1500) {
        translateY.value = withSpring(SNAP.HIDDEN, { damping: 16 });
        runOnJS(onClose)();
        return;
      }

      const distances = [
        { p: SNAP.FULL, d: Math.abs(curr - SNAP.FULL) },
        { p: SNAP.MID, d: Math.abs(curr - SNAP.MID) },
        { p: SNAP.HIDDEN, d: Math.abs(curr - SNAP.HIDDEN) },
      ].sort((a, b) => a.d - b.d);

      translateY.value = withSpring(distances[0].p, {
        damping: 16,
        stiffness: 140,
      });

      if (distances[0].p === SNAP.HIDDEN) runOnJS(onClose)();
    });

  const backdropStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [SNAP.MID, SNAP.FULL],
      [0.4, 0.6],
      Extrapolate.CLAMP
    );

    const display = translateY.value >= SNAP.HIDDEN ? 0 : 1;
    return {
      opacity: display ? opacity : 0,
      display: display ? "flex" : "none",
      flex: 1,
    };
  });

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const filteredSorted = reviews
    .filter((r) => (filter ? r.rating === filter : true))
    .sort((a, b) =>
      sort === "new-to-old"
        ? Number(b.date.replace(/[^0-9]/g, "")) -
          Number(a.date.replace(/[^0-9]/g, ""))
        : Number(a.date.replace(/[^0-9]/g, "")) -
          Number(b.date.replace(/[^0-9]/g, ""))
    );

  return (
    <>
      <GestureHandlerRootView>
        {/* Backdrop */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: "#000" },
            backdropStyle,
          ]}
        >
          <TouchableWithoutFeedback onPress={onClose}>
            <Box className="flex-1" />
          </TouchableWithoutFeedback>
        </Animated.View>

        {/* Bottom Sheet */}

        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.sheet, sheetStyle]}>
            <Box className="flex-1 bg-white rounded-t-xl overflow-hidden">
              {/* Header */}
              <Box className="px-4 pt-3 pb-3 border-b border-gray-200">
                <HStack className="justify-between items-center">
                  <VStack>
                    <Text>ড্রাইভার রেটিং & রিভিউ</Text>
                    <Text>Parvej Maruf | টোটাল ট্রিপ ৩৯</Text>
                  </VStack>

                  <Button onPress={onClose}>
                    <Text>✕</Text>
                  </Button>
                </HStack>

                {/* Rating Card */}
                <Box className="mt-4 p-4 bg-gray-100 rounded-lg">
                  <HStack className="items-center">
                    <VStack>
                      <HStack className="items-center">
                        <Text>{initialRating?.toFixed(1) ?? 5.0}</Text>
                        <Text>★</Text>
                      </HStack>
                      <Text>({reviews.length} রেটিং)</Text>
                    </VStack>

                    <VStack className="flex-1 ml-4">
                      {[5, 4, 3, 2, 1].map((n) => (
                        <HStack key={n} className="items-center mb-1">
                          <Text>{n}★</Text>

                          <Box className="mx-2 flex-1 h-3 bg-gray-300 rounded-sm overflow-hidden">
                            <Box
                              className={`w-${(Math.random() * 70 + 10).toFixed(
                                0
                              )}% h-[100%] bg-gray-600`}
                            />
                          </Box>

                          <Text className="text-gray-400">%</Text>
                        </HStack>
                      ))}
                    </VStack>
                  </HStack>
                </Box>
              </Box>

              {/* Filters */}
              <Box className="px-4 py-3 border-b border-gray-200">
                <HStack className="justify-between items-center">
                  <FilterPills selected={filter} onSelect={setFilter} />
                  <SortDropdown value={sort} onChange={setSort} />
                </HStack>
              </Box>

              {/* Review List */}
              <Box className="flex-1">
                <ReviewList reviews={filteredSorted} loading={loading} />
              </Box>
            </Box>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: SCREEN_HEIGHT,
  },
});
