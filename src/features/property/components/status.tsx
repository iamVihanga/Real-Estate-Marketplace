import { listingStatusMap } from '@/config/collections/Properties/listing-status-map'
import { cn } from '@/lib/utils'
import { Property } from '@/payload-types'

export const PropertyStatus = ({ listingStatus }: { listingStatus: Property['listingStatus'] }) => {
  return (
    <div
      className={cn(
        'text-sm font-medium uppercase text-white px-3 py-1 rounded-xs',
        listingStatusMap[listingStatus].color,
        listingStatusMap[listingStatus].foreground,
      )}
    >
      {listingStatusMap[listingStatus].label}
    </div>
  )
}
