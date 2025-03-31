'use client';

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowUpDown, Check, X, ExternalLink } from "lucide-react";
import { Backlink } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface TableViewProps {
  data: Backlink[];
}

type SortField = 'domainAuthority' | 'monthlyTraffic' | 'pricing' | 
  'requiresReview' | 'requiresRegistration' | 'freeSubmissionWaitTime' | 'isDoFollow';
type SortDirection = 'asc' | 'desc';

export function TableView({ data }: TableViewProps) {
  const [sortField, setSortField] = useState<SortField>('domainAuthority');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortField === 'pricing') {
      return sortDirection === 'asc'
        ? a.pricing.length - b.pricing.length
        : b.pricing.length - a.pricing.length;
    }
    if (sortField === 'requiresReview' || sortField === 'requiresRegistration' || sortField === 'isDoFollow') {
      return sortDirection === 'asc' 
        ? Number(a[sortField]) - Number(b[sortField])
        : Number(b[sortField]) - Number(a[sortField]);
    }
    const aValue = a[sortField] || 0;
    const bValue = b[sortField] || 0;
    return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
  });

  return (
    <div className="container mx-auto px-4 pb-8">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-500/25 hover:bg-gray-500/25">
            <TableHead className="w-[150px]">网站名称</TableHead>
            <TableHead className="w-[300px]">描述</TableHead>
            <TableHead className="w-[100px]">操作</TableHead>
            <TableHead className="w-[90px]">
              <Button
                variant="ghost"
                onClick={() => handleSort('pricing')}
                className={cn(
                  "h-8 px-2 hover:bg-transparent whitespace-normal text-center",
                  sortField === 'pricing' && 'text-primary'
                )}
              >
                <div className="grid grid-cols-2 gap-x-1 text-sm">
                  <span>收</span>
                  <span>费</span>
                  <span>类</span>
                  <span>型</span>
                </div>
                <ArrowUpDown className="mx-auto mt-1 ml-1 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="w-[80px]">
              <Button
                variant="ghost"
                onClick={() => handleSort('isDoFollow')}
                className={cn(
                  "h-8 px-2 hover:bg-transparent whitespace-normal text-center",
                  sortField === 'isDoFollow' && 'text-primary'
                )}
              >
                Follow
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="w-[40px]">
              <Button
                variant="ghost"
                onClick={() => handleSort('domainAuthority')}
                className={cn(
                  "h-8 px-2 hover:bg-transparent",
                  sortField === 'domainAuthority' && 'text-primary'
                )}
              >
                DA
                <ArrowUpDown className="ml-1 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="w-[90px]">
              <Button
                variant="ghost"
                onClick={() => handleSort('monthlyTraffic')}
                className={cn(
                  "h-8 px-2 hover:bg-transparent whitespace-normal text-center",
                  sortField === 'monthlyTraffic' && 'text-primary'
                )}
              >
                <div className="grid grid-cols-2 gap-x-1 text-sm">
                  <span>月</span>
                  <span>访</span>
                  <span>问</span>
                  <span>量</span>
                </div>
                <ArrowUpDown className="mx-auto mt-1 ml-1 h-5 w-5" />
              </Button>
            </TableHead>
            <TableHead className="w-[90px]">
              <Button
                variant="ghost"
                onClick={() => handleSort('requiresReview')}
                className={cn(
                  "h-8 px-2 hover:bg-transparent whitespace-normal text-center",
                  sortField === 'requiresReview' && 'text-primary'
                )}
              >
                <div className="grid grid-cols-2 gap-x-1 text-sm">
                  <span>需</span>
                  <span>要</span>
                  <span>审</span>
                  <span>核</span>
                </div>
                <ArrowUpDown className="mx-auto mt-1 ml-1 h-5 w-5" />
              </Button>
            </TableHead>
            <TableHead className="w-[90px]">
              <Button
                variant="ghost"
                onClick={() => handleSort('requiresRegistration')}
                className={cn(
                  "h-8 px-2 hover:bg-transparent whitespace-normal text-center",
                  sortField === 'requiresRegistration' && 'text-primary'
                )}
              >
                <div className="grid grid-cols-2 gap-x-1 text-sm">
                  <span>需</span>
                  <span>要</span>
                  <span>注</span>
                  <span>册</span>
                </div>
                <ArrowUpDown className="mx-auto mt-1 ml-1 h-5 w-5" />
              </Button>
            </TableHead>
            <TableHead className="w-[90px]">
              <Button
                variant="ghost"
                onClick={() => handleSort('freeSubmissionWaitTime')}
                className={cn(
                  "h-8 px-2 hover:bg-transparent whitespace-normal text-center",
                  sortField === 'freeSubmissionWaitTime' && 'text-primary'
                )}
              >
                <div className="grid grid-cols-2 gap-x-1 text-sm">
                  <span>等</span>
                  <span>待</span>
                  <span>时</span>
                  <span>间</span>
                </div>
                <ArrowUpDown className="mx-auto mt-1 ml-1 h-5 w-5" />
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((item, index) => (
            <TableRow 
              key={item.url}
              className={cn(
                index % 2 === 0 ? 'bg-background' : 'bg-orange-50/50 dark:bg-orange-950/10',
                'hover:bg-orange-100/50 dark:hover:bg-orange-900/20 transition-colors'
              )}
            >
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {item.featured && (
                    <Star className="h-4 w-4 fill-primary text-primary" />
                  )}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors truncate"
                  >
                    {item.title}
                  </a>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground whitespace-normal">
                <div className="line-clamp-2">
                  {item.description}
                </div>
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  className="w-full bg-orange-500/100 hover:bg-orange-500/75 text-foreground"
                  onClick={() => window.open(item.url, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  提交
                </Button>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {item.pricing.map(price => (
                    <Badge
                      key={price}
                      variant={price === '付费' ? 'default' : 'outline'}
                      className={cn(
                        "text-xs",
                        price === '付费' && "bg-primary/20 text-primary border-primary"
                      )}
                    >
                      {price}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-center">
                {item.isDoFollow ? (
                  <span className="font-bold text-primary">DoFollow</span>
                ) : (
                  "NoFollow"
                )}
              </TableCell>
              <TableCell className="text-center font-medium">
                {item.domainAuthority}
              </TableCell>
              <TableCell className="text-center">
                {(item.monthlyTraffic / 1000).toFixed(1)}k
              </TableCell>
              <TableCell className="text-center">
                {item.requiresReview ? (
                  <Check className="h-4 w-4 text-primary mx-auto" />
                ) : (
                  <X className="h-4 w-4 text-muted-foreground mx-auto" />
                )}
              </TableCell>
              <TableCell className="text-center">
                {item.requiresRegistration ? (
                  <Check className="h-4 w-4 text-primary mx-auto" />
                ) : (
                  <X className="h-4 w-4 text-muted-foreground mx-auto" />
                )}
              </TableCell>
              <TableCell className="text-center">
                {item.freeSubmissionWaitTime > 0 ? `${item.freeSubmissionWaitTime}天` : '无需'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}