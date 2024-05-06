import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../../../lib/authOptions'
import prisma from '../../../lib/prisma'

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  console.log(session)

  if (!session?.user?.id)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const data = await prisma.albumUser.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      album: {
        include: {
          users: true,
        },
      },
    },
  })

  return NextResponse.json(data.map((au) => au.album))
}
