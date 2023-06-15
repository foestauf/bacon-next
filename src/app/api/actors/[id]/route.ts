import { NextResponse } from 'next/server';

import tmdbClient from '@/utils/tmdbClient';



export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const actor = await tmdbClient.people.getById(params.id)
  return NextResponse.json(actor);
}
