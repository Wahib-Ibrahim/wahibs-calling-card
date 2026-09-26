import { Mail } from 'lucide-react'

const EMAIL = 'Wahibi.ibrahimi@gmail.com'

export function CallingCard() {
  return (
    <article className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="h-2 bg-primary" aria-hidden="true" />
      <div className="flex flex-col gap-8 p-8 sm:p-12">
        <header className="flex flex-col gap-2">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            College Student
          </p>
          <h1 className="font-serif text-4xl font-semibold text-balance text-foreground sm:text-5xl">
            Wahib Ibrahim
          </h1>
        </header>

        <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
          {"I'm currently a student at Kennesaw State University majoring in Information Technology, and I hope to pursue a career in Cloud Computing."}
        </p>

        <footer className="flex flex-col gap-3 border-t border-border pt-8">
          <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Get in touch
          </h2>
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex w-fit items-center gap-3 rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
          >
            <Mail className="size-5" aria-hidden="true" />
            <span className="break-all">{EMAIL}</span>
          </a>
        </footer>
      </div>
    </article>
  )
}
