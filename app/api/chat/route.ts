//EVENT-Streaming endpoint for a flask app
import { NextResponse } from "next/server"
import * as nodeFectch from "node-fetch"

export async function GET(request: Request, res: Response) {
  console.log("api hit")
  // res.setHeader("Content-Type", "text/event-stream")
  // res.setHeader("Cache-Control", "no-cache")
  // res.setHeader("Connection", "keep-alive") //Next response headers have to be different

  try {
    debugger
    const externalResponse = await fetch("http://127.0.0.1:5000/events")

    if (externalResponse.body) {
      const reader = externalResponse.body.getReader()
      // Recursive function to read chunks from the stream
      function readStream() {
        return reader.read().then(({ done, value }) => {
          if (done) {
            res.end()
            return
          }

          // Forward the chunk to the client
          res.write(`data: ${new TextDecoder().decode(value)}\n\n`)

          // Continue reading
          return readStream()
        })
      }

      readStream()
    } else {
      res.status(500).send("Failed to stream from API")
    }
  } catch (error) {
    debugger
    console.error("Error streaming from API", error)
    res.status(500).send("Failed to stream from API")
  }
}
