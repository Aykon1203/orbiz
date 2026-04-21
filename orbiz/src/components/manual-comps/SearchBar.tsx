"use client"

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query) return
    
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
      <Input
        type="search"
        placeholder="Search businesses or categories..."
        className="pl-9 bg-slate-50 border-none focus-visible:ring-1 focus-visible:ring-blue-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  )
}