'use client';

import { useState, useMemo, useEffect } from 'react';
import { Hero } from '@/components/hero';
import { TableView } from '@/components/listing/table-view';
import { Footer } from '@/components/footer';
import { Category, Backlink } from '@/lib/types';
import { getBacklinks } from './actions';
import Head from 'next/head';
import { supabase } from '@/lib/supabase';

// 页面组件加载 - 环境检查
console.log('页面组件加载 - 环境检查:');
console.log('- 是否为客户端:', typeof window !== 'undefined');
console.log('- NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [backlinks, setBacklinks] = useState<Backlink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 直接从 Supabase 获取数据的备用方法
  const fetchDataDirectly = async () => {
    try {
      console.log('尝试直接从 Supabase 获取数据...');
      const { data, error } = await supabase
        .from('backlinks')
        .select('*')
        .order('featured', { ascending: false })
        .order('domain_authority', { ascending: false });
      
      console.log('直接获取结果:', { data, error });
      
      if (error) {
        throw error;
      }
      
      if (data && data.length > 0) {
        // 转换数据格式
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
      }
      
      return [];
    } catch (e) {
      console.error('直接获取数据出错:', e);
      throw e;
    }
  };

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);
      
      try {
        console.log('开始加载数据...');
        console.log('当前环境:', process.env.NODE_ENV);
        console.log('当前域名:', typeof window !== 'undefined' ? window.location.origin : 'SSR');
        
        // 首先尝试使用 Server Action
        let data = await getBacklinks();
        console.log('Server Action 获取的数据:', data);
        
        // 如果 Server Action 没有返回数据，尝试直接获取
        if (!data || data.length === 0) {
          console.log('Server Action 没有返回数据，尝试直接获取...');
          data = await fetchDataDirectly();
        }
        
        if (data && data.length > 0) {
          console.log('成功获取到数据，数量:', data.length);
          setBacklinks(data);
        } else {
          console.log('获取到的数据为空');
          setError('未能获取数据，请刷新页面重试');
        }
      } catch (e) {
        console.error('加载数据时出错:', e);
        setError('加载数据时出错');
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);

  const categories = useMemo(() => {
    const counts = new Map<Category, number>();
    backlinks.forEach(link => {
      link.categories.forEach(category => {
        const count = counts.get(category as Category) || 0;
        counts.set(category as Category, count + 1);
      });
    });
    return Array.from(counts.entries()).map(([category, count]) => ({
      category: category as Category,
      count,
    }));
  }, [backlinks]);

  const filteredData = useMemo(() => {
    return backlinks.filter(link => {
      const matchesSearch = searchQuery === '' || 
        link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        link.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategories = selectedCategories.length === 0 ||
        selectedCategories.some(cat => link.categories.includes(cat));
      
      return matchesSearch && matchesCategories;
    });
  }, [searchQuery, selectedCategories, backlinks]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSelectCategory = (category: Category) => {
    if (category === '全部') {
      setSelectedCategories([]);
      return;
    }
    
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <>
      <Head>
        <meta name="google-site-verification" content="87S-fF8UbuGXlJ6I7QQiinPUmOhSDklRqyu4Xp3A_Z8" />
      </Head>
      <main className="min-h-screen bg-background">
        <Hero
          categories={categories}
          selectedCategories={selectedCategories}
          onSearch={handleSearch}
          onSelectCategory={handleSelectCategory}
        />
        
        {loading && (
          <div className="container mx-auto py-8 text-center">
            <p className="text-lg">加载数据中...</p>
          </div>
        )}
        
        {error && (
          <div className="container mx-auto py-8 text-center">
            <p className="text-lg text-red-500">{error}</p>
            <button 
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
              onClick={() => window.location.reload()}
            >
              刷新页面
            </button>
          </div>
        )}
        
        {!loading && !error && (
          <>
            <TableView data={filteredData} />
            {filteredData.length === 0 && backlinks.length > 0 && (
              <div className="container mx-auto py-8 text-center">
                <p className="text-lg">没有符合筛选条件的数据</p>
              </div>
            )}
            {backlinks.length === 0 && (
              <div className="container mx-auto py-8 text-center">
                <p className="text-lg">暂无数据</p>
              </div>
            )}
          </>
        )}
        
        <Footer />
      </main>
    </>
  );
}