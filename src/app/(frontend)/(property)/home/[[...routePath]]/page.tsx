import { notFound } from 'next/navigation'

import { getPropertyById } from '@/features/property/actions'
import { PropertyProvider } from '@/features/property/context/provider'
import { PropertyAddress } from '@/features/property/components/address'
import { PropertyGallery } from '@/features/property/components/gallery'
import { PropertyDetails } from '@/features/property/components/details'
import { PropertyOverview } from '@/features/property/components/overview'
import { PropertyFeatures } from '@/features/property/components/features'
import { PropertyMap } from '@/features/property/components/map'
import { PropertyInquiry } from '@/features/property/components/property-inquiry'

interface PropertyDetailsPageProps {
  params: Promise<{
    routePath: string[]
  }>
}

export default async function PropertyDetailsPage({ params }: PropertyDetailsPageProps) {
  const { routePath } = await params
  const propertyID = routePath[routePath.length - 1]

  const data = await getPropertyById(propertyID)

  if (!data) return notFound()

  return (
    <PropertyProvider data={data}>
      <div className="w-full flex flex-col bg-zinc-100">
        <PropertyGallery />
        <div className="max-w-7xl p-4 w-full mx-auto grid grid-cols-12 gap-4">
          <div className="col-span-12 desktop:col-span-8 grid gap-4">
            <PropertyDetails />
            <PropertyOverview />
            <PropertyFeatures />
            <PropertyMap />
          </div>

          <div className="col-span-12 desktop:col-span-4">
            <div className="sticky top-4">
              <PropertyInquiry />
            </div>
          </div>
        </div>
      </div>
    </PropertyProvider>
  )
}
