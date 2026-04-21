"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { saveLeadAction } from "@/app/search/actions"

export function AddToListModal({ 
  lead, 
  lijsten, 
  open, 
  onOpenChange 
}: { 
  lead: any, 
  lijsten: any[], 
  open: boolean, 
  onOpenChange: (open: boolean) => void 
}) {
  const [selectedListId, setSelectedListId] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    if (!selectedListId) return
    setLoading(true)
    
    // We sturen de lead info naar de server
    await saveLeadAction({
      name: lead.displayName.text,
      address: lead.formattedAddress,
      googlePlaceId: lead.id,
      phoneNumber: lead.nationalPhoneNumber,
      website: lead.websiteUri,
      listId: selectedListId
    })

    setLoading(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Lead to List</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label>Company</Label>
            <p className="text-sm font-medium p-2 bg-slate-50 rounded border">{lead?.displayName.text}</p>
          </div>
          <div className="space-y-2">
            <Label>Select List</Label>
            <Select onValueChange={setSelectedListId} value={selectedListId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a list..." />
              </SelectTrigger>
              <SelectContent>
                {lijsten.map((l) => (
                  <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={!selectedListId || loading}>
            {loading ? "Saving..." : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}