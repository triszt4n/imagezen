import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../lib/prisma'

export async function GET(req: NextRequest) {
  const data = await prisma.user.findMany()
  return NextResponse.json(data)
}