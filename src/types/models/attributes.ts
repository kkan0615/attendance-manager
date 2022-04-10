export interface DefaultAttributes {
  id: number
  createdAt: string | Date
  updatedAt: string | Date
  deletedAt?: string | Date
}

export interface DefaultSelectListQuery {
  limit?: number
  page?: number
}
