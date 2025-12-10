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
  // Add many more for scrolling
  // ...Array.from({ length: 19 }).map((_, i) => ({
  //   id: `r${i+4}`,
  //   rating: Math.ceil(Math.random() * 5),
  //   text: `সাম্পল রিভিউ নম্বর ${i+4}. (এইটি স্ক্রল টেস্টের জন্য)`,
  //   date: `২০২৫-০${(i % 9) + 1}-০${(i % 28) + 1}`,
  //   tags: i % 2 ? ["ভালো ব্যবহার"] : ["তথ্য"]
  // }))
];
