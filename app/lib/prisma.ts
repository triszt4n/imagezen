import { PrismaClient } from '@prisma/client'

function extendPrisma() {
  return new PrismaClient().$extends({
    result: {
      photo: {
        src: {
          needs: { albumId: true, id: true, filename: true },
          compute(photo) {
            return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/${photo.albumId}/${photo.id}.${photo.filename.split('.').pop()}`
          },
        },
      },
    },
  })
}

let prisma: ReturnType<typeof extendPrisma>

if (process.env.NODE_ENV === 'production') {
  prisma = extendPrisma()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient().$extends({
      result: {
        photo: {
          src: {
            needs: { albumId: true, id: true, filename: true },
            compute(photo) {
              return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/${photo.albumId}/${photo.id}.${photo.filename.split('.').pop()}`
            },
          },
        },
      },
    })
  }
  prisma = global.prisma
}

export default prisma
