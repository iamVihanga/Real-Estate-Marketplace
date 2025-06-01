import { CollectionConfig } from 'payload'

export const Contacts: CollectionConfig = {
  slug: 'contacts',
  labels: {
    singular: 'Contact',
    plural: 'Contacts',
  },
  admin: {
    defaultColumns: ['name', 'email', 'phone', 'status', 'totalMessages', 'lastContact'],
    useAsTitle: 'name',
    listSearchableFields: ['name', 'email', 'phone'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'text',
      unique: true,
      required: true,
    },
    {
      name: 'assignedTo',
      type: 'relationship',
      relationTo: 'agents',
      label: 'Assigned Agent',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
