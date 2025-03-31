'use client';

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchProps) {
  return (
    <div className="relative w-full max-w-2xl">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        className="pl-10"
        placeholder="搜索外链网站..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}