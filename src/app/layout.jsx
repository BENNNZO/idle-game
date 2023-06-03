import './globals.css'
import { Poppins } from 'next/font/google'
import { Lilita_One } from 'next/font/google'

// const poppins = Poppins({ subsets: ['latin'], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] })
const poppins = Lilita_One({ subsets: ['latin'], weight: ["400"] })

export const metadata = {
  title: 'Idle Game',
  description: 'NextJs Idle Game with Reeact Too!!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
