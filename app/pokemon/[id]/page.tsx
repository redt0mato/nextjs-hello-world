"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage({ params }) {
  const [pokemon, setPokemon] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const resp = await fetch(`/api/pokemon/${params.id}`)
      const json = await resp.json()
      console.log(json)
      setPokemon(json)
    }
    getData()
  }, [])

  if (!pokemon) return <div>Loading...</div>

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl"></h1>
      </div>
      <div className="flex flex-col">
        <img
          className="w-20 h-20"
          src={pokemon.sprites && pokemon.sprites.front_default}
        />
        <div>
          Name: <span>{pokemon.name}</span>
        </div>
        <div>
          Abilities
          <ul>
            {pokemon.abilities.map((ability) => (
              <li>{ability.ability.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
