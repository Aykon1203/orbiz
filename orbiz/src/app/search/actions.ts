"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function saveLeadAction(data: {
  name: string,
  address: string,
  googlePlaceId: string,
  phoneNumber:string,
  website?: string,
  listId: string
}) {
  try {
    await prisma.lead.create({
      data: {
        name: data.name,
        address: data.address,
        googlePlaceId: data.googlePlaceId,
        phoneNumber: data.phoneNumber,
        website: data.website,
        status: "OPEN", // Standaard status
        listId: data.listId, // Koppeling aan de gekozen lijst
      },
    })

    revalidatePath("/lists")
    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: "Failed to save lead." }
  }
}