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
}

const secondaryButton =
  'inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card'

export function CardActions({ name, firstName, lastName, title, organization, email }: CardActionsProps) {
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
      </div>

      <p className="sr-only" aria-live="polite">
        {emailCopied ? 'Email address copied to clipboard' : linkCopied ? 'Link copied to clipboard' : ''}
      </p>
    </div>
  )
}
