import { DefaultAttributes } from '@/types/models/attributes'
import { BusiAllowedLocation } from '@/types/models/businesses/allowedLocation'

export interface Business extends DefaultAttributes {
  name: string
  smallLogo?: string
  logo?: string
  homepage?: string
}

export interface BusinessInfo extends Business {
  allowedLocations: BusiAllowedLocation[]
}

export interface BusinessAdminListInfo extends Business {
  userCount: number
  allowedLocations: BusiAllowedLocation[]
}

export type BusinessUpdateForm = Omit<Business, 'createdAt' | 'updatedAt' | 'deletedAt'> & {
  logoFile?: File
  smallLogoFile?: File
}

export type BusinessUploadForm = Pick<Business, 'id'> & {
  logoFile?: File
  smallLogoFile?: File
}
