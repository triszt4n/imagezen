'use client'

import { ExclamationTriangleIcon, TrashIcon } from '@heroicons/react/24/outline'
import {
  Avatar,
  Button,
  Card,
  CardFooter,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Snippet,
  Spinner,
} from '@nextui-org/react'
import { Photo, User } from '@prisma/client'
import Image from 'next/image'
import { FC, useState } from 'react'
import action from '../actions/revalidatePhotos'
import { formatDate } from '../utils/date-utils'

type Props = {
  photo: Photo & { author: User }
  src: string
  onClick?: () => void
  onError?: (error: string) => void
}

function shortenStringWithEllipsis(str, maxLength) {
  if (str.length <= maxLength) {
    return str // No need to shorten
  }

  var halfLength = Math.floor((maxLength - 3) / 2) // Calculate half of the remaining length after removing ellipsis
  var firstHalf = str.slice(0, halfLength) // Take the first half of the string
  var secondHalf = str.slice(-halfLength) // Take the last half of the string
  return firstHalf + '...' + secondHalf // Concatenate with ellipsis in between
}

export const PhotoCard: FC<Props> = ({ photo, src, onClick, onError }) => {
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'loading' | 'error' | 'success'
  >('idle')
  const [isOpen, setIsOpen] = useState(false)

  const onCopy = () => {
    navigator.clipboard.writeText(src)
  }
  const onDelete = async () => {
    setIsOpen(false)
    setSubmitStatus('loading')

    try {
      const response = await fetch(`/api/photos/${photo.id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete photo')
      }
      setSubmitStatus('idle')
      await action()
    } catch (error) {
      onError(error.message)
      setSubmitStatus('error')
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 3000)
    }
  }

  return (
    <>
      <Card
        isFooterBlurred
        radius="lg"
        className="border-none w-full max-h-72 bg-foreground/10 justify-center"
      >
        <Image
          alt={photo.filename}
          className="object-contain cursor-pointer"
          height={450}
          width={800}
          src={src}
          onClick={onClick}
        />
        <CardFooter className="before:bg-white/10 border-white/20 border-1 overflow-hidden p-1 absolute before:rounded-xl rounded-large bottom-0.5 w-[calc(100%_-_2px)] ml-[1px] shadow-small z-10 gap-0.5">
          <Snippet
            classNames={{ base: 'flex-1', pre: 'brake-all text-[0.65rem]' }}
            size="sm"
            onCopy={onCopy}
            symbol=""
            tooltipProps={{
              content: 'Copy URL to clipboard',
            }}
          >
            {shortenStringWithEllipsis(photo.filename, 30)}
          </Snippet>
          <div>
            <Popover
              placement="top"
              showArrow
              offset={10}
              isOpen={isOpen}
              onOpenChange={(open) => setIsOpen(open)}
            >
              <PopoverTrigger>
                <Button isIconOnly size="sm" color="danger">
                  {submitStatus === 'loading' ? (
                    <Spinner size="sm" />
                  ) : submitStatus === 'error' ? (
                    <ExclamationTriangleIcon className="h-4 w-4" />
                  ) : (
                    <TrashIcon className="h-4 w-4" />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="px-1 py-2 w-full">
                  <p className="text-small font-bold text-foreground">
                    Delete this photo?
                  </p>
                  <div className="mt-2 flex flex-col gap-2 w-full">
                    <Button size="sm" color="danger" onClick={onDelete}>
                      Confirm
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </CardFooter>
        <CardFooter className="before:bg-white/10 border-white/20 border-1 overflow-hidden p-1 absolute before:rounded-xl rounded-large top-0.5 w-[calc(100%_-_2px)] ml-[1px] shadow-small z-10 gap-0.5">
          <div className="flex flex-1 gap-2 items-center">
            <div
              className="flex-1 text-white text-xs text-end"
              style={{
                textShadow:
                  'rgb(0, 0, 0) 1px 1px 1px, rgb(0, 0, 0) 2px 2px 4px',
              }}
            >
              <p>
                uploaded by <b>{photo.author?.name}</b>
              </p>
              <p>on {formatDate(photo.createdAt as unknown as string)}</p>
            </div>
            <Avatar
              alt={photo.author?.name}
              className="flex-shrink-0"
              size="sm"
              src={photo.author?.image}
              imgProps={{ referrerPolicy: 'no-referrer' }}
            />
          </div>
        </CardFooter>
      </Card>
    </>
  )
}
