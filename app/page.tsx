import Image from 'next/image'
import { CallingCard } from '@/components/calling-card'

export default function Page() {
  return (
    <main className="relative isolate flex min-h-dvh items-center justify-center overflow-hidden bg-background px-4 py-12">
      <Image
        src="/images/japanese-landscape.png"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover opacity-40"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-background/40" />
      <CallingCard />
    </main>
  )
}
