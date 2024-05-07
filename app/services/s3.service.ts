import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectAclCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { s3Client } from '../lib/s3Client'

export async function updateObjectAcls(albumId: string, publicRead: boolean) {
  const command = new PutObjectAclCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: albumId,
    ACL: publicRead ? 'public-read' : 'private',
  })
  return s3Client.send(command)
}

export async function uploadFileToS3(
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

export async function deleteFile(
  albumId: string,
  photoId: string,
  ext: string,
) {
  const key = `${albumId}/${photoId}.${ext}`
  console.log('[DELETING] ' + key)

  const command = new DeleteObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
  })

  await s3Client.send(command)
  return key
}

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
