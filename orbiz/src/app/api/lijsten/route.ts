import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const lijsten = await prisma.lijst.findMany({
      orderBy: { name: 'asc' }
    })
    return NextResponse.json(lijsten)
  } catch (error) {
    return NextResponse.json({ error: "Error fetching lists" }, { status: 500 })
  }
}