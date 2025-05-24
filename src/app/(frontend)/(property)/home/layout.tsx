import { Footer } from '@/app/_layouts/footer'
import { Header } from '@/app/_layouts/header'

export default function PropertyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="bg-white">
        <Header />
      </div>
      <main>{children}</main>
      <Footer />
    </div>
  )
}
