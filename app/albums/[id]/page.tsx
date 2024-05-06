import { Divider } from '@nextui-org/react'
import { Photo } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { headers } from 'next/headers'
import AlbumUserList from '../../components/AlbumUserList'
import Container from '../../components/Container'
import PhotosGrid from '../../components/PhotosGrid'
import { UploadField } from '../../components/forms/UploadField'
import { authOptions } from '../../lib/authOptions'
import { AlbumWithUsers } from '../../types/album.types'
import { formatDate } from '../../utils/date-utils'

async function getData(
  id: string,
): Promise<
  { error: { message: string } } | (AlbumWithUsers & { photoCount: number })
> {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/albums/${id}`, {
    method: 'GET',
    headers: headers(),
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

async function getPhotos(
  id: string,
): Promise<{ error: { message: string } } | Photo[]> {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/albums/${id}/photos`,
    {
      method: 'GET',
      headers: headers(),
      next: {
        tags: ['photos'],
      },
    },
  )
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
  const session = await getServerSession(authOptions)

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
            <div className="flex-1">
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
              {data.users.some((user) => user.userId === session?.user?.id) && (
                <div className="text-sm text-gray-500">
                  <p className="mb-1">Upload new photos here:</p>
                  <UploadField
                    fieldName="files"
                    multiple
                    maxFiles={10}
                    required
                    uploadPath={`${process.env.NEXTAUTH_URL}/api/albums/${params.id}/upload`}
                    headers={Object.fromEntries(headers().entries())}
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end">
              <AlbumUserList users={data.users} />
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
              photos={photos.map((p) => ({
                ...p,
                src: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/${p.albumId}/${p.id}.${p.filename.split('.').pop()}`,
              }))}
            />
          )}
        </div>
      )}
    </Container>
  )
}
