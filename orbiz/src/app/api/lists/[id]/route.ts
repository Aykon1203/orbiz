import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params

  try {
    const list = await prisma.list.findUnique({
      where: { id },
      include: {
        leads: {
          orderBy: { createdAt: "desc" },
        },
      },
    })

    if (!list) {
      return NextResponse.json({ error: "List not found" }, { status: 404 })
    }

    return NextResponse.json({ list, leads: list.leads })
  } catch (error) {
    console.error("Error fetching list leads:", error)
    return NextResponse.json({ error: "Error fetching list leads" }, { status: 500 })
  }
}
