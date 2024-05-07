'use client'

import 'filepond/dist/filepond.min.css'
import { useState } from 'react'
import { FilePond } from 'react-filepond'
import revalidatePhotosAction from '../../actions/revalidatePhotos'

type Props = {
  uploadPath: string
  headers?: { [key: string]: string }
  uploadButtonText?: string
  helper?: string
  accept?: string
  multiple?: boolean
  maxFiles?: number
  required?: boolean
}

export const UploadField = ({
  helper = 'Drag & Drop your files or <span class="filepond--label-action">Browse</span>',
  accept = 'image/*',
  multiple = false,
  maxFiles = 1,
  required = false,
  uploadPath,
  headers,
}: Props) => {
  const [files, setFiles] = useState([])

  return (
    <FilePond
      files={files}
      server={{
        process: {
          url: uploadPath,
          headers: headers,
          onload: (response) => {
            revalidatePhotosAction()
            return response[0].id
          },
        },
      }}
      instantUpload={false}
      acceptedFileTypes={[accept]}
      required={required}
      // @ts-ignore
      onupdatefiles={setFiles}
      allowMultiple={multiple}
      maxFiles={maxFiles}
      maxTotalFileSize={`${process.env.MAX_TOTAL_FILE_SIZE_IN_MB ?? 10}MB`}
      labelIdle={helper}
      allowImagePreview
    />
  )
}
