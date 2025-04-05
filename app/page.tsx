'use client';

import { useState, useMemo, useEffect } from 'react';
import { Hero } from '@/components/hero';
import { TableView } from '@/components/listing/table-view';
import { Footer } from '@/components/footer';
import { Category, Backlink } from '@/lib/types';
import { getBacklinks } from './actions';
import Head from 'next/head';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [backlinks, setBacklinks] = useState<Backlink[]>([]);

  // 在组件中添加以下代码
  useEffect(() => {
    async function loadData() {
      console.log('开始加载数据...');
      const data = await getBacklinks();
      console.log('页面组件获取到的数据:', data);
      setBacklinks(data);
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
        <TableView data={filteredData} />
        <Footer />
      </main>
    </>
  );
}