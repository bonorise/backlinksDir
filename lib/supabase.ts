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

  try {
    console.log('开始获取数据...');
    const { data, error } = await supabase
      .from('backlinks')
      .select('*')
      .order('featured', { ascending: false })
      .order('domain_authority', { ascending: false });
    
    console.log('原始数据:', data);
    console.log('错误信息:', error);
    
    if (error) {
      console.error('获取反向链接数据出错:', error);
      return [];
    }
    
    if (!data || data.length === 0) {
      console.log('没有获取到数据');
      return [];
    }
    
    // 将数据库字段名转换为驼峰命名
    const transformedData = data.map(item => ({
      title: item.title,
      description: item.description,
      url: item.url,
      categories: Array.isArray(item.categories) ? item.categories : [],
      pricing: Array.isArray(item.pricing) ? item.pricing : [],
      isDoFollow: Boolean(item.is_do_follow),
      domainAuthority: Number(item.domain_authority) || 0,
      monthlyTraffic: Number(item.monthly_traffic) || 0,
      requiresReview: Boolean(item.requires_review),
      requiresRegistration: Boolean(item.requires_registration),
      freeSubmissionWaitTime: Number(item.free_submission_wait_time) || 0,
      featured: Boolean(item.featured),
      lastChecked: item.last_checked,
      status: item.status || 'active'
    }));
    
    console.log('转换后的数据:', transformedData);
    return transformedData;
  } catch (e) {
    console.error('获取数据时发生异常:', e);
    return [];
  }
}