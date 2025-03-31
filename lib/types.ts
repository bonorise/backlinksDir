export interface Backlink {
  title: string;
  description: string;
  url: string;
  categories: string[];
  pricing: string[];
  isDoFollow: boolean;
  domainAuthority: number;
  monthlyTraffic: number;
  featured: boolean;
  lastChecked: string;
  status: 'active' | 'inactive' | 'pending';
  requiresReview: boolean;
  requiresRegistration: boolean;
  freeSubmissionWaitTime: number;
}

export type Category = '全部' | '导航站' | '资源站' | '文章站' | '其他';

export interface CategoryCount {
  category: Category;
  count: number;
}