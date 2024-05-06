'use client'

import { Photo } from '@prisma/client'
import { FC, useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { PhotoCard } from './PhotoCard'
import ErrorModal from './forms/ErrorModal'

type Props = {
  photos: Array<Photo & { src: string }>
}

const PhotosGrid: FC<Props> = ({ photos }) => {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const [error, setError] = useState<string | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {photos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            src={photo.src}
            onClick={() => {
              setOpen(true)
              setIndex(photos.indexOf(photo))
            }}
            onError={(error) => setError(error)}
          />
        ))}
      </div>
      <Lightbox
        open={open}
        index={index}
        close={() => setOpen(false)}
        slides={photos.map((photo) => ({ src: photo.src }))}
      />
      <ErrorModal
        shouldOpen={!!error}
        message={error}
        onClose={() => setError(null)}
      />
    </>
  )
}

export default PhotosGrid
