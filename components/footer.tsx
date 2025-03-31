'use client';

import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-background py-8">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-5xl pb-5 font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent mb-5">分享外链资源</h2>
        <p className="text-muted-foreground mb-10">
          我们知道建站的不易。如果您有更多优质的外链资源？欢迎提交分享，让更多人受益！
        </p>
        <Button
          size="lg"
          className="font-semibold bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700"
          onClick={() => window.open('https://github.com/yourusername/backlinks-directory', '_blank')}
        >
          提交外链资源网站
        </Button>
        <p className="text-sm text-muted-foreground mt-16">
          © 2024 Backlinks Directory. 本站所有资源均搜集自互联网以及社区贡献，欢迎参与建设。
        </p>
      </div>
    </footer>
  );
}