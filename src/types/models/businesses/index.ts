import { DefaultAttributes } from '@/types/models/attributes'
import { BusiAllowedLocation } from '@/types/models/businesses/allowedLocation'

export interface Business extends DefaultAttributes {
  name: string
}

export interface BusinessInfo extends Business {
  allowedLocations: BusiAllowedLocation[]
}
