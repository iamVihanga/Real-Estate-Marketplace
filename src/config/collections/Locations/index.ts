import type { CollectionConfig } from 'payload'

export const Locations: CollectionConfig = {
  slug: 'locations',
  labels: {
    singular: 'Location',
    plural: 'Locations',
  },
  admin: {
    useAsTitle: 'zip',
  },
  fields: [
    {
      name: 'zip',
      type: 'text',
      label: 'Zip Code',
      unique: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'city',
          type: 'text',
          admin: {
            description: 'The city associated with the zip code',
          },
          label: 'City',
        },
        {
          name: 'state_abbr',
          type: 'text',
          admin: {
            description: 'The two-letter abbreviation for the state',
          },
          label: 'State Abbreviation',
        },
        {
          name: 'state_name',
          type: 'text',
          admin: {
            description: 'The full name of the state',
          },
          label: 'State Name',
        },
        {
          name: 'county',
          type: 'text',
          admin: {
            description: 'County of the zip code',
          },
          label: 'County',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'latitude',
          type: 'number',
          admin: {
            description: 'The latitude of the zip code area',
          },
          label: 'Latitude',
        },
        {
          name: 'longitude',
          type: 'number',
          admin: {
            description: 'The longitude of the zip code area',
          },
          label: 'Longitude',
        },
      ],
    },

    {
      name: 'est_population',
      type: 'number',
      admin: {
        description: 'Estimated population of the zip code area',
      },
      label: 'Estimated Population',
    },
  ],
}
