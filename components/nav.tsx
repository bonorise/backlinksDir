'use client';

import { Link, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";

export function Nav() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link className="h-5 w-5 text-primary" />
          <span className="text-3xl font-semibold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            BacklinksDirectory
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-10 gap-2"
            onClick={() => window.open('https://github.com/yourusername/backlinks-directory', '_blank')}
          >
            <Github className="h-5 w-5" />
            提交外链资源
          </Button>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}