'use server';

import { parseMarkdownTable } from '@/lib/markdown';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export async function getBacklinks() {
  try {
    const rootDir = path.join(process.cwd());
    const markdownPath = path.join(rootDir, 'data', 'backlinks.md');
    console.log('Root directory:', rootDir);
    console.log('Attempting to read file from:', markdownPath);
    
    // 列出目录内容以进行调试
    console.log('Directory contents:', fs.readdirSync(rootDir));
    
    if (!fs.existsSync(markdownPath)) {
      console.error('File does not exist at path:', markdownPath);
      return [];
    }

    const markdownContent = fs.readFileSync(markdownPath, 'utf-8');
    console.log('File content length:', markdownContent.length);
    
    const parsedData = parseMarkdownTable(markdownContent);
    console.log('Parsed data length:', parsedData.length);
    
    return parsedData;
  } catch (error) {
    console.error('Error in getBacklinks:', error);
    return [];
  }
}