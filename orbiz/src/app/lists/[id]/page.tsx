"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getColumns, ListLeads } from "./columns"
import { DataTable } from "@/components/ui/data-table"

export default function ListLeadsPage() {
  const params = useParams<{ id: string }>()
  const listId = params?.id

  const [results, setResults] = useState<ListLeads[]>([])
  const [listName, setListName] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!listId) return

    const fetchListLeads = async () => {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch(`/api/lists/${listId}`)
        if (!res.ok) {
          throw new Error("Could not fetch.")
        }

        const data = await res.json()
        setResults(data.leads ?? [])
        setListName(data.list?.name ?? "")
      } catch (err) {
        console.error(err)
        setError("Something went wrong during fetch.")
      } finally {
        setLoading(false)
      }
    }

    fetchListLeads()
  }, [listId])

  const handleDeleteLead = async (leadId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this lead?")
    if (!confirmed) return

    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        throw new Error("Delete failed")
      }

      setResults((prev) => prev.filter((lead) => lead.id !== leadId))
    } catch (err) {
      console.error(err)
      setError("Deleting lead failed.")
    }
  }

  const handleStatusChange = (leadId: string, status: ListLeads["status"]) => {
    setResults((prev) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, status } : lead))
    )
  }



  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-2xl font-bold">Leads In List</h1>

        <p className="text-slate-500">{listName || "Overview of all leads in this list"}</p>

      </div>



      {loading ? (

        <div className="flex justify-center py-10">

          <p className="text-sm text-slate-500 animate-pulse">Fetching leads...</p>

        </div>

      ) : error ? (

        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>

      ) : (

        <DataTable 

          columns={getColumns(handleDeleteLead, handleStatusChange)} 

          data={results} 

        />

      )}
    </div>

  )

}
