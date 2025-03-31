'use server';

import { parseMarkdownTable } from '@/lib/markdown';
import fs from 'fs';
import path from 'path';

export async function getBacklinks() {
  const markdownPath = path.join(process.cwd(), 'data', 'backlinks.md');
  const markdownContent = fs.readFileSync(markdownPath, 'utf-8');
  return parseMarkdownTable(markdownContent);
}