"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getLeadCounts() {
  const [open, contacted, customer] = await Promise.all([
    prisma.lead.count({ where: { status: "OPEN" } }),
    prisma.lead.count({ where: { status: "CONTACTED" } }),
    prisma.lead.count({ where: { status: "CUSTOMER" } }),
  ]);

  return [
    { name: "Open", value: open },
    { name: "Contacted", value: contacted },
    { name: "Customer", value: customer },
  ];
}

export async function updateLeadStatus(id: string, status: "OPEN" | "CONTACTED" | "REJECTED" | "CUSTOMER") {
  try {
    await prisma.lead.update({
      where: { id },
      data: { status },
    });
    
    revalidatePath("/lists/[id]"); 
    return { success: true };
  } catch (error) {
    console.error("Fout bij updaten status:", error);
    return { success: false, error: "Kon status niet updaten" };
  }
}
