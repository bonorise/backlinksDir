'use server';

import { backlinksData } from '@/data/backlinks';
import { Backlink } from '@/lib/types';

export async function getBacklinks(): Promise<Backlink[]> {
  return backlinksData;
}