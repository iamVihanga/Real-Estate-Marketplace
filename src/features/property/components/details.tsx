'use client'
import { Share2Icon } from 'lucide-react'

import { HeartPlusIcon } from 'lucide-react'
import { PropertyAddress } from './address'
import { useProperty } from '@/features/property/context/hooks'
import { Button } from '@/components/ui/button'
// import {
//   listingStatusMap,
//   listingStatusOptions,
// } from '@/config/collections/Properties/listing-status-map'
// import { cn } from '@/lib/utils'
import { PropertyStatus } from './status'

export const PropertyDetails = () => {
  const property = useProperty()
  return (
    <div className="bg-white rounded-lg p-6 flex items-start justify-between">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">{property.title}</h1>
          <div className="flex flex-wrap gap-2">
            <PropertyStatus listingStatus={property.listingStatus} />
          </div>
        </div>
        <div>
          <PropertyAddress />
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          <div>
            <h3 className="text-3xl font-bold leading-none">{property.price}</h3>
            <p>
              <span className="font-thin leading-none">Est. $5,072/mo</span>
            </p>
          </div>
          <div>
            <h3 className="text-3xl font-bold leading-none">{property.details?.bedrooms}</h3>
            <p>
              <span className="font-thin leading-none">Beds</span>
            </p>
          </div>
          <div>
            <h3 className="text-3xl font-bold leading-none">{property.details?.bathrooms}</h3>
            <p>
              <span className="font-thin leading-none">Baths</span>
            </p>
          </div>
          <div>
            <h3 className="text-3xl font-bold leading-none">{property.details?.squareFeet}</h3>
            <p>
              <span className="font-thin leading-none">Sqft</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Button variant="ghost" className="p-0 size-10">
            <Share2Icon size={24} className="shrink-0 h-6 w-6" />
          </Button>
          <Button variant="ghost" className="p-0 size-10">
            <HeartPlusIcon size={24} className="shrink-0 h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}
