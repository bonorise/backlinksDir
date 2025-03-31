'use server';

import { parseMarkdownTable } from '@/lib/markdown';
import fs from 'fs';
import path from 'path';

export async function getBacklinks() {
  try {
    const markdownPath = path.join(process.cwd(), 'data', 'backlinks.md');
    console.log('Attempting to read file from:', markdownPath);
    
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