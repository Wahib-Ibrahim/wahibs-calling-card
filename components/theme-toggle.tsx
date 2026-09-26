'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="fixed top-4 right-4 z-10 inline-flex size-10 items-center justify-center rounded-full border border-border bg-card/80 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Sun className="size-5 dark:hidden" aria-hidden="true" />
      <Moon className="hidden size-5 dark:block" aria-hidden="true" />
      <span className="sr-only">Switch between light and dark mode</span>
    </button>
  )
}
