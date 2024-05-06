import { NextResponse } from 'next/server'
import { getSignedFileUrl } from '../../../../lib/getSignedUrl'
import prisma from '../../../../lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const data = await prisma.photo.findMany({
    where: {
      albumId: params.id,
    },
    include: {
      author: true,
      album: true,
    },
  })

  const mappedData = await Promise.all(
    data.map(async (photo) => {
      if (!photo.album.public) {
        const signedUrl = await getSignedFileUrl(
          `${photo.albumId}/${photo.id}.${photo.filename.split('.').pop()}`,
          process.env.S3_BUCKET_NAME,
        )
        photo.src = signedUrl
      }
      return photo
    }),
  )
  return NextResponse.json(mappedData)
}
