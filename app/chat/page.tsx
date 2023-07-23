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

  console.log(`input ${input}`)
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
        <textarea
          onChange={(e) => {
            setInput(e.target.value)
          }}
        >
          {input}
        </textarea>
        <button type="submit">Click Me</button>
      </form>
    </section>
  )
}
