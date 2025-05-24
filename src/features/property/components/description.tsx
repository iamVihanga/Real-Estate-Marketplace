'use client'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { useProperty } from '../context/hooks'

export const PropertyDescription = () => {
  const property = useProperty()
  return <RichText data={property.description} />
}
