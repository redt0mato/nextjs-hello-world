import Link from "next/link"
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

import Todos from "./Todos"
import Providers from "./providers"

export default function IndexPage() {
  return (
    <Providers>
      <Todos />
    </Providers>
  )
}
