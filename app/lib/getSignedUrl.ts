import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { s3Client } from './s3Client'

export async function getSignedFileUrl(
  key: string,
  bucket: string,
  expiresIn: number = 3600,
) {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  })

  return await getSignedUrl(s3Client, command, { expiresIn })
}
