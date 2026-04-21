"use server";
import prisma from "@/lib/prisma";

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