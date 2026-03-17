"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Plus, Globe } from "lucide-react"

export type SearchResult = {
  id: string
  displayName: { text: string }
  formattedAddress: string
  websiteUri?: string
}

export const columns: ColumnDef<SearchResult>[] = [
  {
    accessorKey: "displayName.text",
    header: "Bedrijfsnaam",
  },
  {
    accessorKey: "formattedAddress",
    header: "Adres",
  },
  {
    id: "actions",
    header: () => <div className="text-right">Acties</div>,
    cell: ({ row }) => {
      const place = row.original
      return (
        <div className="text-right flex justify-end gap-2">
          {place.websiteUri && (
            <Button variant="ghost" size="sm" asChild>
                <a href={place.websiteUri} target="_blank"><Globe className="size-4" /></a>
            </Button>
          )}
          <Button size="sm" className="h-8" onClick={() => console.log("Save", place.id)}>
            <Plus className="mr-2 h-4 w-4" /> Lead
          </Button>
        </div>
      )
    },
  },
]