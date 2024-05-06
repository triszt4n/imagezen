import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { Link } from '@nextui-org/react'
import { headers } from 'next/headers'
import NextLink from 'next/link'
import ActionButton from '../components/ActionButton'
import Container from '../components/Container'
import { AlbumWithUsers } from '../types/album.types'
import { formatDateEasy } from '../utils/date-utils'

async function getData(): Promise<
  { error: { message: string } } | AlbumWithUsers[]
> {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/albums/user`, {
    method: 'GET',
    headers: headers(),
  })
  const data = await response.json()
  if (!response.ok) {
    return { error: data }
  }
  return data as AlbumWithUsers[]
}

export default async function MyAlbumsPage() {
  const data = await getData()

  return (
    <section className="py-12">
      <Container>
        <h2 className="mb-8 text-3xl font-extrabold leading-none tracking-tight">
          Albums where you are a member
        </h2>
        <hr className="mb-8" />
        {'error' in data ? (
          <div>
            <h3 className="mb-4 text-2xl font-semibold">
              An error occured while fetching your data
            </h3>
            <p>{data.error.message}</p>
          </div>
        ) : (
          <>
            <div className="flex flex-row justify-end">
              <ActionButton
                icon={<PlusCircleIcon className="h-4 w-4" />}
                className="flex-row-reverse"
                href="/albums/new"
              >
                Create a new album
              </ActionButton>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {data.map((album) => (
                <div
                  key={album.id}
                  className="bg-white shadow-lg rounded-lg p-6"
                >
                  <Link
                    as={NextLink}
                    href={`/albums/${album.id}`}
                    className="text-xl font-semibold"
                  >
                    {album.name}
                  </Link>
                  <p className="text-sm text-gray-500">{album.description}</p>
                  <p className="text-sm text-gray-500">
                    {album.users.length} members
                  </p>
                  <p>{album.public ? 'Public' : 'Non-public'}</p>
                  <p>{formatDateEasy(album.createdAt as unknown as string)}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </Container>
    </section>
  )
}
