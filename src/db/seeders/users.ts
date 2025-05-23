import { Payload } from 'payload'

export const seedUsers = async (payload: Payload) => {
  await payload.create({
    collection: 'users',
    data: {
      email: 'vihanga@codeville.uk',
      password: 'vihanga123',
    },
  })
}
