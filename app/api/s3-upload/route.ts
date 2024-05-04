import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { NextResponse } from 'next/server'

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
  region: process.env.S3_REGION,
})

async function uploadFileToS3(file, fileName) {
  const fileBuffer = file
  console.log('[UPLOAD] ' + fileName)

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `${fileName}`,
    Body: fileBuffer,
  }

  const command = new PutObjectCommand(params)
  await s3Client.send(command)
  return fileName
}

export async function POST(request) {
  if (
    ![
      'S3_BUCKET_NAME',
      'S3_REGION',
      'S3_ACCESS_KEY_ID',
      'S3_SECRET_ACCESS_KEY',
    ].every((key) => process.env.hasOwnProperty(key))
  ) {
    throw new Error('Environment variable is missing.')
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!file) {
      return NextResponse.json({ error: 'File is required.' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const fileName = await uploadFileToS3(buffer, file.name)

    return NextResponse.json({ success: true, fileName }, { status: 200 })
  } catch (error) {
    console.error('[UPLOAD FAILED] ', error)
    return NextResponse.json(
      { error },
      { status: error['$metadata']?.httpStatusCode || 500 },
    )
  }
}
