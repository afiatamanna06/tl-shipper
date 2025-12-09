import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Animated,
  Dimensions,
  PanResponder,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Checkbox,
  CheckboxIndicator,
} from "@/components/ui/checkbox";
import RatingButton from "@/components/home/rating-button";

const riders = [
  {
    id: 1,
    name: "Bony Amin",
    distance: "৭ ফিট ১ টন খোলা",
    rating: "৪.৮",
    location: "জিপিএস",
    price: "৳৯০০",
    tag: null,
  },
  {
    id: 2,
    name: "Yeasin Ahmed",
    distance: "৭ ফিট ১ টন খোলা",
    rating: "৪.৮",
    location: "জিপিএস",
    price: "৳৯০০",
    tag: "আপনার পছন্দের ড্রাইভার",
  },
  {
    id: 3,
    name: "Masudul Haque",
    distance: "৭ ফিট ১ টন খোলা",
    rating: "৪.৮",
    location: "জিপিএস",
    price: "৳৯০০",
    tag: null,
  },
];

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Index() {
  const [checkedIds, setCheckedIds] = useState<number[]>([]);
  const [open, setOpen] = useState(false);

  const COLLAPSED = SCREEN_HEIGHT * 0.9;
  const EXPANDED = 0;

  const panY = useRef(new Animated.Value(COLLAPSED)).current;
  const lastOffset = useRef(COLLAPSED);
  const sheetTop = useRef(COLLAPSED);

  const [scrollEnabled, setScrollEnabled] = useState(false);

  useEffect(() => {
    const listenerId = panY.addListener(({ value }) => {
      sheetTop.current = value;
    });
    return () => panY.removeListener(listenerId);
  }, [panY]);

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
          gestureState.dy < 0 || sheetTop.current < COLLAPSED / 2
            ? EXPANDED
            : COLLAPSED;
        Animated.spring(panY, {
          toValue: finalPos,
          useNativeDriver: false,
        }).start(() => {
          lastOffset.current = finalPos;
          setScrollEnabled(finalPos === EXPANDED);
        });
      },
    })
  ).current;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View className="flex-row justify-between items-center px-4 pt-12 pb-2">
        <TouchableOpacity className="shadow-2xl bg-white py-2 px-3 rounded-full">
          <Text className="text-2xl">←</Text>
        </TouchableOpacity>
        <LinearGradient
          colors={["#66BB6A", "#43A047"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="px-1 py-0.5 rounded-none"
        >
          <Text className="text-white font-bold text-xl">২০:৫৯</Text>
        </LinearGradient>
      </View>
      <Text className="text-xl font-bold px-5 mt-2 mb-4">বিডিং চলছে</Text>
      <ScrollView className="flex-1 px-4">
        {riders.map((item) => (
          <View
            key={item.id}
            className="flex-row items-start justify-between mb-6"
          >
            <View className="flex-row items-start gap-2.5">
              <Avatar size="md">
                <AvatarFallbackText>{item.name}</AvatarFallbackText>
              </Avatar>
              <View>
                <Text className="text-lg">{item.name}</Text>
                <Text className="text-gray-500 text-sm">{item.distance}</Text>
                <View className="flex-row items-center mt-1">
                  <View className="flex-row items-center">
                    <View className="bg-yellow-500/20 rounded-full p-1">
                      <AntDesign name="star" size={10} color={"orange"} />
                    </View>
                    <Text className="text-gray-700 text-sm ml-1 mr-2">
                      রেটিং <Text className="font-semibold">{item.rating}</Text>
                    </Text>
                  </View>

                  <RatingButton onPress={() => setOpen(true)} />

                  <View className="flex-row items-center ml-2">
                    <View className="bg-red-900/20 rounded-full p-1">
                      <Feather name="map-pin" size={10} color="darkred" />
                    </View>
                    <Text className="text-gray-500 text-sm ml-1 mt-0.5">
                      {item.location}
                    </Text>
                  </View>
                </View>
                {item.tag && (
                  <Badge
                    className="bg-red-900/10 flex-row items-center gap-1 mt-2 px-1 py-0.5 rounded-none"
                    style={{ alignSelf: "flex-start" }}
                  >
                    <View className="flex-row items-center gap-1">
                      <AntDesign name="heart" size={10} color="darkred" />
                      <Text
                        className="text-red-900 text-xs"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{ flexShrink: 1 }}
                      >
                        {item.tag}
                      </Text>
                    </View>
                  </Badge>
                )}
              </View>
            </View>
            <View className="flex-col items-end">
              <Checkbox
                isDisabled={false}
                value={checkedIds.includes(item.id) ? "checked" : "unchecked"}
                onChange={() => {
                  setCheckedIds((prev) =>
                    prev.includes(item.id)
                      ? prev.filter((id) => id !== item.id)
                      : [...prev, item.id]
                  );
                }}
              >
                <CheckboxIndicator
                  className={`
                  w-6 h-6 rounded-md flex items-center justify-center border
                  ${
                    checkedIds.includes(item.id)
                      ? "bg-green-500 border-green-500"
                      : "bg-white border-gray-300"
                  }
                `}
                >
                  {checkedIds.includes(item.id) && (
                    <AntDesign name="check" size={16} color="lightgreen" />
                  )}
                </CheckboxIndicator>
              </Checkbox>
              <Text className="font-bold text-lg mt-1">{item.price}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Sheet */}
      <Animated.View
        style={{
          position: "absolute",
          top: panY,
          left: 0,
          right: 0,
          height: SCREEN_HEIGHT,
          backgroundColor: "#fff",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
        }}
        {...panResponder.panHandlers}
      >
        {/* Handle */}
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

        {/* Sheet Content */}
        <ScrollView
          scrollEnabled={scrollEnabled}
          contentContainerStyle={{ padding: 16 }}
          onTouchStart={() => {
            if (sheetTop.current > EXPANDED) setScrollEnabled(false);
          }}
        >
          <Badge className="bg-black px-3 py-1 rounded-full self-center mb-4">
            <Text className="text-white">BIDDING</Text>
          </Badge>
        </ScrollView>
      </Animated.View>
    </View>
  );
}
