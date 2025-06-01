'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MailIcon, PhoneCallIcon } from 'lucide-react'
import { useProperty } from '../context/hooks'
import { Media } from '@/payload-types'
import { PropertyInquiryForm } from '@/forms/property-inquiry-form/form'

export const PropertyInquiry = () => {
  const property = useProperty()

  const agent = property.agent
  const profilePhoto = property.agent.profilePhoto as Media

  return (
    <div className="bg-white rounded-lg p-6 flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <Avatar className="size-12">
          <AvatarImage src={profilePhoto.url!} alt={profilePhoto.alt} />
          <AvatarFallback>{agent.initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-4">
          <div>
            <h4 className="text-lg font-semibold">{agent.fullName}</h4>
            <p className="text-sm text-muted-foreground">{agent.title}</p>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <PhoneCallIcon size={16} />
              <a href="tel:+1234567890">{agent.phone}</a>
            </div>
            <div className="flex items-center gap-2">
              <MailIcon size={16} />
              <a href={`mailto:${agent.contactEmail}`}>{agent.contactEmail}</a>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Form */}
      <PropertyInquiryForm />
    </div>
  )
}
