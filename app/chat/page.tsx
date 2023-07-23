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
    const fetchThing = async () => {
      const eventSource = new EventSource("/api/chat")
      eventSource.onmessage = (event) => {
        console.log(event.data + "\n")
      }

      eventSource.onerror = (error) => {
        console.error("EventSource failed:", error)
        eventSource.close()
      }
    }
    fetchThing()
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
