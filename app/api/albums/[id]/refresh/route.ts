import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'
import { updateObjectAcls } from '../../../../services/s3.service'

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  const data = await prisma.album.findUnique({
    where: { id: params.id },
  })

  if (!data) {
    return NextResponse.json({ message: 'Album not found' }, { status: 404 })
  }

  const s3Response = await updateObjectAcls(params.id, data.public)
  console.log('[S3 ACL UPDATE]', s3Response)

  return NextResponse.json(s3Response)
}
