'use client'

import { Media } from '@/payload-types'
import { useProperty } from '@/features/property/context/hooks'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import Image from 'next/image'

export const PropertyGallery = () => {
  const property = useProperty()

  const images = property?.photos as Media[]

  // Feature image is the first one
  const featureImage = images[0]
  // Grid images are all remaining images (index 1 and beyond)
  const gridImages = images.slice(1, 7)

  return (
    <Dialog>
      <div className="relative">
        {/* Main gallery with CSS Grid that changes based on screen size */}
        <div className="grid grid-cols-12 grid-rows-1 gap-1  max-h-[520px] 2xl:max-h-[680px]">
          {/* Feature image - always visible */}
          {featureImage?.url && (
            <DialogTrigger key={featureImage.url} asChild>
              <Image
                src={featureImage.url}
                alt={featureImage.alt}
                width={featureImage.width!}
                height={featureImage.height!}
                className="w-full col-span-12 h-full tablet:col-span-8 desktop:col-span-6 object-cover cursor-pointer"
              />
            </DialogTrigger>
          )}

          {/* Secondary images - visible based on screen size */}
          <div className="hidden h-full grid-cols-1 tablet:grid tablet:grid-cols-1 desktop:grid-cols-2 large:grid-cols-3 tablet:grid-rows-2 tablet:col-span-4 desktop:col-span-6 gap-1">
            {gridImages.map((image, index) => {
              // Determine visibility based on screen size and image position
              let visibilityClass = ''

              if (index < 2) {
                // First two images visible on tablet and up
                visibilityClass = ''
              } else if (index < 4) {
                // Next two images visible on desktop and up
                visibilityClass = 'hidden desktop:block'
              } else {
                // Last two images visible only on large screens
                visibilityClass = 'hidden large:block'
              }

              if (!image.url) return null

              return (
                <DialogTrigger key={image.id} asChild>
                  <Image
                    src={image.url}
                    alt={image.alt}
                    width={image.width!}
                    height={image.height!}
                    className={`w-full h-full object-cover cursor-pointer photo-${image.id} ${visibilityClass}`}
                  />
                </DialogTrigger>
              )
            })}
          </div>
        </div>
      </div>
      <DialogContent className="h-screen w-full overflow-hidden max-w-full sm:max-w-full bg-transparent border-none shadow-none rounded-none">
        <div className="absolute inset-0 h-full w-full sm:p-6">
          <div className="bg-background sm:rounded-lg h-full w-full overflow-y-scroll p-4">
            <div className="mx-auto max-w-7xl">
              {images.map((image) => {
                return (
                  <Image
                    key={image.url}
                    src={image.url ?? ''}
                    alt={image.alt ?? ''}
                    width={image.width!}
                    height={image.height!}
                    className="w-full h-full object-cover"
                  />
                )
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
