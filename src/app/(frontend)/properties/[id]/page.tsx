import React from 'react'

import { getPropertyById } from '@/actions/property'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ id: string }>
}

export default async function PropertyDetailsPage({ params }: Props) {
  const _params = await params

  const property = await getPropertyById(_params.id)

  if (!property) return notFound()

  return (
    <div className="max-w-screen p-12 flex justify-center bg-accent text-sm">
      <div className="w-full max-w-lg grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">{property.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="flex flex-row gap-1">
              <p>{property.address.street},</p>
              <p>{property.address.city}</p>
              <p>{property.address.state_abbr},</p>
              <p>{property.address.zip}</p>
            </div>

            <div className="flex flex-row gap-3">
              <h3 className="font-bold">Features</h3>

              <ul>
                {property.features?.map((feature) => {
                  if (typeof feature === 'number') return null

                  return (
                    <li key={feature.id}>
                      {feature.name} {` `}
                      <span className="capitalize text-xs text-muted-foreground">
                        ({feature.category})
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </CardContent>
        </Card>

        <pre>{JSON.stringify(property, null, 2)}</pre>
      </div>
    </div>
  )
}
