import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const resp = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
  )
  const json = await resp.json()

  return NextResponse.json(json, { status: 200 })
}
