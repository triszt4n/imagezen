import { NextResponse } from 'next/server'
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
    },
  })

  return NextResponse.json(data)
}
