"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { DataTable } from "@/components/ui/data-table"
import { getColumns, SearchResult } from "./columns" // Importeer de nieuwe functie
import { AddToListModal } from "../../components/manual-comps/AddToListDialog" // Pas pad aan indien nodig
import { ShowWhichListDialog } from "../../components/manual-comps/ShowWhichListDialog"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [results, setResults] = useState([])
  const [lists, setLists] = useState([]) // Staat voor je mappen/lists
  const [loading, setLoading] = useState(false)
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedLead, setSelectedLead] = useState<SearchResult | null>(null)
  
  // ShowWhichListDialog states
  const [isShowListsDialogOpen, setIsShowListsDialogOpen] = useState(false)
  const [selectedLeadForShowLists, setSelectedLeadForShowLists] = useState<SearchResult | null>(null)

  const query = searchParams.get("q")

  // 1. Fetch search results
  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return
      setLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data)
      } catch (err) { console.error(err) } 
      finally { setLoading(false) }
    }
    fetchResults()
  }, [query])

  // 2. Fetch existing lists (to display in the modal)
  useEffect(() => {
    fetch("/api/lists") // Simple GET route that calls prisma.list.findMany()
      .then(res => res.json())
      .then(data => setLists(data))
  }, [])

  const handleOpenModal = (lead: SearchResult) => {
    setSelectedLead(lead)
    setIsModalOpen(true)
  }

  const handleShowLists = (lead: SearchResult) => {
    setSelectedLeadForShowLists(lead)
    setIsShowListsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Find Leads</h1>
        <p className="text-slate-500">Search Google Places for new opportunities.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <p className="text-sm text-slate-500 animate-pulse">Fetching data from Google...</p>
        </div>
      ) : (
        <DataTable 
          columns={getColumns(handleOpenModal, handleShowLists)} 
          data={results} 
        />
      )}

      {/* Modal for adding lead to list */}
      {selectedLead && (
        <AddToListModal 
          lead={selectedLead}
          lists={lists}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      )}

      {/* Dialog for showing which lists the lead is in */}
      {selectedLeadForShowLists && (
        <ShowWhichListDialog
          lead={selectedLeadForShowLists}
          open={isShowListsDialogOpen}
          onOpenChange={setIsShowListsDialogOpen}
        />
      )}
    </div>
  )
}