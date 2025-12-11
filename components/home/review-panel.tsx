import {
  parseBanglaDate,
  Review,
  toBanglaNumber,
} from "@/constants/mockReviews";
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
import RatingsCard from "./ratings-card";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const COLLAPSED = SCREEN_HEIGHT * 0.99;
const MID = SCREEN_HEIGHT * 0.4;
const EXPANDED = 0;

type Props = {
  visible: boolean;
  onClose: () => void;
  reviews: Review[];
  initialRating?: number | string;
  name?: string;
};

export default function ReviewPanel({
  visible,
  onClose,
  reviews,
  initialRating = 5.0,
  name = "Parvej Maruf",
}: Props) {
  const panY = useRef(new Animated.Value(COLLAPSED)).current;
  const lastOffset = useRef(COLLAPSED);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [sheetTop, setSheetTop] = useState(COLLAPSED);

  const [hasBorder, setHasBorder] = useState(false);

  const scrollRef = useRef<ScrollView>(null);

  const [filter, setFilter] = useState<number | null>(null);
  const [sort, setSort] = useState<"new-to-old" | "old-to-new">("new-to-old");

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        scrollRef.current?.scrollTo({ y: 0, animated: false });
      }, 50);
    }
  }, [visible]);

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
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // If fully expanded → never drag → allow smooth scrolling
        if (sheetTop <= EXPANDED + 20) return false;

        return Math.abs(gestureState.dy) > 5;
      },

      onPanResponderMove: (_, gestureState) => {
        let newPos = lastOffset.current + gestureState.dy;
        if (newPos < EXPANDED) newPos = EXPANDED;
        if (newPos > COLLAPSED) newPos = COLLAPSED;
        panY.setValue(newPos);
      },
      onPanResponderRelease: (_, gestureState) => {
        const endPos = lastOffset.current + gestureState.dy;

        let position = Math.max(EXPANDED, Math.min(endPos, COLLAPSED));

        // Determine nearest snap point: EXPANDED, MID, COLLAPSED
        const distToExpanded = Math.abs(position - EXPANDED);
        const distToMid = Math.abs(position - MID);
        const distToCollapsed = Math.abs(position - COLLAPSED);

        let finalPos = MID;

        if (distToExpanded < distToMid && distToExpanded < distToCollapsed) {
          finalPos = EXPANDED;
        } else if (
          distToCollapsed < distToMid &&
          distToCollapsed < distToExpanded
        ) {
          finalPos = COLLAPSED;
        }

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
      const da = parseBanglaDate(a.date).getTime();
      const db = parseBanglaDate(b.date).getTime();
      return sort === "new-to-old" ? db - da : da - db;
    });

    return r;
  }, [reviews, filter, sort]);

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
          <View
            className={`
              px-4 pt-2 pb-3 bg-white z-10 
              ${hasBorder ? "border-b border-gray-200" : ""}
            `}
          >
            <HStack className="justify-between items-start">
              <VStack>
                <Text className="text-lg font-bold">
                  ড্রাইভার রেটিং & রিভিউ
                </Text>
                <Text className="text-gray-600">{name} | টোটাল ট্রিপঃ ৩৯</Text>
              </VStack>

              <Button onPress={onClose} className="bg-white p-1.5">
                <Text className="text-xl">✕</Text>
              </Button>
            </HStack>
          </View>

          <ScrollView
            ref={scrollRef}
            onScroll={(e) => {
              const y = e.nativeEvent.contentOffset.y;
              setHasBorder(y > 2);
            }}
            scrollEventThrottle={16}
            scrollEnabled={scrollEnabled}
            contentContainerStyle={{ paddingTop: 0, paddingBottom: 32 }}
            stickyHeaderIndices={[0, 1]} // make sort + filter sticky
          >
            {/* Rating Card */}
            <RatingsCard initialRating={initialRating} reviews={reviews} />

            {/* Sticky Section 1: Review count + Sort */}
            <View className="bg-white">
              <Box className="px-4 pt-4 flex-row justify-between items-center">
                <Text className="text-lg font-bold">
                  ড্রাইভার রিভিউ ({toBanglaNumber(filteredReviews.length)})
                </Text>
                <SortDropdown value={sort} onChange={setSort} />
              </Box>

              <Box className="px-4 py-3">
                <HStack className="justify-between items-center">
                  <FilterPills selected={filter} onSelect={setFilter} />
                </HStack>
              </Box>
            </View>

            {/* Reviews List */}
            <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
              <ReviewList reviews={filteredReviews} />
            </View>
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
