'use client'

import { ArrowPathIcon } from '@heroicons/react/24/outline'
import revalidatePhotosAction from '../../actions/revalidatePhotos'
import ActionButton from '../ActionButton'

type Props = {
  albumId: string
  headers: HeadersInit
}

export default function RefreshButton({ albumId, headers }: Props) {
  const handleRefresh = async () => {
    const response = await fetch(`/api/albums/${albumId}/refresh`, {
      method: 'POST',
      headers,
    })
    revalidatePhotosAction()
  }

  return (
    <ActionButton
      onClick={handleRefresh}
      icon={<ArrowPathIcon className="h-4 w-4" />}
    >
      Refresh ACLs
    </ActionButton>
  )
}
