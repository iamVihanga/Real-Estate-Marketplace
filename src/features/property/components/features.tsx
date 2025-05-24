'use client'
import { Feature } from '@/payload-types'
import { useProperty } from '@/features/property/context/hooks'

export const PropertyFeatures = () => {
  const property = useProperty()
  const groupedFeatures = property.features.reduce(
    (acc, feature) => {
      acc[feature.category] = [...(acc[feature.category] || []), feature]
      return acc
    },
    {} as Record<string, Feature[]>,
  )
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold leading-none mb-4">Features</h2>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(groupedFeatures).map(([category, features]) => (
              <div key={category}>
                <h3 className="text-base font-semibold mb-3 capitalize">{category}</h3>
                <ul className="list-disc list-inside flex flex-col gap-2">
                  {features.map((feature) => (
                    <li key={feature.id}>{feature.name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
