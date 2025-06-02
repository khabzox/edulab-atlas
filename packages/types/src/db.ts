import type { UserRole } from './auth'

export interface DBUser {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  imageUrl: string | null
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export interface DBGuestProfile {
  id: string
  userId: string
  accessExpiry: Date
  allowedPreviews: number
  previewsUsed: number
  lastPreviewAt: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface DBGuestPreviewAccess {
  id: string
  guestId: string
  courseId: string
  accessedAt: Date
  expiresAt: Date
}

export interface DBUserMetadata {
  id: string
  userId: string
  key: string
  value: string
  createdAt: Date
  updatedAt: Date
} 