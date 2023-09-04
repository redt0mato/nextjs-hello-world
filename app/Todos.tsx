"use client"

import Link from "next/link"
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

const queryClient = new QueryClient()

const todos = [
  {
    id: 1,
    title: "Buy Milk",
  },
  {
    id: 2,
    title: "Buy Eggs",
  },
]
async function getTodos() {
  return Promise.resolve(todos)
}

async function postTodo() {}

export default function Todos() {
  // Access the client
  const queryClient = useQueryClient()

  // Queries
  const query = useQuery({ queryKey: ["todos"], queryFn: getTodos })

  // Mutations
  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  })

  return (
    <div>
      <ul>
        {query.data?.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

      <button
        onClick={() => {
          // mutation.mutate({
          //   id: Date.now(),
          //   title: "Do Laundry",
          // })
        }}
      >
        Add Todo
      </button>
    </div>
  )
}
