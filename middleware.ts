import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized: async ({ token }) => !!token,
  },
  pages: {
    signIn: '/login',
  },
})
export const config = {
  matcher: ['/albums:path*', '/photos:path*', '/profile'],
}
