'use client'

import React, { useId } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { faker } from '@faker-js/faker'
import { useAction } from 'next-safe-action/hooks'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useProperty } from '@/features/property/context/hooks'

import { propertyInquirySchema, PropertyInquirySchema } from './schema'
import { propertyInquiryAction } from './actions'
import { toast } from 'sonner'

export function PropertyInquiryForm() {
  const property = useProperty()
  const toastId = useId()
  const { executeAsync, isExecuting } = useAction(propertyInquiryAction)

  const getDefaultValues = (addFaker: boolean = false) => {
    const defaultMessage = `Hello,\n\nI am interested in the property "${property.address!.full_address}".\n\nPlease let me know how I can proceed with the inquiry.\n\nThank you!`
    const agent = property.agent

    return {
      name: addFaker ? faker.person.fullName() : '',
      email: addFaker ? (faker.internet.username() + '@example.com').toLocaleLowerCase() : '',
      message: addFaker ? defaultMessage : '',
      phone: addFaker ? faker.phone.number() : '',
      propertyId: property.id,
      agentId: agent.id,
    }
  }

  const form = useForm<PropertyInquirySchema>({
    resolver: zodResolver(propertyInquirySchema),
    defaultValues: getDefaultValues(),
  })

  async function onSubmit(values: PropertyInquirySchema) {
    toast.loading('Sending message to agent...', { id: toastId })

    const result = await executeAsync(values)

    if (result?.serverError) {
      toast.error('Failed to send message. Please try again.', { id: toastId })
      return
    }

    if (result?.data) {
      toast.success('Message sent successfully!', { id: toastId })
      form.reset(getDefaultValues())
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input disabled={isExecuting} placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled={isExecuting}
                  placeholder="john.doe@example.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input disabled={isExecuting} placeholder="(123) 456-7890" {...field} />
              </FormControl>
              <FormDescription>
                {`We will only use this number to contact you regarding your inquiry.`}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isExecuting}
                  placeholder="I need to know more about this property."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isExecuting} type="submit" loading={isExecuting}>
          Send Message
        </Button>

        <Button
          type="button"
          variant={'link'}
          size={'sm'}
          onClick={() => {
            form.reset(getDefaultValues(true))
          }}
        >
          generate test data
        </Button>
      </form>
    </Form>
  )
}
