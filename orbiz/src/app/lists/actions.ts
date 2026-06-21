"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// dit zijn de serveractions die dingen naar de database sturen
export async function createList(formData:FormData){
    const name = formData.get("name") as string
    const description = formData.get("description") as string

    if (!name) return { error: "Name is required" }

  try {
    await prisma.list.create({
      data: {
        name,
        description,
      },
    })

    // Dit zorgt ervoor dat de lijstpagina direct ververst wordt
    revalidatePath("/lists")
    return { success: true }
  } catch (error) {
    return { error: "Something went wrong while creating the list." }
  }

    
}

export async function deleteList(id: string){

  try {
    await prisma.list.delete({
      where:{
        id,
      }
    })

    // Dit zorgt ervoor dat de lijstpagina direct ververst wordt
    revalidatePath("/lists")
    return { success: true }
  } catch (error) {
    return { error: "Something went wrong while deleting the list." }
  }

    
}
