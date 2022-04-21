import { DefaultAttributes } from '@/types/models/attributes'

export interface BusiConfig extends DefaultAttributes {
  busiId: number
  isEnableSimple: boolean
  isEnableLocation: boolean
  isEnableQrcode: boolean
}

export type BusiConfigUpdateForm = Omit<BusiConfig, 'busiId' | 'createdAt' | 'updatedAt' | 'deletedAt'>
