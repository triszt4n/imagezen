import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../../../lib/authOptions'
import { getSignedFileUrl } from '../../../lib/getSignedUrl'
import prisma from '../../../lib/prisma'

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  console.log('SESSION', session)

  if (!session?.user?.id)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  try {
    const data = await prisma.albumUser.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        album: {
          include: {
            users: {
              include: {
                user: true,
              },
            },
            photos: {
              take: 1,
              orderBy: {
                createdAt: 'asc',
              },
            },
            _count: {
              select: { photos: true },
            },
          },
        },
      },
    })

    if (!data) return NextResponse.json([])

    const mappedData = await Promise.all(
      data.map(async (au) => {
        if (!au.album.public) {
          const firstPhoto = au.album.photos[0]
          const signedUrl = await getSignedFileUrl(
            `${firstPhoto.albumId}/${firstPhoto.id}.${firstPhoto.filename.split('.').pop()}`,
            process.env.S3_BUCKET_NAME,
          )
          au.album.photos[0].src = signedUrl
        }
        return au.album
      }),
    )

    return NextResponse.json(mappedData)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Error fetching data' },
      { status: 500 },
    )
  }
}
