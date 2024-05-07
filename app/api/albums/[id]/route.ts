import { PutObjectAclCommand } from '@aws-sdk/client-s3'
import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'
import { s3Client } from '../../../lib/s3Client'
import { NewAlbumInputs } from '../../../types/album.types'

async function updateObjectAcls(albumId: string, publicRead: boolean) {
  const command = new PutObjectAclCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: albumId,
    ACL: publicRead ? 'public-read' : 'private',
  })
  return s3Client.send(command)
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const body = (await req.json()) as NewAlbumInputs

  const data = await prisma.album.update({
    where: { id: params.id },
    data: body,
  })

  const s3Response = await updateObjectAcls(params.id, body.public)
  console.log('[S3 ACL UPDATE]', s3Response)

  return NextResponse.json(data)
}
