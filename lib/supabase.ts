import { createClient } from '@supabase/supabase-js';
import { Backlink } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 获取所有反向链接数据
export async function fetchBacklinks(): Promise<Backlink[]> {
  const { data, error } = await supabase
    .from('backlinks')
    .select('*')
    .order('featured', { ascending: false })
    .order('domain_authority', { ascending: false });
  
  if (error) {
    console.error('Error fetching backlinks:', error);
    return [];
  }
  
  // 将数据库字段名转换为驼峰命名
  return data.map(item => ({
    title: item.title,
    description: item.description,
    url: item.url,
    categories: item.categories,
    pricing: item.pricing,
    isDoFollow: item.is_do_follow,
    domainAuthority: item.domain_authority,
    monthlyTraffic: item.monthly_traffic,
    requiresReview: item.requires_review,
    requiresRegistration: item.requires_registration,
    freeSubmissionWaitTime: item.free_submission_wait_time,
    featured: item.featured,
    lastChecked: item.last_checked,
    status: item.status
  }));
}