import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'
import { s3Client } from '../../../lib/s3Client'

async function deleteFile(albumId: string, photoId: string, ext: string) {
  const key = `${albumId}/${photoId}.${ext}`
  console.log('[DELETING] ' + key)

  const command = new DeleteObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
  })

  await s3Client.send(command)
  return key
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const photo = await prisma.photo.delete({
    where: {
      id: params.id,
    },
  })

  const s3Response = await deleteFile(
    photo.albumId!,
    photo.id,
    photo.filename.split('.').pop() ?? '',
  )

  return NextResponse.json({ photo, s3Response })
}
