import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const lists = await prisma.list.findMany({
      orderBy: { name: 'asc' }
    })
    return NextResponse.json(lists)
  } catch (error) {
    return NextResponse.json({ error: "Error fetching lists" }, { status: 500 })
  }
}