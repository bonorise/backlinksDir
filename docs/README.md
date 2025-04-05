# Backlinks 导航站项目需求文档

## 项目概述
一个用于分享免费和付费反向链接机会的导航网站，数据以 Markdown 文件形式存储在 GitHub 上并部署在 Vercel 平台。

## 数据字段说明

`data/backlinks.md` 文件中的表格字段含义如下:

| 字段 | 说明 | 示例值 |
|------|------|--------|
| 网站名称 | 外链资源网站的名称 | SEO导航大全 |
| 描述 | 网站的简要描述 | 最全面的SEO工具和资源导航网站 |
| 分类 | 网站所属分类，多个分类用逗号分隔 | 导航站,资源站 |
| 收费类型 | 提交外链的收费类型，可以是免费、付费或两者都支持 | 免费,付费 |
| Follow类型 | 链接的Follow属性，分为DoFollow和NoFollow | DoFollow |
| DA | 域名权威度(Domain Authority)，0-100的数值 | 45 |
| 月访问量 | 网站的月均访问量 | 50000 |
| 审核 | 是否需要审核，✓表示需要，✗表示不需要 | ✓ |
| 注册 | 是否需要注册，✓表示需要，✗表示不需要 | ✓ |
| 等待时间 | 免费提交的审核等待时间(天) | 7天 |
| 特色 | 是否为特色推荐网站，✓表示是，✗表示否 | ✓ |
| 最后检查 | 数据最后更新的日期 | 2024-03-20 |
| 状态 | 网站当前状态：active(正常)/inactive(关闭)/pending(待定) | active |

## 功能规划

### 第一期（核心功能）

1. **Hero 区域设计**
   - 搜索框
     - 实时搜索功能
     - 支持多字段搜索
     - 搜索建议功能
   - 标签导航
     - 显示所有可用标签
     - 每个标签显示对应网站数量
     - 标签点击筛选
     - 支持多标签组合
   - 视觉设计
     - 简洁现代的设计风格
     - 响应式布局
     - 合适的空间层次

2. **基础数据展示**
   - 表格视图（默认）
   - 卡片视图
   - 支持深色模式
   - 响应式设计

3. **数据字段**
   - 网站名称
   - 描述
   - 分类标签
   - 收费类型（免费/付费）
   - 域名权威度
   - 月访问量
   - 网站链接
   - 点击统计

4. **基础功能**
   - 搜索功能
     - 即时搜索结果展示
     - 支持标题和描述搜索
     - 搜索结果高亮
   - 标签筛选
     - 单标签和多标签过滤
     - 标签组合逻辑（与/或）
   - 表格排序
   - 分批加载（每次200条）
   - 热门网站标记

### 第二期（增强功能）

1. **搜索增强**
   - 高级搜索选项
   - 搜索历史记录
   - 搜索结果导出
   - 自定义搜索范围

2. **标签系统增强**
   - 标签层级关系
   - 热门标签推荐
   - 个性化标签展示
   - 标签统计分析

3. **数据管理**
   - GitHub PR提交系统
   - 数据验证
   - 批量导入工具
   - 死链检测

4. **用户体验**
   - 高级筛选
   - 自定义视图
   - 数据导出功能
   - 分享功能

5. **统计分析**
   - 点击量统计
   - 热门标签统计
   - 基础数据报表
   - 趋势分析

### 第三期（社区功能）

1. **用户系统**
   - 用户注册/登录
   - 个人收藏夹
   - 浏览历史
   - 订阅功能

2. **社区互动**
   - 评分系统
   - 评论功能
   - 举报机制
   - 贡献者积分

3. **高级功能**
   - RSS订阅
   - API接口
   - 网站健康监控
   - SEO优化工具
   - 自动更新DA/流量数据

## 技术架构

### 前端技术
- Next.js
- Tailwind CSS
- shadcn/ui 组件库
- 响应式设计
- 深色模式支持

### 数据管理
- Supabase 数据库
  - 用户认证与授权
  - 数据存储与查询
  - 实时数据更新
- JSON Schema 数据校验
- Git 版本控制

### Supabase 数据库设计

#### 表结构

1. **backlinks 表**
   - `id` (uuid, 主键)
   - `title` (text, 网站名称)
   - `description` (text, 网站描述)
   - `url` (text, 网站链接)
   - `categories` (text[], 分类数组)
   - `pricing` (text[], 收费类型数组)
   - `is_do_follow` (boolean, 是否DoFollow)
   - `domain_authority` (integer, 域名权威度)
   - `monthly_traffic` (integer, 月访问量)
   - `requires_review` (boolean, 是否需要审核)
   - `requires_registration` (boolean, 是否需要注册)
   - `free_submission_wait_time` (integer, 免费提交等待时间)
   - `featured` (boolean, 是否特色)
   - `last_checked` (date, 最后检查日期)
   - `status` (text, 状态)
   - `created_at` (timestamp with time zone, 创建时间)
   - `updated_at` (timestamp with time zone, 更新时间)

2. **users 表** (Supabase Auth 自动创建)
   - 用户认证信息
   - 用户个人资料

3. **user_favorites 表** (计划中)
   - `id` (uuid, 主键)
   - `user_id` (uuid, 外键关联users表)
   - `backlink_id` (uuid, 外键关联backlinks表)
   - `created_at` (timestamp with time zone, 创建时间)

4. **click_stats 表** (计划中)
   - `id` (uuid, 主键)
   - `backlink_id` (uuid, 外键关联backlinks表)
   - `user_id` (uuid, 可为空，外键关联users表)
   - `clicked_at` (timestamp with time zone, 点击时间)
   - `referrer` (text, 来源页面)
   - `user_agent` (text, 用户代理)

#### 数据关系

- 用户可以收藏多个反向链接 (users 1:n user_favorites)
- 每个反向链接可以被多个用户收藏 (backlinks 1:n user_favorites)
- 每个反向链接可以有多个点击记录 (backlinks 1:n click_stats)

#### 权限设置

- 匿名用户：只读权限，可查看所有反向链接
- 已登录用户：可添加收藏，可提交新的反向链接（需审核）
- 管理员：完全权限，可管理所有数据

### 用户认证

- Google 登录集成
- 邮箱/密码登录 (计划中)
- 基于角色的权限控制

### 部署方案
- Vercel 托管
- GitHub 公开仓库
- 自动化部署
- Supabase 云服务

## 项目结构
```
/
├── app/
│   ├── page.tsx (主列表页)
│   ├── layout.tsx
│   └── [category]/
│       └── page.tsx
├── components/
│   ├── ui/ (shadcn组件)
│   ├── hero/
│   │   ├── search.tsx
│   │   ├── tags.tsx
│   │   └── index.tsx
│   ├── listing/
│   │   ├── table-view.tsx
│   │   └── card-view.tsx
│   └── shared/
│       ├── search.tsx
│       └── tags.tsx
├── lib/
│   ├── utils.ts
│   └── types.ts
├── data/
│   └── backlinks/ (markdown文件)
└── docs/
    └── README.md
```

## 补充建议

1. **数据完整性**
   - 添加最后检查时间
   - 网站状态监控（活跃/关闭/暂停）
   - 历史数据存档

2. **用户体验**
   - 快捷键支持
   - 浏览位置记忆
   - 自定义列显示
   - 数据对比功能

3. **运营功能**
   - 网站提交指南
   - 常见问题解答
   - 使用统计报告
   - 贡献者展示页

4. **安全性**
   - 垃圾提交防护
   - 内容审核机制
   - 访问频率限制
   - 数据备份方案
