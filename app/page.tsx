import { ChevronDownIcon } from '@heroicons/react/24/outline'
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
        <div className="h-[50vh] flex flex-col justify-end items-center gap-6">
          <p className="text-sm">Browse public albums</p>
          <ChevronDownIcon className="h-6 w-6 animate-bounce" />
        </div>
      </section>
      <section>
        <Container className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16"></Container>
      </section>
    </>
  )
}
