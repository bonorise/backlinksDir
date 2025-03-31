import matter from 'gray-matter';
import { Backlink } from './types';

export function parseMarkdownTable(content: string): Backlink[] {
  const { content: tableContent } = matter(content);
  
  // 分割行
  const lines = tableContent.trim().split('\n');
  
  // 找到表格的起始位置（第一个包含 | 的行）
  const tableStartIndex = lines.findIndex(line => line.includes('|'));
  if (tableStartIndex === -1) return [];
  
  // 过滤出数据行（跳过表头和分隔行）
  const dataLines = lines.slice(tableStartIndex + 2).filter(line => {
    const trimmedLine = line.trim();
    return trimmedLine && trimmedLine.startsWith('|') && !trimmedLine.includes('---');
  });
  
  return dataLines.map(line => {
    const [
      title, description, categories, pricing, isDoFollow, 
      domainAuthority, monthlyTraffic, requiresReview, 
      requiresRegistration, freeSubmissionWaitTime, featured,
      lastChecked, status
    ] = line.split('|').slice(1, -1).map(cell => cell.trim());

    return {
      title,
      description,
      url: `https://example.com/${title.toLowerCase().replace(/\s+/g, '-')}`,
      categories: categories.split(',').map(c => c.trim()),
      pricing: pricing.split(',').map(p => p.trim()),
      isDoFollow: isDoFollow === 'DoFollow',
      domainAuthority: parseInt(domainAuthority),
      monthlyTraffic: parseInt(monthlyTraffic),
      requiresReview: requiresReview === '✓',
      requiresRegistration: requiresRegistration === '✓',
      freeSubmissionWaitTime: parseInt(freeSubmissionWaitTime),
      featured: featured === '✓',
      lastChecked,
      status: status as 'active' | 'inactive' | 'pending'
    };
  });
}