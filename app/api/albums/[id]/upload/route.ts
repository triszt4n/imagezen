import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../../../../lib/authOptions'
import prisma from '../../../../lib/prisma'
import { s3Client } from '../../../../lib/s3Client'

async function uploadFileToS3(
  fileBuffer: Buffer,
  key: string,
  publicRead: boolean,
) {
  console.log('[UPLOADING TO S3] ' + key)

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Body: fileBuffer,
    ACL: publicRead ? 'public-read' : 'private',
  })

  await s3Client.send(command)
  return key
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const formData = await request.formData()
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
          photo.album.public,
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
      { status: error['$metadata']?.httpStatusCode || 500 },
    )
  }
}
