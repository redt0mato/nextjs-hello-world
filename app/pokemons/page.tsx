"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    const getData = async () => {
      const resp = await fetch("/api/pokemons")
      const json = await resp.json()
      setPokemons(json.results)
    }
    getData()
  }, [])
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          List of Pokemons
        </h1>
      </div>
      <div className="flex flex-col">
        {pokemons &&
          pokemons.length &&
          pokemons.map((pokemon, index) => {
            return (
              <div className="flex flex-row justify-around" key={pokemon.name}>
                <div>{index + 1}.</div>
                <div>{pokemon.name}</div>
                <Link href={`/pokemon/${index + 1}`}>Find out more!</Link>

                {/* {JSON.stringify(pokemon)} */}
              </div>
            )
          })}
      </div>
    </section>
  )
}
