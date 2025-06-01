'use server'

import { Contact } from '@/payload-types'
import { actionClient } from '@/lib/safe-action'
import { getPayloadClient } from '@/db/client'

import { propertyInquirySchema } from './schema'

export const propertyInquiryAction = actionClient
  .schema(propertyInquirySchema)
  .action(async (args) => {
    try {
      const { parsedInput } = args
      const payload = await getPayloadClient()

      // Destructure the parsed input
      const { name, agentId, email, message, propertyId, phone } = parsedInput

      let contactRecord: Contact

      // Find contact by email
      const existingContact = await payload.find({
        collection: 'contacts',
        where: { email: { equals: email } },
      })

      // If contact doesn't exists, create a new contact
      if (existingContact.totalDocs < 1) {
        const newContact = await payload.create({
          collection: 'contacts',
          data: {
            email,
            name,
            phone: phone!,
            assignedTo: agentId,
          },
        })

        contactRecord = newContact
      } else contactRecord = existingContact.docs[0]

      // Create a new inquiry
      const newInquiry = await payload.create({
        collection: 'inquiries',
        data: {
          message,
          contact: contactRecord.id,
          property: propertyId,
        },
      })

      return {
        success: 'Message sent successfully !',
        data: { contact: contactRecord, inquiry: newInquiry },
      }
    } catch (error) {
      console.log('[Property Inquiry Action] Error: ', error)
      throw error
    }
  })
