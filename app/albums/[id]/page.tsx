import { Divider } from '@nextui-org/react'
import { Photo, Role, User } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { headers } from 'next/headers'
import Container from '../../components/Container'
import AlbumUserList from '../../components/album-components/AlbumUserList'
import NewMemberForm from '../../components/forms/NewMemberForm'
import { UploadField } from '../../components/forms/UploadField'
import PhotosGrid from '../../components/photo-components/PhotosGrid'
import { authOptions } from '../../lib/authOptions'
import { AlbumWithUsers } from '../../types/album.types'
import { formatDate } from '../../utils/date-utils'

async function getData(
  id: string,
): Promise<
  { error: { message: string } } | (AlbumWithUsers & { photoCount: number })
> {
  const response = await fetch(`/api/albums/${id}`, {
    method: 'GET',
    headers: headers(),
    next: {
      tags: ['members'],
    },
  })
  const data = await response.json()
  if (!response.ok) {
    return { error: data }
  }
  return {
    ...data,
    photoCount: data._count.photos,
  }
}

async function getUsers(): Promise<{ error: { message: string } } | User[]> {
  const response = await fetch(`/api/users`, {
    method: 'GET',
    headers: headers(),
  })
  const data = await response.json()
  if (!response.ok) {
    return { error: data }
  }
  return data
}

async function getPhotos(
  id: string,
): Promise<
  { error: { message: string } } | Array<Photo & { author: User; src: string }>
> {
  const response = await fetch(`/api/albums/${id}/photos`, {
    method: 'GET',
    headers: headers(),
    next: {
      tags: ['photos'],
    },
  })
  const data = await response.json()
  if (!response.ok) {
    return { error: data }
  }
  return data
}

export default async function AlbumPage({
  params,
}: {
  params: { id: string }
}) {
  const data = await getData(params.id)
  const photos = await getPhotos(params.id)
  const users = await getUsers()
  const session = await getServerSession(authOptions)
  const amIMember = (data: AlbumWithUsers & { photoCount: number }) =>
    data.users.some((user) => user.userId === session?.user?.id)
  const amIAdmin = (data: AlbumWithUsers & { photoCount: number }) =>
    data.users.some(
      (user) => user.userId === session?.user?.id && user.role === Role.ADMIN,
    )

  return (
    <Container className="py-12">
      {'error' in data ? (
        <div>
          <h3 className="mb-4 text-2xl font-semibold">
            An error occured while fetching your data
          </h3>
          <p>{data.error.message}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-16">
          <div className="flex flex-col md:flex-row gap-8 justify-between">
            <div className="w-full">
              <h2 className="py-4 text-3xl font-extrabold leading-none tracking-tight">
                Album: {data.name}
              </h2>
              <p className="text-sm text-gray-500 mb-4">{data.description}</p>
              <p className="text-sm text-gray-500 text-end">
                Created at: {formatDate(data.createdAt as unknown as string)}
              </p>
              <p className="text-sm text-gray-500 text-end">
                #photos: {data.photoCount || 'no photos yet'}
              </p>
              <Divider className="my-2" />
              {amIMember(data) && (
                <div className="text-sm text-gray-500">
                  <p className="mb-1">Upload new photos here:</p>
                  <UploadField
                    multiple
                    maxFiles={10}
                    required
                    uploadPath={`${process.env.NEXTAUTH_URL}/api/albums/${params.id}/upload`}
                    headers={Object.fromEntries(headers().entries())}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col min-w-96 gap-4">
              <AlbumUserList users={data.users} />
              {'error' in users ? (
                <div className="text-xs">
                  Error getting users. {users.error.message}
                </div>
              ) : (
                amIAdmin(data) && (
                  <NewMemberForm
                    users={users.filter(
                      (user) =>
                        !data.users.map((u) => u.userId).includes(user.id),
                    )}
                    albumId={params.id}
                  />
                )
              )}
            </div>
          </div>
          {'error' in photos ? (
            <div>
              <h3 className="mb-4 text-2xl font-semibold">
                An error occured while fetching your photos
              </h3>
              <p>{photos.error.message}</p>
            </div>
          ) : (
            <PhotosGrid
              photos={photos}
              isPublicAlbum={data.public}
              showDelete={amIAdmin(data)}
            />
          )}
        </div>
      )}
    </Container>
  )
}
