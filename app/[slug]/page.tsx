import { sql } from '@/lib/db';
import { notFound } from 'next/navigation';

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
  // Await params to ensure Next.js 15 compatibility
  const { slug } = await params;
  
  const rows = (await sql`SELECT * FROM guests WHERE slug = ${slug}`) as Guest[];
  const guest = rows[0];

  if (!guest) {
    notFound();
  }

  return (
    
      
        
          <h2>Personal Invitation <br></br>
        
        Welcome, {guest.name} <br></br>
        
          Current RSVP Status: {guest.rsvp_status}
        
      
    </h2>
  );
}