import { CardActions } from '@/components/card-actions'

const EMAIL = 'Wahibi.ibrahimi@gmail.com'

export function CallingCard() {
  return (
    <article className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card shadow-sm animate-in fade-in slide-in-from-bottom-3 duration-700 ease-out motion-reduce:animate-none">
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
          <CardActions
            name="Wahib Ibrahim"
            firstName="Wahib"
            lastName="Ibrahim"
            title="College Student"
            organization="Kennesaw State University"
            email={EMAIL}
          />
        </footer>
      </div>
    </article>
  )
}
