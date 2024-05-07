import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized: async ({ token }) => !!token,
  },
})
export const config = {
  matcher: ['/albums:path*', '/photos:path*', '/profile'],
}
