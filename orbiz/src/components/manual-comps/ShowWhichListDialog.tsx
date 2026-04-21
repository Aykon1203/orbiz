

"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle2 } from "lucide-react"

export type ShowListsDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  lead: {
    id: string
    displayName: { text: string }
  }
}

export function ShowWhichListDialog({ open, onOpenChange, lead }: ShowListsDialogProps) {
  const [lists, setLists] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open || !lead?.id) return

    const fetchLists = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/lead-lists?googlePlaceId=${encodeURIComponent(lead.id)}`)
        const data = await res.json()
        setLists(data.lists || [])
      } catch (err) {
        console.error('Error fetching lists:', err)
        setLists([])
      } finally {
        setLoading(false)
      }
    }

    fetchLists()
  }, [open, lead?.id])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Lists for "{lead?.displayName?.text}"</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {loading ? (
              <p className="text-sm text-slate-500">Loading...</p>
          ) : lists.length > 0 ? (
            <div className="space-y-2">
              {lists.map((list) => (
                <div
                  key={list.id}
                  className="flex items-center gap-3 p-3 rounded-md border border-slate-200 bg-slate-50"
                >
                  <CheckCircle2 className="size-5 text-green-600 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium text-slate-900">{list.name}</p>
                    {list.description && (
                      <p className="text-sm text-slate-500 truncate">{list.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">This lead is not in any list.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}