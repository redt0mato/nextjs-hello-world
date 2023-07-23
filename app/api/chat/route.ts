//EVENT-Streaming endpoint for a flask app
import { NextResponse } from "next/server"
import * as nodeFectch from "node-fetch"

export async function GET(request: Request) {
  let responseStream = new TransformStream()
  const writer = responseStream.writable.getWriter()
  const encoder = new TextEncoder()

  debugger
  writer.write(encoder.encode("Vercel is a platform for...."))
  debugger

  const res = await fetch("http://127.0.0.1:5000/events")

  let bytes = 0
  for await (const chunk of res.body) {
    debugger
    bytes += chunk.length
    console.log(
      `Chunk: ${new TextDecoder().decode(chunk)}. Read ${bytes} characters.`
    )
    await writer.write(encoder.encode(chunk))
  }

  //Read from this stream and then write to the stream

  return new Response(responseStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
    },
  })
}
