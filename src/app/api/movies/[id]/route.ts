import { NextResponse } from "next/server";

import tmdbClient from "@/utils/tmdbClient";



export async function GET(_req: Request, {params}: {params: {id:  string}}) {
  const movie = await tmdbClient.movies.getById(params.id, {include: {credits: true}});
  return NextResponse.json(movie);
}