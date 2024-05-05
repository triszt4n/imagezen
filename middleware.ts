import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      if (token) return true
    },
  },
})
export const config = {
  matcher: ['/albums:path*', '/photos:path*', '/profile'],
}
