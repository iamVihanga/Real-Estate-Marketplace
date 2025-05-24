'use client'

import React, { createContext } from 'react'

import { Property as PropertyType } from '@/payload-types'

export const PropertyContext = createContext<PropertyType | null>(null)

interface PropertyProviderProps {
  children: React.ReactNode
  data: PropertyType
}

export const PropertyProvider = ({ data, children }: PropertyProviderProps) => {
  return <PropertyContext.Provider value={data}>{children}</PropertyContext.Provider>
}
