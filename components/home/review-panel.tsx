import { Review } from "@/constants/mockReviews";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  View,
  Animated,
  PanResponder,
  ScrollView,
} from "react-native";

import { Box } from "../ui/box";
import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";
import { Button } from "../ui/button";

import FilterPills from "./filter-pills";
import SortDropdown from "./sort-dropdown";
import ReviewList from "./review-list";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const COLLAPSED = SCREEN_HEIGHT * 0.99;
const MID = SCREEN_HEIGHT * 0.4;
const EXPANDED = 0;

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
  const panY = useRef(new Animated.Value(COLLAPSED)).current;
  const lastOffset = useRef(COLLAPSED);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [sheetTop, setSheetTop] = useState(COLLAPSED);

  const [filter, setFilter] = useState<number | null>(null);
  const [sort, setSort] = useState<"new-to-old" | "old-to-new">("new-to-old");

  // Track panY value
  useEffect(() => {
    const listenerId = panY.addListener(({ value }) => setSheetTop(value));
    return () => panY.removeListener(listenerId);
  }, [panY]);

  // Open/Close
  useEffect(() => {
    Animated.spring(panY, {
      toValue: visible ? MID : COLLAPSED,
      useNativeDriver: false,
    }).start(() => {
      lastOffset.current = visible ? MID : COLLAPSED;
      setScrollEnabled(visible && MID === EXPANDED);
    });
  }, [visible]);

  // --- PAN ---
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dy) > 5 && !scrollEnabled,
      onPanResponderMove: (_, gestureState) => {
        let newPos = lastOffset.current + gestureState.dy;
        if (newPos < EXPANDED) newPos = EXPANDED;
        if (newPos > COLLAPSED) newPos = COLLAPSED;
        panY.setValue(newPos);
      },
      onPanResponderRelease: (_, gestureState) => {
        let finalPos =
          gestureState.dy < 0 || sheetTop < COLLAPSED / 2
            ? EXPANDED
            : COLLAPSED;
        Animated.spring(panY, {
          toValue: finalPos,
          useNativeDriver: false,
        }).start(() => {
          lastOffset.current = finalPos;
          setScrollEnabled(finalPos === EXPANDED);
          if (finalPos === COLLAPSED) onClose();
        });
      },
    })
  ).current;

  const filteredReviews = useMemo(() => {
    const r = reviews.filter((item) =>
      filter ? item.rating === filter : true
    );
    r.sort((a, b) => {
      const da = Number(a.date.replace(/[^0-9]/g, ""));
      const db = Number(b.date.replace(/[^0-9]/g, ""));
      return sort === "new-to-old" ? db - da : da - db;
    });
    return r;
  }, [reviews, filter, sort]);

  const ratingCount = reviews.length;

  return (
    <>
      {/* BACKDROP */}
      {visible && (
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: "#000",
                opacity: panY.interpolate({
                  inputRange: [EXPANDED, COLLAPSED],
                  outputRange: [0.6, 0],
                  extrapolate: "clamp",
                }),
              },
            ]}
          />
        </TouchableWithoutFeedback>
      )}

      {/* BOTTOM SHEET */}
      <Animated.View
        style={[styles.sheet, { transform: [{ translateY: panY }] }]}
        {...panResponder.panHandlers}
      >
        <Box className="flex-1 bg-white rounded-t-2xl overflow-hidden">
          {/* HANDLE */}
          <View
            style={{
              width: 40,
              height: 5,
              backgroundColor: "#ccc",
              borderRadius: 3,
              alignSelf: "center",
              marginVertical: 10,
            }}
          />

          {/* HEADER */}
          <Box className="px-4 pt-2 pb-3 border-b border-gray-200">
            <HStack className="justify-between items-start">
              <VStack>
                <Text className="text-lg font-bold">
                  ড্রাইভার রেটিং & রিভিউ
                </Text>
                <Text className="text-gray-600">
                  Parvej Maruf | টোটাল ট্রিপ ৩৯
                </Text>
              </VStack>

              <Button onPress={onClose}>
                <Text className="text-xl">✕</Text>
              </Button>
            </HStack>

            {/* Rating Card */}
            <Box className="mt-4 p-4 bg-gray-100 rounded-xl">
              <HStack className="items-center">
                {/* Left Rating */}
                <VStack className="w-[70px]">
                  <HStack className="items-center">
                    <Text className="text-3xl font-bold">
                      {initialRating.toFixed(1)}
                    </Text>
                    <Text className="text-yellow-500 text-lg ml-1">★</Text>
                  </HStack>
                  <Text className="text-gray-600 mt-1">
                    ({ratingCount} রেটিং)
                  </Text>
                </VStack>

                {/* Bars */}
                <VStack className="flex-1 ml-6">
                  {[5, 4, 3, 2, 1].map((s) => {
                    const total = reviews.length;
                    const count = reviews.filter((r) => r.rating === s).length;
                    const percent = total
                      ? Math.round((count / total) * 100)
                      : 0;
                    return (
                      <HStack key={s} className="items-center mb-1.5">
                        <Text className="text-xs w-4">{s}</Text>
                        <Text className="text-xs w-4 text-yellow-500">★</Text>
                        <Box className="mx-2 flex-1 h-[6px] bg-gray-300 rounded-full overflow-hidden">
                          <Box
                            style={{ width: `${percent}%` }}
                            className="h-full bg-red-500 rounded-full"
                          />
                        </Box>
                        <Text className="text-gray-500 text-xs">
                          {percent}%
                        </Text>
                      </HStack>
                    );
                  })}
                </VStack>
              </HStack>
            </Box>
          </Box>

          {/* FILTERS */}
          <Box className="px-4 py-3 border-b border-gray-200">
            <HStack className="justify-between items-center">
              <FilterPills selected={filter} onSelect={setFilter} />
              <SortDropdown value={sort} onChange={setSort} />
            </HStack>
          </Box>

          {/* REVIEW LIST */}
          <ScrollView
            scrollEnabled={scrollEnabled}
            contentContainerStyle={{ padding: 16 }}
            onTouchStart={() => {
              if (sheetTop > EXPANDED) setScrollEnabled(false);
            }}
          >
            <ReviewList reviews={filteredReviews} />
          </ScrollView>
        </Box>
      </Animated.View>
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
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
});
