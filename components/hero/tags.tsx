'use client';

import { Badge } from "@/components/ui/badge";
import { Category, CategoryCount } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TagsProps {
  categories: CategoryCount[];
  selectedCategories: Category[];
  onSelectCategory: (category: Category) => void;
}

export function Tags({ categories, selectedCategories, onSelectCategory }: TagsProps) {
  const isAllSelected = selectedCategories.length === 0;

  return (
    <div className="flex flex-wrap gap-2 mt-10">
      <Badge
        variant="outline"
        className={cn(
          "cursor-pointer hover:bg-primary text-sm hover:text-primary-foreground transition-colors",
          isAllSelected && "bg-primary text-sm text-primary-foreground"
        )}
        onClick={() => onSelectCategory('全部' as Category)}
      >
        全部
      </Badge>
      {categories.map(({ category, count }) => (
        <Badge
          key={category}
          variant="outline"
          className={cn(
            "cursor-pointer hover:bg-primary text-sm hover:text-primary-foreground transition-colors",
            selectedCategories.includes(category) && "bg-primary text-sm text-primary-foreground"
          )}
          onClick={() => onSelectCategory(category)}
        >
          {category} ({count})
        </Badge>
      ))}
    </div>
  );
}