import { Payload } from 'payload'
import { Feature } from '@/payload-types'

type FeatureCategory = Feature['category']

// Interior features commonly found in homes
const interiorFeatures = [
  { name: 'Hardwood Floors' },
  { name: 'Granite Countertops' },
  { name: 'Stainless Steel Appliances' },
  { name: 'Walk-in Closet' },
  { name: 'Fireplace' },
  { name: 'Open Floor Plan' },
  { name: 'High Ceilings' },
  { name: 'Ceiling Fan' },
  { name: 'Recessed Lighting' },
  { name: 'Updated Kitchen' },
  { name: 'Central Air' },
  { name: 'Smart Home Features' },
  { name: 'Office/Study' },
  { name: 'Primary Suite' },
  { name: 'Laundry Room' },
]

// Exterior features commonly found on properties
const exteriorFeatures = [
  { name: 'Swimming Pool' },
  { name: 'Deck/Patio' },
  { name: 'Fenced Yard' },
  { name: 'Garage' },
  { name: 'Landscaped Yard' },
  { name: 'Large Lot' },
  { name: 'Outdoor Kitchen' },
  { name: 'Fire Pit' },
  { name: 'Waterfront' },
  { name: 'Mountain View' },
  { name: 'New Roof' },
  { name: 'Solar Panels' },
  { name: 'Sprinkler System' },
  { name: 'Covered Porch' },
  { name: 'RV/Boat Parking' },
]

// Community features related to property location
const communityFeatures = [
  { name: 'HOA Community' },
  { name: 'Gated Community' },
  { name: 'Community Pool' },
  { name: 'Playground' },
  { name: 'Tennis Courts' },
  { name: 'Golf Course' },
  { name: 'Walking Trails' },
  { name: 'Dog Park' },
  { name: 'Clubhouse' },
  { name: 'Fitness Center' },
]

// Other miscellaneous features
const otherFeatures = [
  { name: 'Recently Renovated' },
  { name: 'Energy Efficient' },
  { name: 'Historic' },
  { name: 'ADA Accessible' },
  { name: 'Generator' },
]

// Combine all features into a single array
const allFeatures = [
  ...interiorFeatures.map((feature) => ({ ...feature, category: 'interior' as FeatureCategory })),
  ...exteriorFeatures.map((feature) => ({ ...feature, category: 'exterior' as FeatureCategory })),
  ...communityFeatures.map((feature) => ({ ...feature, category: 'community' as FeatureCategory })),
  ...otherFeatures.map((feature) => ({ ...feature, category: 'other' as FeatureCategory })),
]

export const seedFeatures = async (payload: Payload) => {
  try {
    console.log('Clearing features collection...')

    await payload.delete({
      collection: 'features',
      where: {},
    })

    console.log('Features collection cleared.')

    console.log('Seeding features...')

    const createPromises = allFeatures.map((feature) =>
      payload.create({
        collection: 'features',
        data: feature,
      }),
    )

    // Wait for all creations to complete
    if (createPromises.length > 0) {
      await Promise.all(createPromises)
      console.log(`Created ${createPromises.length} new features`)
    } else {
      console.log('No new features to create')
    }
  } catch (error) {
    console.error('Error seeding features:', error)
  }
}
