import { Album, AlbumUser, User } from '@prisma/client'

export type NewAlbumInputs = Pick<Album, 'name' | 'public' | 'description'>

export type AlbumWithUsers = Album & {
  users: Array<AlbumUser & { user?: User }>
}
