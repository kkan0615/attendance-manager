import { DefaultAttributes } from '@/types/models/attributes'

export interface BusiAllowedLocation extends DefaultAttributes {
  busiId: number
  lat: number
  lon: number
  meter: number
}
