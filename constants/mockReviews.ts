export type Review = {
  id: string;
  rating: number;
  text: string;
  date: string;
  tags?: string[];
  reviewer?: string;
};

export const mockReviews: Review[] = [
  { id: 'r1', rating: 5, text: "আমি ড্রাইভার সাথে খুব ভালো অভিজ্ঞতা পেয়েছি, সময় নিয়ে সতর্ক।", date: "২০২৫-০১-১২", tags: ["সময় সচেতন","ভালো ব্যবহার"], reviewer: "আলিফ" },
  { id: 'r2', rating: 4, text: "গাড়িটি পরিষ্কার ছিল এবং ড্রাইভার নম্র ছিলেন।", date: "২০২৫-০২-০৫", tags: ["পরিষ্কার"], reviewer: "সাদিয়া" },
  { id: 'r3', rating: 2, text: "ড্রাইভার দেরিতে উপস্থিত ছিলেন এবং রাস্তা বোঝেননি।", date: "২০২৫-০৩-১৫", tags: ["বিচলিত"], reviewer: "রফিক" },
  // Add many more for scrolling
  ...Array.from({ length: 19 }).map((_, i) => ({
    id: `r${i+4}`,
    rating: Math.ceil(Math.random() * 5),
    text: `সাম্পল রিভিউ নম্বর ${i+4}. (এইটি স্ক্রল টেস্টের জন্য)`,
    date: `২০২৫-০${(i % 9) + 1}-০${(i % 28) + 1}`,
    tags: i % 2 ? ["ভালো ব্যবহার"] : ["তথ্য"]
  }))
];
