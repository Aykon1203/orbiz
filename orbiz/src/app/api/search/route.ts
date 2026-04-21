// src/app/api/search/route.ts
import { NextResponse } from 'next/server'
import { Client } from '@googlemaps/google-maps-services-js'
import prisma from '@/lib/prisma'

const googleClient = new Client({})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query) return NextResponse.json({ error: 'No query' }, { status: 400 })

  try {
    const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': process.env.GOOGLE_PLACES_API_KEY!,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.websiteUri,places.nationalPhoneNumber'
      },
      body: JSON.stringify({
        textQuery: query,
        languageCode: 'nl',
      })
    })

    const data = await response.json()
    
    // If Google sends an error, log it in full to the terminal
    if (data.error) {
      console.error('Google Cloud Error Details:', data.error)
      return NextResponse.json({ error: data.error.message }, { status: 500 })
    }

    const places = data.places || []
    
    // Check if each place is already in a list
    const enrichedPlaces = await Promise.all(
      places.map(async (place) => {
        const existingLead = await prisma.lead.findUnique({
          where: { googlePlaceId: place.id }
        })
        return {
          ...place,
          saved: !!existingLead
        }
      })
    )

    return NextResponse.json(enrichedPlaces)
  } catch (error) {
    console.error('Network or Syntax Error:', error)
    return NextResponse.json({ error: 'API route crash' }, { status: 500 })
  }
}