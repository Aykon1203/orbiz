// src/app/api/lead-lists/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const googlePlaceId = searchParams.get('googlePlaceId')

  if (!googlePlaceId) {
    return NextResponse.json({ error: 'No googlePlaceId provided' }, { status: 400 })
  }

  try {
    const lead = await prisma.lead.findUnique({
      where: { googlePlaceId },
      include: { list: true }
    })

    if (!lead) {
      return NextResponse.json({ lists: [] })
    }

    // Lead heeft maar één lijst (omdat listId slechts één keer kan voorkomen)
    const lists = lead.list ? [lead.list] : []

    return NextResponse.json({ lists, lead })
  } catch (error) {
    console.error('Error fetching lead lists:', error)
    return NextResponse.json({ error: 'Failed to fetch lead lists' }, { status: 500 })
  }
}
