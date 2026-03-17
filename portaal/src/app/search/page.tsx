"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const query = searchParams.get("q")

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return
      setLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [query])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Leads Vinden</h1>
        <p className="text-slate-500">Zoek via Google Places naar nieuwe opportuniteiten.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <p className="text-sm text-slate-500 animate-pulse">Data ophalen van Google...</p>
        </div>
      ) : (
        <DataTable columns={columns} data={results} />
      )}
    </div>
  )
}