import { useContext } from 'react'

import { PropertyContext } from './provider'
import { Property } from '../models'

export const useProperty = () => {
  const data = useContext(PropertyContext)

  if (!data) throw new Error('useProperty must be used within a Property Provider')

  const property = new Property(data)

  return property
}
