// app/[slug]/page.tsx
import { sql } from '@/lib/db';
import { notFound } from 'next/navigation';
import ClientExperience from './client-view';

interface Guest {
  id: number;
  slug: string;
  name: string;
  rsvp_status: string;
}

export default async function InvitePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const rows = (await sql`SELECT * FROM guests WHERE slug = ${slug}`) as Guest[];
  const guest = rows[0];

  if (!guest) {
    notFound();
  }

  return (
    <ClientExperience 
      guestName={guest.name} 
      guestSlug={guest.slug} 
      initialRsvpStatus={guest.rsvp_status} 
    />
  );
}