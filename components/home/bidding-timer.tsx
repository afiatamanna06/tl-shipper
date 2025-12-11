import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function BiddingClock() {
  // 20 minutes 59 seconds
  const TOTAL_SECONDS = 20 * 60 + 59;

  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 0) return TOTAL_SECONDS;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Convert seconds → mm:ss
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const englishTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  // Convert English digits to Bangla digits
  const toBangla = (str: string) =>
    str.replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[parseInt(d, 10)]);

  const banglaTime = toBangla(englishTime);

  return (
    <LinearGradient
      colors={["#66BB6A", "#43A047"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      className="px-1 py-0.5 rounded-none"
    >
      <Text className="text-white font-bold text-xl">{banglaTime}</Text>
    </LinearGradient>
  );
}
