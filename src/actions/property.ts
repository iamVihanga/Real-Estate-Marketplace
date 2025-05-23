'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export async function getPropertyById(id: string) {
  const payload = await getPayload({ config })

  try {
    const property = await payload.findByID({
      collection: 'properties',
      id,
    })

    return property
  } catch (err) {
    const error = err as Error

    throw new Error(`Error getting property: ${error.message}`)
  }
}
