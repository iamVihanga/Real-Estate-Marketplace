'use server'

import { getPayloadClient } from '@/db/client'
import { Property } from '@/payload-types'

export async function getPropertyById(id: string): Promise<Property | null> {
  const payload = await getPayloadClient()

  try {
    const property = await payload.findByID({
      collection: 'properties',
      id,
    })

    return property
  } catch (err) {
    const error = err as Error

    // throw new Error(`Error getting property: ${error.message}`)
    return null
  }
}
