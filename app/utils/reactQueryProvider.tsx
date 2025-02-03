"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

// Create a client
export const queryClient = new QueryClient()

export function QueryProvider({children}:{children:ReactNode}) {
  return (
    // Wrap your app with the provider
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}