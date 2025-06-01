import { CollectionConfig } from 'payload'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'contact',
    defaultColumns: ['contact', 'property', 'message'],
  },
  fields: [
    {
      name: 'contact',
      type: 'relationship',
      relationTo: 'contacts',
      required: true,
      index: true,
    },
    {
      name: 'property',
      type: 'relationship',
      relationTo: 'properties',
      index: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
  ],
}
