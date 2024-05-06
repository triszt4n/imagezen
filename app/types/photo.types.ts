import { Photo } from '@prisma/client'

export type NewPhotoInputs = Pick<Photo, 'albumId' | 'ext' | 'filename'>
