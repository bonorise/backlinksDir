'use server';

import { parseMarkdownTable } from '@/lib/markdown';
import fs from 'fs';
import path from 'path';
import { Backlink } from '@/lib/types';

export async function getBacklinks(): Promise<Backlink[]> {
  const markdownPath = path.join(process.cwd(), 'data', 'backlinks.md');
  const markdownContent = fs.readFileSync(markdownPath, 'utf-8');
  return parseMarkdownTable(markdownContent);
}