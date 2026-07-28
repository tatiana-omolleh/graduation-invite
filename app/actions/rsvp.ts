'use server';

import { sql } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function submitRsvp(slug: string, status: 'yes' | 'no') {
  try {
    await sql`
      UPDATE guests 
      SET rsvp_status = ${status}, updated_at = CURRENT_TIMESTAMP 
      WHERE slug = ${slug}
    `;
    
    // Clears Next.js cache so refreshing the page shows the new status
    revalidatePath(`/${slug}`);
    
    return { success: true };
  } catch (error) {
    console.error('Database error updating RSVP:', error);
    return { success: false, error: 'Failed to update RSVP status.' };
  }
}