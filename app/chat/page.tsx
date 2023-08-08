"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function IndexPage() {
  const [input, setInput] = useState<string>("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(input)
    console.log("submitted")
  }
  useEffect(() => {
    const listenSSE = (
      callback: (event: MessageEvent<any>) => { cancel?: true } | undefined
    ) => {
      const eventSource = new EventSource("/api/chat", {
        withCredentials: true,
      })
      console.info("Listenting on SEE", eventSource)
      eventSource.onmessage = (event) => {
        const result = callback(event)
        if (result?.cancel) {
          console.info("Closing SSE")
          eventSource.close()
        }
      }

      return {
        close: () => {
          console.info("Closing SSE")
          eventSource.close()
        },
      }
    }
    listenSSE((e) => {
      console.log("event")
      console.log(e)
    })
  }, [])

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          chat page
        </h1>
      </div>
      {/* Chat list container */}
      <div className="flex flex-col"></div>

      <form onSubmit={handleSubmit}>
        <button type="submit">Click Me</button>
      </form>
    </section>
  )
}
