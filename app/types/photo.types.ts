import { Photo } from '@prisma/client'

export type PhotoWithSrc = Photo & { src: string }
