'use client';

import { Link, GithubIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import { LoginButton } from '@/components/auth/login-button';

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
            <GithubIcon className="h-5 w-5" />
            提交外链资源
          </Button>
          <LoginButton />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}


// export function Nav() {
//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-14 items-center justify-between">
//         <div className="flex items-center gap-2">
//           <a href="/" className="font-bold">Backlinks Directory</a>
//         </div>
        
//         {/* 添加登录按钮 */}
//         <LoginButton />
//       </div>
//     </header>
//   );
// }
