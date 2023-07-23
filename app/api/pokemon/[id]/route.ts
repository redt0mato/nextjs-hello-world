import { NextResponse } from "next/server"

export async function GET(request: Request, res: Response) {
  const segments = request.url.split("/")
  const id = segments[segments.length - 1]
  console.log("endpoint hit")

  const url = `https://pokeapi.co/api/v2/pokemon/${id ?? 1}`
  const resp = await fetch(url)
  try {
    const json = await resp.json()
    console.log("json logging")
    console.log(json)

    return NextResponse.json(json, { status: 200 })
  } catch (err) {
    console.log(err)

    return NextResponse.error(err)
  }
}
