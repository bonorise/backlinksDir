'use server';

import { Backlink } from '@/lib/types';
import { fetchBacklinks } from '@/lib/supabase';

export async function getBacklinks(): Promise<Backlink[]> {
  return fetchBacklinks();
}