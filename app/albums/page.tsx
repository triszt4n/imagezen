import { PlusCircleIcon } from '@heroicons/react/24/outline'
import ActionButton from '../components/ActionButton'
import Container from '../components/Container'

export default async function MyAlbumsPage() {
  return (
    <section className="py-12">
      <Container>
        <h2 className="mb-8 text-3xl font-extrabold leading-none tracking-tight">
          Albums where you are a member
        </h2>
        <hr className="mb-8" />
        <div className="flex flex-row justify-end">
          <ActionButton
            icon={<PlusCircleIcon className="h-4 w-4" />}
            className="flex-row-reverse"
          >
            Create a new album
          </ActionButton>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Replace this with a list of albums */}
        </div>
      </Container>
    </section>
  )
}
