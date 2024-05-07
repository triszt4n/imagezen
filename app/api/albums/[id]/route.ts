import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'
import { updateObjectAcls } from '../../../services/s3.service'
import { NewAlbumInputs } from '../../../types/album.types'

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
