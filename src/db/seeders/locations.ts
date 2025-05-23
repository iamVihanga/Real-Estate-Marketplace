import csv from 'csv-parser'
import fs from 'fs'
import path, { dirname } from 'path'
import { Payload } from 'payload'
import { fileURLToPath } from 'url'

export async function seedLocations(payload: Payload) {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)

  const csvFilePath = path.resolve(__dirname, './zip_codes.csv')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const locations: any[] = []

  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .on('data', (data: any) => {
        locations.push({
          zip: data.code,
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
        console.log(`Found ${locations.length} zip codes`)
        resolve()
      })
      .on('error', (error: Error) => {
        console.log(`Error reading csv file: `, error)
        reject(error)
      })
  })

  for (const location of locations) {
    await payload.create({
      collection: 'locations',
      data: location,
    })
  }

  console.log('Location Zip Codes seeded successfully.')
}
