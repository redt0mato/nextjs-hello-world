export async function GET(request: Request) {
  return new Response("pokemons endpoint hit", { status: 200 })
}
