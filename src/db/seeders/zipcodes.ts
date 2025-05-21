import csv from 'csv-parser'
import fs from 'fs'
import path, { dirname } from 'path'
import { Payload } from 'payload'
import { fileURLToPath } from 'url'

export async function seedZipCodes(payload: Payload) {
  // Clear the collection before seeding
  console.log('Clearing zip codes collection...')

  await payload.delete({
    collection: 'zipcodes',
    where: {},
  })

  console.log('Zip codes collection cleared.')
  console.log('Seeding zip codes...')

  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)

  const csvFilePath = path.resolve(__dirname, './zip_codes.csv')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const zipCodes: any[] = []

  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .on('data', (data: any) => {
        zipCodes.push({
          code: data.code,
          city: data.city,
          state_abbr: data.state_abbr,
          state_name: data.state_name,
          county: data.county,
          latitude: Number(data.latitude),
          longitude: Number(data.longitude),
          est_population: Number(data.est_population),
        })
      })
      .on('end', () => {
        console.log(`Found ${zipCodes.length} zip codes`)
        resolve()
      })
      .on('error', (error: Error) => {
        console.log(`Error reading csv file: `, error)
        reject(error)
      })
  })

  for (const zipCode of zipCodes) {
    await payload.create({
      collection: 'zipcodes',
      data: zipCode,
    })
  }

  console.log('Zip codes seeded successfully.')
}
