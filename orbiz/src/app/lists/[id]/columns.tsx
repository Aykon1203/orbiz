"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Globe, Trash2 } from "lucide-react"
import { Status } from "@prisma/client"



export type ListLeads = {
  id: string
  googlePlaceId: string
  name: string
  address?: string
  website?: string
  phoneNumber?: string
  status: Status
}


// Created as a function so we can receive the 'onAdd' handler from the page
export const getColumns = (
  onDelete: (leadId: string) => void,
): ColumnDef<ListLeads>[] => [
  
  {
    accessorKey: "name",
    header: "Company Name",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => {
      const phone = row.original.phoneNumber
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
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => row.original.address || <span className="text-slate-400">Not available</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const place = row.original
      return (
        <div className="text-right flex justify-end gap-2">
          {place.website && (
            <Button variant={"ghost"} size="sm" asChild>
                <a href={place.website} target="_blank" rel="noreferrer"><Globe className="size-4" /></a>
            </Button>)}
          <Button
            variant={"ghost"}
            size="sm"
            onClick={() => onDelete(place.id)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      )
    },
  },
]