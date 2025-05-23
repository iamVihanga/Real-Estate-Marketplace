'use server'

import { getPayloadClient } from '@/db/client'

export async function getPropertyById(id: string) {
  const payload = await getPayloadClient()

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
