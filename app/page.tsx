import {
  ArrowLeftEndOnRectangleIcon,
  MagnifyingGlassCircleIcon,
} from '@heroicons/react/24/outline'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import ActionButton from './components/ActionButton'
import Container from './components/Container'
import LogoFullAnimated from './components/LogoFullAnimated'

export default function Home() {
  return (
    <>
      <section className="flex flex-col items-center h-[90vh] sm:h-[96vh] justify-center gap-6 px-6 sm:px-0 pb-8">
        <h1 className="mb-6 text-3xl font-extrabold leading-none tracking-tight">
          Welcome to
        </h1>
        <LogoFullAnimated className="h-20 w-full" />
        <div className="flex flex-row gap-4 mt-6">
          <Button
            color="primary"
            as={Link}
            href="/feed"
            startContent={<MagnifyingGlassCircleIcon className="h-4 w-4" />}
          >
            Browse albums
          </Button>
          <Button
            as={Link}
            href="/login"
            variant="bordered"
            startContent={<ArrowLeftEndOnRectangleIcon className="h-4 w-4" />}
          >
            Log in to upload
          </Button>
        </div>
      </section>
      <section className="bg-gradient-to-r from-foreground-50 to-foreground-200 border-gray-300 border-y-1 py-24">
        <Container id="about-us-in-short" className="relative">
          <div className="max-w-3xl sm:h-96">
            <h2 className="mb-8 text-3xl font-extrabold leading-none tracking-tight">
              Misszió
            </h2>
            <p>Leírás.</p>
            <ActionButton href="/about/history" className="mt-8">
              Akciógomb.
            </ActionButton>
          </div>
          <div className="absolute right-0 bottom-0 h-0 sm:h-48 lg:h-72 xl:h-96 pr-10"></div>
        </Container>
      </section>
      <section className="py-24">
        <Container>
          <h2 className="mb-8 text-3xl font-extrabold leading-none tracking-tight">
            Új szekció.
          </h2>
          <hr className="mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold">Cím</h3>
              <p>Leírás.</p>
              <ActionButton href="/about/history" className="mt-8">
                Akciógomb.
              </ActionButton>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold">Cím</h3>
              <p>Leírás.</p>
              <ActionButton href="/about/history" className="mt-8">
                Akciógomb.
              </ActionButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
