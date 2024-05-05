import { Inter } from 'next/font/google'
import Footer from './components/Footer'
import NavbarSitewide from './components/NavbarSitewide'
import './global.css'
import Providers from './providers'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
})

export const metadata = {
  title: 'Image:zen',
  description: 'Image uploading service.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Providers>
          <div className="d-flex flex-col min-h-screen">
            <NavbarSitewide />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
