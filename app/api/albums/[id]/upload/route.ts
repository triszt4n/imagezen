import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../../../../lib/authOptions'
import prisma from '../../../../lib/prisma'
import { uploadFileToS3 } from '../../../../services/s3.service'

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions)
  const formData = await request.formData()

  console.log('[UPLOADING FILES] ', formData.getAll('filepond'))

  if (!session?.user?.id)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const files = formData
    .getAll('filepond')
    .filter((entry) => entry instanceof File) as File[]

  if (!files) {
    return NextResponse.json({ error: 'Files is required.' }, { status: 400 })
  }

  try {
    const photos = await Promise.all(
      files.map(async (file) => {
        const photo = await prisma.photo.create({
          data: {
            filename: file.name,
            mimeType: file.type,
            albumId: params.id,
            authorId: session.user.id,
          },
          include: {
            album: true,
          },
        })

        const buffer = Buffer.from(await file.arrayBuffer())
        const fileName = await uploadFileToS3(
          buffer,
          `${params.id}/${photo.id}.${file.name.split('.').pop()}`,
          photo.album!.public,
        )
        console.log('[UPLOAD SUCCESS] ' + fileName)
        return photo
      }),
    )

    return NextResponse.json(photos, { status: 200 })
  } catch (error) {
    console.error('[UPLOAD FAILED] ', error)
    return NextResponse.json(
      { error },
      { status: (error as any)['$metadata']?.httpStatusCode || 500 },
    )
  }
}
