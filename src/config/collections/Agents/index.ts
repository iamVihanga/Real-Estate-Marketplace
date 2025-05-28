import type { CollectionConfig } from 'payload'

export const Agents: CollectionConfig = {
  slug: 'agents',
  admin: {
    useAsTitle: 'firstName',
    defaultColumns: ['profilePhoto', 'fullName', 'contactEmail', 'phone'],
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'fullName',
      type: 'text',
      virtual: true,
      admin: {
        hidden: true,
      },
      hooks: {
        afterRead: [
          ({ data }) => {
            if (!data) return null

            return `${data.firstName} ${data.lastName}`
          },
        ],
      },
    },
    {
      name: 'initials',
      type: 'text',
      virtual: true,
      admin: {
        hidden: true,
      },
      hooks: {
        afterRead: [
          ({ data }) => {
            if (!data) return null

            return `${data.firstName.charAt(0)}${data.lastName.charAt(0)}`
          },
        ],
      },
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'e.g., "Realtor", "Senior Agent", "Broker"',
      },
    },
    {
      name: 'profilePhoto',
      type: 'upload',
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'contactEmail',
      type: 'email',
    },
  ],
}
