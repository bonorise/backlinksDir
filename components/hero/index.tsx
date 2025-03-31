'use client';

import { SearchBar } from "./search";
import { Tags } from "./tags";
import { Category, CategoryCount } from "@/lib/types";

interface HeroProps {
  categories: CategoryCount[];
  selectedCategories: Category[];
  onSearch: (query: string) => void;
  onSelectCategory: (category: Category) => void;
}

export function Hero({
  categories,
  selectedCategories,
  onSearch,
  onSelectCategory,
}: HeroProps) {
  return (
    <div className="flex flex-col items-center justify-center pt-20 pb-10 px-4 bg-background">
      <h1 className="text-5xl font-bold mb-10 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">200+免费提交的高质量外链</h1>
      <p className="text-xl text-muted-foreground pb-10 mb-25 text-center max-w-2xl">
        高质量外链是提升网站排名和权重的关键。每个外链都是通向成功的阶梯，日拱一卒，让我们一起构建更强大的网站影响力！
      </p>
      <SearchBar onSearch={onSearch} />
      <Tags
        categories={categories}
        selectedCategories={selectedCategories}
        onSelectCategory={onSelectCategory}
      />
    </div>
  );
}