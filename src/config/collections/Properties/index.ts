import { Property, Zipcode } from '@/payload-types'
import type { CollectionConfig } from 'payload'

export interface PropertyWithAddress extends Property {
  address: {
    street: string
    city: string
    state_abbr: string
    state_name: string
    zip: string
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
      name: 'zipcode',
      type: 'relationship',
      relationTo: 'zipcodes',
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
    afterRead: [
      async ({ doc }) => {
        const zipcode = doc.zipcode as Zipcode

        const address = {
          street: doc.street!,
          city: zipcode.city!,
          state_abbr: zipcode.state_abbr!,
          state_name: zipcode.state_name!,
          zip: zipcode.code!,
        }

        doc.address = address

        return doc
      },
    ],
  },
}
