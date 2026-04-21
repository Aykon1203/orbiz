"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Plus, Globe, Save, ListCheck } from "lucide-react"

export type SearchResult = {
  id: string
  displayName: { text: string }
  formattedAddress: string
  websiteUri?: string
  nationalPhoneNumber?: string
  saved?: boolean
}


// Created as a function so we can receive the 'onAdd' handler from the page
export const getColumns = (
  onAdd: (lead: SearchResult) => void,
  onShowLists?: (lead: SearchResult) => void
): ColumnDef<SearchResult>[] => [
  
  {
    accessorKey: "displayName.text",
    header: "Company Name",
  },
  {
    accessorKey: "nationalPhoneNumber",
    header: "Phone Number",
    cell: ({ row }) => {
      const phone = row.original.nationalPhoneNumber
      return phone ? (
        <a 
          href={`tel:${phone}`} 
          className="text-blue-600 hover:text-blue-800 hover:underline font-medium flex items-center gap-1"
        >
          {phone}
        </a>
      ) : (
        <span className="text-slate-400">Not available</span>
      )
    },
  },
  {
    accessorKey: "formattedAddress",
    header: "Address",
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const place = row.original
      return (
        
        <div className="text-right flex justify-end gap-2">
          {place.saved && (
            <Button variant={"ghost"} size="sm" onClick={() => onShowLists?.(place)}>
                <ListCheck className="size-4" />
            </Button>
          )}
          {place.websiteUri && (
            <Button variant={"ghost"} size="sm" asChild>
                <a href={place.websiteUri} target="_blank"><Globe className="size-4" /></a>
            </Button>
          )}
          <Button size="sm" className="h-8" onClick={() => onAdd(place)}>
            <Plus className="mr-2 h-4 w-4" /> Lead
          </Button>
        </div>
      )
    },
  },
]