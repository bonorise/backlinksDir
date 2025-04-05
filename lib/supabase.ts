import { createClient } from '@supabase/supabase-js';
import { Backlink } from './types';

// 确保环境变量存在
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('缺少 Supabase 环境变量。请确保设置了 NEXT_PUBLIC_SUPABASE_URL 和 NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

// 获取所有反向链接数据
export async function fetchBacklinks(): Promise<Backlink[]> {
  // 如果环境变量缺失，返回空数组
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase 环境变量缺失，无法获取数据');
    return [];
  }

  const { data, error } = await supabase
    .from('backlinks')
    .select('*')
    .order('featured', { ascending: false })
    .order('domain_authority', { ascending: false });
  
  if (error) {
    console.error('获取反向链接数据出错:', error);
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