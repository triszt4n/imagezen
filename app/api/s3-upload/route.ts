import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { NextResponse } from 'next/server'

const s3Client = new S3Client({
  // No credentials are needed because amplify app has role
  region: process.env.S3_REGION,
})

async function uploadFileToS3(file, fileName) {
  const fileBuffer = file
  console.log('uploading: ' + fileName)

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
  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!file) {
      return NextResponse.json({ error: 'File is required.' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const fileName = await uploadFileToS3(buffer, file.name)

    return NextResponse.json({ success: true, fileName })
  } catch (error) {
    return NextResponse.json({ error })
  }
}
