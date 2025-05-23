import type { CollectionAfterReadHook, CollectionConfig } from 'payload'
import type { JSONSchema4 } from 'json-schema'
import { Property } from '@/payload-types'

const formatAddress: CollectionAfterReadHook<Property> = async ({ doc }) => {
  if (typeof doc.location === 'number') return { doc }

  return {
    ...doc,
    address: {
      street: doc.street,
      city: doc.location.city,
      state_abbr: doc.location.state_abbr,
      county: doc.location.county,
      zip: doc.location.zip,
    },
  }
}

export const Properties: CollectionConfig = {
  slug: 'properties',
  admin: {
    useAsTitle: 'title',
    preview: ({ id }) => `${process.env.NEXT_PUBLIC_APP_URL}/properties/${id}`,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'street',
      type: 'text',
      required: true,
      label: 'Street Address',
    },
    {
      name: 'location',
      type: 'relationship',
      relationTo: 'locations',
      hasMany: false,
      required: true,
      admin: {
        description: 'Select a ZIP code for this property',
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'listingStatus',
      type: 'select',
      required: true,
      options: [
        { label: 'For Sale', value: 'for_sale' },
        { label: 'Offer Pending', value: 'pending' },
        { label: 'Under Construction', value: 'under_construction' },
        { label: 'Sold', value: 'sold' },
        { label: 'Not for Sale', value: 'not_for_sale' },
      ],
    },
    {
      name: 'address',
      type: 'text',
      admin: {
        hidden: true,
      },
      required: false,
      typescriptSchema: [
        () => {
          const address: JSONSchema4 = {
            type: 'object',
            properties: {
              street: { type: 'string' },
              city: { type: 'string' },
              state_abbr: { type: 'string' },
              county: { type: 'string' },
              zip: { type: 'string' },
            },
            required: ['street', 'city', 'state_abbr', 'county', 'zip'],
          }

          return address
        },
      ],
    },
    {
      name: 'features',
      type: 'relationship',
      relationTo: 'features',
      hasMany: true,
      admin: {
        description: 'Select features for this property',
      },
    },
  ],
  hooks: {
    afterRead: [formatAddress],
  },
}
