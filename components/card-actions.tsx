'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Copy, Mail, Share2, UserPlus } from 'lucide-react'

type CardActionsProps = {
  name: string
  firstName: string
  lastName: string
  title: string
  organization: string
  email: string
  githubUrl: string
}

function GitHubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  )
}

const secondaryButton =
  'inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card'

export function CardActions({ name, firstName, lastName, title, organization, email, githubUrl }: CardActionsProps) {
  const [status, setStatus] = useState<'idle' | 'email' | 'link'>('idle')
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }, [])

  function flash(next: 'email' | 'link') {
    setStatus(next)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setStatus('idle'), 2000)
  }

  async function copyEmail() {
    await navigator.clipboard.writeText(email)
    flash('email')
  }

  function saveContact() {
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `N:${lastName};${firstName};;;`,
      `FN:${name}`,
      `TITLE:${title}`,
      `ORG:${organization}`,
      `EMAIL;TYPE=INTERNET:${email}`,
      `URL:${githubUrl}`,
      'END:VCARD',
    ].join('\r\n')

    const url = URL.createObjectURL(new Blob([vcard], { type: 'text/vcard' }))
    const link = document.createElement('a')
    link.href = url
    link.download = `${name.replace(/\s+/g, '-')}.vcf`
    link.click()
    URL.revokeObjectURL(url)
  }

  async function share() {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title: name, text: `${name} — ${title}`, url })
      } catch {
        // User dismissed the share sheet.
      }
      return
    }
    await navigator.clipboard.writeText(url)
    flash('link')
  }

  const emailCopied = status === 'email'
  const linkCopied = status === 'link'

  return (
    <div className="flex flex-col gap-4">
      <a
        href={`mailto:${email}`}
        className="inline-flex w-fit items-center gap-3 rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
      >
        <Mail className="size-5" aria-hidden="true" />
        <span className="break-all">{email}</span>
      </a>

      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={copyEmail} className={secondaryButton}>
          {emailCopied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
          {emailCopied ? 'Copied' : 'Copy email'}
        </button>
        <button type="button" onClick={saveContact} className={secondaryButton}>
          <UserPlus className="size-4" aria-hidden="true" />
          Save contact
        </button>
        <button type="button" onClick={share} className={secondaryButton}>
          {linkCopied ? <Check className="size-4" aria-hidden="true" /> : <Share2 className="size-4" aria-hidden="true" />}
          {linkCopied ? 'Link copied' : 'Share'}
        </button>
        <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={secondaryButton}>
          <GitHubMark className="size-4" />
          GitHub
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>

      <p className="sr-only" aria-live="polite">
        {emailCopied ? 'Email address copied to clipboard' : linkCopied ? 'Link copied to clipboard' : ''}
      </p>
    </div>
  )
}
