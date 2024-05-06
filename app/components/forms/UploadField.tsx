'use client'

import 'filepond/dist/filepond.min.css'
import { useState } from 'react'
import { FilePond } from 'react-filepond'
import action from '../../actions/revalidatePhotos'

type Props = {
  fieldName: string
  fieldTitle?: string
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
  fieldName,
  fieldTitle,
  helper = 'Drag & Drop your files or <span class="filepond--label-action">Browse</span>',
  accept = 'image/*',
  multiple = false,
  maxFiles = 1,
  required = false,
  uploadPath,
  headers,
}: Props) => {
  // const { register, setValue } = useFormContext()
  const [files, setFiles] = useState([])

  return (
    <FilePond
      files={files}
      server={{
        url: uploadPath,
        headers: headers,
      }}
      instantUpload={false}
      acceptedFileTypes={[accept]}
      required={required}
      onupdatefiles={(files) => {
        // setValue(fieldName, files)
        setFiles(files)
        action()
      }}
      allowMultiple={multiple}
      maxFiles={maxFiles}
      maxTotalFileSize={`${process.env.MAX_TOTAL_FILE_SIZE_IN_MB ?? 10}MB`}
      labelIdle={helper}
      allowImagePreview
      // {...register(fieldName, {
      //   required: 'Required field',
      //   validate: (value: FileList | undefined) =>
      //     !value || (required && value.length < 1)
      //       ? 'At least one file is required for upload!'
      //       : true,
      // })}
    />
  )
}
