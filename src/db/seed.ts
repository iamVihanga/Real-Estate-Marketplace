import { drizzle } from 'drizzle-orm/node-postgres'
import { reset } from 'drizzle-seed'

import { getPayload } from 'payload'
import { seedLocations } from './seeders/locations'
import config from '@/payload.config'
import { seedFeatures } from './seeders/features'
import { seedUsers } from './seeders/users'
import { seedProperties } from './seeders/properties'

async function seed() {
  const payload = await getPayload({ config })
  const db = drizzle(process.env.DATABASE_URI)

  console.log(`\n[Resetting database...]`)
  await reset(db, payload.db.schema)

  console.log(`\n[Seeding users...]\n`)
  await seedUsers(payload)

  console.log(`\n[Seeding locations...]\n`)
  await seedLocations(payload)

  console.log(`\n[Seeding features...]\n`)
  await seedFeatures(payload)

  console.log(`\n[Seeding properties...]\n`)
  await seedProperties(payload)
}

seed()
  .then(() => {
    console.log('Database seeded successfully.')
    process.exit(0)
  })
  .catch((err) => {
    console.error('Error seeding database:', err)
    process.exit(1)
  })
