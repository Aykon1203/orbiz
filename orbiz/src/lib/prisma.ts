import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL is not set')
}

const prismaClientSingleton = () => {
  // 1. Maak een connectie-pool voor Postgres
  const pool = new Pool({
    connectionString,
    connectionTimeoutMillis: 5000,
  })
  
  // 2. Maak de adapter die Prisma 7 nodig heeft
  const adapter = new PrismaPg(pool)
  
  // 3. Start de client met de adapter
  return new PrismaClient({ adapter })
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma