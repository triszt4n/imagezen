import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { Checkbox, Input } from '@nextui-org/react'
import Link from 'next/link'

export default function Form() {
  return (
    <>
      <Input
        autoFocus
        endContent={
          <EnvelopeIcon className="h-4 w-4 text-default-400 pointer-events-none flex-shrink-0" />
        }
        label="Email"
        placeholder="Enter your email"
        variant="bordered"
      />
      <Input
        endContent={
          <LockClosedIcon className="h-4 w-4 text-default-400 pointer-events-none flex-shrink-0" />
        }
        label="Password"
        placeholder="Enter your password"
        type="password"
        variant="bordered"
      />
      <div className="flex py-2 px-1 justify-between">
        <Checkbox
          classNames={{
            label: 'text-small',
          }}
        >
          Remember me
        </Checkbox>
        <Link color="primary" href="#">
          Forgot password?
        </Link>
      </div>
    </>
  )
}
