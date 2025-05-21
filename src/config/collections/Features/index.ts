import { CollectionConfig } from 'payload'

export const Features: CollectionConfig = {
  slug: 'features',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      label: 'Feature Name',
      admin: {
        description: 'Name of the feature (e.g. "Hardwood Floors", "Swimming Pool)',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Interior', value: 'interior' },
        { label: 'Exterior', value: 'exterior' },
        { label: 'Community', value: 'community' },
        { label: 'Appliances', value: 'appliances' },
        { label: 'Utilities', value: 'utilities' },
        { label: 'Other', value: 'other' },
      ],
    },
  ],
}
