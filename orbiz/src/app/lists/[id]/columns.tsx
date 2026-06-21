"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Globe, Trash2 } from "lucide-react"
import { Status } from "@prisma/client"
import { updateLeadStatus } from "@/app/actions/leadActions"; // <-- Zorg dat dit pad klopt naar je actions
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



export type ListLeads = {
  id: string
  googlePlaceId: string
  name: string
  address?: string
  website?: string
  phoneNumber?: string
  status: Status
}

// Functie om een mooie kleur/emoji te geven aan de status in de dropdown
const getStatusLabel = (status: Status) => {
  switch (status) {
    case "OPEN": return "OPEN"
    case "CONTACTED": return "CONTACTED"
    case "CUSTOMER": return "CUSTOMER"
    case "REJECTED": return "REJECTED"
    default: return status
  }
}



// Created as a function so we can receive the 'onAdd' handler from the page
export const getColumns = (
  onDelete: (leadId: string) => void,
  onStatusChange: (leadId: string, status: Status) => void,
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
     cell: ({ row }) => {
      const lead = row.original

      const handleStatusChange = async (nieuweStatus: Status) => {
        const previousStatus = lead.status
        onStatusChange(lead.id, nieuweStatus)

        const result = await updateLeadStatus(lead.id, nieuweStatus)
        if (!result.success) {
          onStatusChange(lead.id, previousStatus)
          alert(result.error || "Er ging iets mis bij het updaten.")
        }
      }

      return (
        <Select value={lead.status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-35 h-8 text-xs font-medium">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="OPEN">{getStatusLabel("OPEN")}</SelectItem>
            <SelectItem value="CONTACTED">{getStatusLabel("CONTACTED")}</SelectItem>
            <SelectItem value="CUSTOMER">{getStatusLabel("CUSTOMER")}</SelectItem>
            <SelectItem value="REJECTED">{getStatusLabel("REJECTED")}</SelectItem>
          </SelectContent>
        </Select>
      )
    },

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