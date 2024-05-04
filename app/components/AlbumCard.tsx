import { Card, CardFooter } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { FC } from 'react'

type Props = {
  // album: Album
}

export const AlbumCard: FC<Props> = (/* { album } */) => {
  const { theme } = useTheme()

  return (
    <Card
      isFooterBlurred
      radius="lg"
      className="border-none w-full bg-foreground/10"
    >
        <Image
          alt={'album neve'}
          className="object-contain"
          height={500}
          width={500}
          src={'album első képe presigned url'}
        />
      <CardFooter className="before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_4px)] shadow-small ml-0.5 z-10">
        <div
          className="flex-1 text-small text-white text-center sm:text-start"
          style={{ textShadow: '1px 1px 1px #000000, 2px 2px 4px #000000' }}
        >
          Album neve
        </div>
        <div className="hidden sm:flex justify-self-end text-[0.6rem] tracking-tighter uppercase text-white bg-black/30 py-1 px-2 rounded-2xl">
          Képek száma
        </div>
      </CardFooter>
    </Card>
  )
}
