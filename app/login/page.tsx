import GoogleButton from '../components/GoogleButton'

export default function LoginPage() {
  return (
    <section className="flex flex-col items-center h-[90vh] sm:h-[96vh] justify-center gap-6 px-6 sm:px-0 pb-8">
      <h1 className="mb-6 text-3xl font-extrabold leading-none tracking-tight">
        Log into your account
      </h1>
      <div className="flex flex-row gap-4 mt-6">
        <GoogleButton />
      </div>
    </section>
  )
}
