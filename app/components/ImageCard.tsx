import { Chip, User } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'

interface Props {
  // photo: Photo
  // author: User
}

const ImageCard: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & Props
> = ({ /* photo, author, */ ...props }) => {
  const { theme } = useTheme()

  return (
    <article {...props} className={'w-full '.concat(props.className ?? '')}>
      <header>
        <Link href={`/post/`} className="h-48 xl:h-64">
          <Image
            alt={`Image`}
            className="z-0 w-full h-full object-cover rounded-lg"
            src={"image url"}
            height={300}
            width={500}
          />
        </Link>
        <div className="text-tiny text-foreground-500 text-end flex flex-row justify-between mt-2">
          {/* <div>{formatDate(post._createdAt)}</div> */}
        </div>
        <h4 className="text-3xl font-extrabold tracking-tight mb-2 mt-6">
          <Link href={`/post/`}>Kép neve?</Link>
        </h4>
      </header>
      <footer className="flex justify-between items-center flex-wrap gap-y-2">
        <User
          name={'author name'}
          description={'idk'}
          avatarProps={{
            src: 'author avatar url',
            size: 'sm',
            showFallback: true,
            fallback: 'initials of author name',
          }}
        />
        <Chip size="sm">Valami ide</Chip>
      </footer>
    </article>
  )
}
