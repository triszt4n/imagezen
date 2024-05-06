import { Album } from '@prisma/client'
import Container from '../../../components/Container'
import NewAlbumForm from '../../../components/forms/NewAlbumForm'

export default async function EditAlbumPage({
  params,
}: {
  params: { id: string }
}) {
  const data = await fetch(`/api/albums/${params.id}`)
  const album = (await data.json()) as Album

  return (
    <Container className="py-12">
      <NewAlbumForm title="Edit album" defaultValues={album} />
    </Container>
  )
}
