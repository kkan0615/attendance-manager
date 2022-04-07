import { DefaultAttributes } from '@/types/models/attributes'
import { BusiAllowedLocation } from '@/types/models/businesses/allowedLocation'

export interface Business extends DefaultAttributes {
  name: string
  smallLogo?: string
  logo?: string
  homepage?: string
  maxWorkHour: number // default is 40 hours
  description?: string
  isAllowNickname: boolean
}

export interface BusinessInfo extends Business {
  allowedLocations: BusiAllowedLocation[]
}

export interface BusinessAdminListInfo extends Business {
  userCount: number
  allowedLocations: BusiAllowedLocation[]
}
export type BusinessSimpleListInfo = Pick<Business, 'id' | 'smallLogo' | 'logo' | 'name' | 'description'>

export type BusinessUpdateForm = Omit<Business, 'createdAt' | 'updatedAt' | 'deletedAt'> & {
  logoFile?: File
  smallLogoFile?: File
}

export type BusinessUploadForm = Pick<Business, 'id'> & {
  logoFile?: File
  smallLogoFile?: File
}
