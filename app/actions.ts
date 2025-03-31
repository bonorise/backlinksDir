'use server';

import { parseMarkdownTable } from '@/lib/markdown';
import fs from 'fs';
import path from 'path';

export async function getBacklinks() {
  try {
    // 使用相对路径从项目根目录访问文件
    const markdownPath = path.join(__dirname, '..', '..', 'data', 'backlinks.md');
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