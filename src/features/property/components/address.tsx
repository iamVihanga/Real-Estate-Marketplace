'use client'

import { useProperty } from '@/features/property/context/hooks'

export function PropertyAddress() {
  const property = useProperty()

  return (
    <div>
      <div className="">{property.address?.full_address}</div>
    </div>
  )
}
