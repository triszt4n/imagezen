import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { Pagination } from '@nextui-org/react'
import { Album } from '@prisma/client'
import { headers } from 'next/headers'
import ActionButton from './components/ActionButton'
import Container from './components/Container'
import LogoFullAnimated from './components/LogoFullAnimated'
import SearchBarForm from './components/SearchBarForm'

async function getData(): Promise<{ error: { message: string } } | Album[]> {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/albums`, {
    method: 'GET',
    headers: headers(),
  })
  const data = await response.json()
  if (!response.ok) {
    return { error: data }
  }
  return data as Album[]
}

export default async function Home() {
  const data = await getData()

  return (
    <>
      <section className="flex flex-col items-center h-[85vh] sm:h-[90vh] justify-center gap-6 px-6 sm:px-0 pb-8">
        <h1 className="my-6 text-3xl font-extrabold leading-none tracking-tight">
          Welcome to
        </h1>
        <LogoFullAnimated className="h-20 w-full" />
        <div className="h-[50vh] flex flex-col justify-end items-center gap-6">
          <p className="text-sm">Browse public albums</p>
          <ChevronDownIcon className="h-6 w-6 animate-bounce" />
        </div>
      </section>
      <section>
        {'error' in data ? (
          <div>
            <h3 className="mb-4 text-2xl font-semibold">
              An error occured while fetching your data
            </h3>
            <p>{data.error.message}</p>
          </div>
        ) : (
          <Container>
            <div className="flex flex-col md:flex-row gap-8 mb-12 justify-between">
              <SearchBarForm />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
              {data.map((album) => (
                <div
                  key={album.id}
                  className="bg-white shadow-lg rounded-lg p-6"
                >
                  <h3 className="text-xl font-semibold">{album.name}</h3>
                  <p className="text-sm text-gray-500">{album.description}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center mt-12">
              <div></div>
              <Pagination
                classNames={{ base: 'justify-self-center' }}
                isCompact
                showControls
                total={10}
                initialPage={1}
              />
              <div className="justify-self-end">
                <ActionButton href="/albums">
                  Create your own album
                </ActionButton>
              </div>
            </div>
          </Container>
        )}
      </section>
    </>
  )
}
