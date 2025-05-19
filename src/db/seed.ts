import { getPayload } from 'payload'
import { seedZipCodes } from './seeders/zipcodes'
import config from '@/payload.config'

async function seed() {
  console.log('Seeding Database...')

  const payload = await getPayload({ config })

  await seedZipCodes(payload)
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
