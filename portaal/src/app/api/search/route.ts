// src/app/api/search/route.ts
import { NextResponse } from 'next/server'
import { Client } from '@googlemaps/google-maps-services-js'

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
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress'
      },
      body: JSON.stringify({
        textQuery: query,
        languageCode: 'nl',
      })
    })

    const data = await response.json()
    
    // Als Google een error stuurt, loggen we die nu volledig in de terminal
    if (data.error) {
      console.error('Google Cloud Error Details:', data.error)
      return NextResponse.json({ error: data.error.message }, { status: 500 })
    }

    return NextResponse.json(data.places || [])
  } catch (error) {
    console.error('Network or Syntax Error:', error)
    return NextResponse.json({ error: 'Crash in de API route' }, { status: 500 })
  }
  
}
// In src/app/api/search/route.ts