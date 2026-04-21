"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import  {
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogFooter,
    DialogHeader, 
    DialogTitle, 
    DialogTrigger}  
from "../ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
import { createList } from "@/app/lists/actions"

export function NewListDiaglog(){
    const [open, setOpen]=useState(false)
    const [loading, setLoading]=useState(false)
    
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event?.preventDefault()
        setLoading(true);

        const formData=new FormData(event.currentTarget)
        const result=await createList(formData)

        if (result.success) {
        setOpen(false) 
        } else {
        alert(result.error)
        }
        setLoading(false)
    }

    return(
        <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-[#062e7e] hover:bg-[#194294] text-white font-medium">
          <Plus size={18} /> New List
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New List</DialogTitle>
            <DialogDescription>
              Create a new list to organize your leads.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">List Name</Label>
              <Input id="name" name="name" placeholder="e.g., Bakeries in Ghent" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea 
                id="description" 
                name="description" 
                placeholder="What type of leads?" 
              />
            </div>
            
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
              {loading ? "Creating..." : "Save List"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
    )

}