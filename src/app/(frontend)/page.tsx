import { Button } from '@/components/ui/button'

export default async function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <h1 className="text-3xl font-bold">Hello</h1>
        <Button>Get Started</Button>
      </div>
    </div>
  )
}
