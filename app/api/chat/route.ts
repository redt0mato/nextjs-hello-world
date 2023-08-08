//EVENT-Streaming endpoint for a flask app
import { NextResponse } from "next/server"
import * as nodeFectch from "node-fetch"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

interface Notify {
  log: (message: string) => void
  complete: (data: any) => void
  error: (error: Error | any) => void
  close: () => void
}

const longRunning = async (notify: Notify) => {
  notify.log("Started")
  await delay(1000)
  notify.log("Done 15%")
  await delay(1000)
  notify.log("Done 35%")
  await delay(1000)
  notify.log("Done 75%")
  await delay(1000)
  notify.complete({ data: "My data" })
}
export async function GET(request: Request) {
  let responseStream = new TransformStream()
  const writer = responseStream.writable.getWriter()
  const encoder = new TextEncoder()
  let closed = false

  // Invoke long running process
  longRunning({
    log: (msg: string) => writer.write(encoder.encode("data: " + msg + "\n\n")),
    complete: (obj: any) => {
      writer.write(encoder.encode("data: " + JSON.stringify(obj) + "\n\n"))
      if (!closed) {
        writer.close()
        closed = true
      }
    },
    error: (err: Error | any) => {
      writer.write(encoder.encode("data: " + err?.message + "\n\n"))
      if (!closed) {
        writer.close()
        closed = true
      }
    },
    close: () => {
      if (!closed) {
        writer.close()
        closed = true
      }
    },
  })
    .then(() => {
      console.info("Done")
      if (!closed) {
        writer.close()
      }
    })
    .catch((e) => {
      console.error("Failed", e)
      if (!closed) {
        writer.close()
      }
    })

  // Return response connected to readable
  return new Response(responseStream.readable, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "text/event-stream; charset=utf-8",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
      "Content-Encoding": "none",
    },
  })
}
