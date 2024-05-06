'use client'

import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { Spinner } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Form, FormProvider, useForm } from 'react-hook-form'
import ActionButton from '../ActionButton'
import ErrorModal from './ErrorModal'

type Props = {
  title: string
  albumId: string
}

type FormValues = {
  files: File[]
}

export default function NewPhotoForm({ title, albumId }: Props) {
  const methods = useForm<FormValues>()
  const { register, control } = methods
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'loading' | 'error' | 'success'
  >('idle')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  return (
    <div className="md:max-w-[500px] mx-auto">
      <div className="mb-4">
        <ActionButton
          icon={<ArrowLeftIcon className="h-3 w-3" />}
          type="button"
          className="flex-row-reverse text-sm"
          onClick={() => {
            router.back()
          }}
        >
          Back
        </ActionButton>
        <h2 className="flex-1 text-3xl font-extrabold leading-none tracking-tight text-center">
          {title}
        </h2>
      </div>
      <FormProvider {...methods}>
        <Form
          action="/api/photos"
          // encType="application/json"
          control={control}
          onSubmit={() => {
            setSubmitStatus('loading')
          }}
          onSuccess={() => {
            setSubmitStatus('success')
            setTimeout(() => {
              setSubmitStatus('idle')
              router.push(`/albums/${albumId}`)
            }, 5000)
          }}
          onError={async ({ response, error }) => {
            setSubmitStatus('error')
            const data = await response.json()
            setError(
              data.message ?? 'An error occured while processing your request.',
            )
            setTimeout(() => {
              setSubmitStatus('idle')
            }, 1000)
          }}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-row gap-4 justify-end">
            <ActionButton
              icon={
                submitStatus === 'loading' ? (
                  <Spinner />
                ) : (
                  <CheckCircleIcon className="h-4 w-4" />
                )
              }
              type="submit"
              disabled={submitStatus === 'loading'}
            >
              Create
            </ActionButton>
          </div>
        </Form>
      </FormProvider>
      <ErrorModal shouldOpen={submitStatus === 'error'} message={error} />
    </div>
  )
}
