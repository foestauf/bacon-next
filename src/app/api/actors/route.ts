import { NextResponse } from 'next/server';

export async function GET(_req: Request, _res: Response) {
  return NextResponse.json({ hello: 'world' });
}
