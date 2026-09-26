import Image from 'next/image'
import { CallingCard } from '@/components/calling-card'
import { ThemeToggle } from '@/components/theme-toggle'

export default function Page() {
  return (
    <main className="relative isolate flex min-h-dvh items-center justify-center overflow-hidden bg-background px-4 py-16">
      <Image
        src="/images/japanese-landscape.png"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover opacity-40 dark:hidden"
      />
      <Image
        src="/images/japanese-landscape-night.png"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="-z-20 hidden object-cover opacity-50 dark:block"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-background/40" />
      <ThemeToggle />
      <CallingCard />
    </main>
  )
}
