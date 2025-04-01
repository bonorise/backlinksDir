'use server';

import { parseMarkdownTable } from '@/lib/markdown';
import fs from 'fs';
import path from 'path';
import { Backlink } from '@/lib/types';

export async function getBacklinks(): Promise<Backlink[]> {
  try {
    // 尝试从 public 目录读取
    const markdownPath = path.join(process.cwd(), 'public', 'backlinks.md');
    const markdownContent = fs.readFileSync(markdownPath, 'utf-8');
    return parseMarkdownTable(markdownContent);
  } catch (error) {
    console.error('Error reading backlinks file:', error);
    return []; // 返回空数组作为备选
  }
}