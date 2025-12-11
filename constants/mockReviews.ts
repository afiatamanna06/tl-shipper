export type Review = {
  id: string;
  rating: number;
  text?: string | null | undefined;
  date: string;
  tags?: string[];
  reviewer?: string;
};

export const mockReviews: Review[] = [
  { id: 'r1', rating: 5, text: "আমি ভাইয়ের সাথে কাজ করে বেশ ভালো অভিজ্ঞতা পেয়েছি, সে সময় নিয়ে সচেতন এবং ব্যাবহার খুবই ভালো। আমি ভাইয়ের ভালো চাই।", date: "২ জানুয়ারি ২০২৪", tags: ["সময় সচেতন","ভালো ব্যবহার"], reviewer: "আলিফ" },
  { id: 'r2', rating: 5, text: "", date: "১ জানুয়ারি ২০২৪", tags: ["সময় সচেতন","ভালো ব্যবহার"], reviewer: "আলিফ" },
  { id: 'r3', rating: 1, text: "খুব বাজে লোক, তার ট্রিপ কেউ নিবেন না। সে মানুষের সাথে অনেক খারাপ ব্যাবহার করে। তার মতো হারামজাদা লোক আমি জীবনে দেখি নাই। ", date: "১ জানুয়ারি ২০২৪", tags: ["খারাপ ব্যবহার"], reviewer: "সাদিয়া" },
  { id: 'r4', rating: 1, text: null, date: "১ জানুয়ারি ২০২৪", tags: ["খারাপ ব্যবহার"], reviewer: "রফিক" },
  { id: 'r5', rating: 1, text: "খুব বাজে লোক, তার ট্রিপ কেউ নিবেন না। সে মানুষের সাথে অনেক খারাপ ব্যাবহার করে। তার মতো হারামজাদা লোক আমি জীবনে দেখি নাই। ", date: "১ জানুয়ারি ২০২৪", tags: ["খারাপ ব্যবহার"], reviewer: "সাদিয়া" },
];

export const toBanglaNumber = (num: number | string) => {
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num.toString().replace(/[0-9]/g, (d) => bengaliDigits[Number(d)]);
};

// Helper to convert Bangla digits to English
export function banglaToEnglishNumber(bangla: string) {
  const map: Record<string, string> = {
    "০": "0",
    "১": "1",
    "২": "2",
    "৩": "3",
    "৪": "4",
    "৫": "5",
    "৬": "6",
    "৭": "7",
    "৮": "8",
    "৯": "9",
  };
  return bangla.replace(/[০-৯]/g, (d) => map[d]);
}

// Helper to convert Bangla date like "২ জানুয়ারি ২০২৪" to a Date object
export function parseBanglaDate(dateStr: string) {
  const monthMap: Record<string, number> = {
    "জানুয়ারি": 0,
    "ফেব্রুয়ারি": 1,
    "মার্চ": 2,
    "এপ্রিল": 3,
    "মে": 4,
    "জুন": 5,
    "জুলাই": 6,
    "আগস্ট": 7,
    "সেপ্টেম্বর": 8,
    "অক্টোবর": 9,
    "নভেম্বর": 10,
    "ডিসেম্বর": 11,
  };

  const parts = dateStr.split(" ");
  if (parts.length !== 3) return new Date(0); // fallback

  const day = Number(banglaToEnglishNumber(parts[0]));
  const month = monthMap[parts[1]] ?? 0;
  const year = Number(banglaToEnglishNumber(parts[2]));

  return new Date(year, month, day);
}
