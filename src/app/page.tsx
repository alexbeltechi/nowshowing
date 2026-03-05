import Link from 'next/link'
import { getShowingExhibitions, getExhibitionImagePath, formatThruDate } from '@/lib/exhibitions'

export default function Home() {
  const exhibitions = getShowingExhibitions()

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-6 pt-12 pb-8 md:px-12 md:pt-20 md:pb-10 max-w-gallery mx-auto w-full">
        <h1 className="font-display text-[20px] font-bold tracking-tight">
          Beltechi
        </h1>
        <p className="mt-2 font-body text-base text-museum-muted">
          An AI-curated body of work, updated monthly.
        </p>
      </header>

      {/* Exhibition Grid */}
      <section className="px-6 md:px-12 max-w-gallery mx-auto w-full flex-1">
        <p className="font-sans text-xs tracking-widest uppercase text-museum-muted mb-8">
          Now showing
        </p>

        {exhibitions.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-body text-museum-muted text-lg">
              No exhibitions currently on view.
            </p>
          </div>
        ) : (
          <div className="space-y-16 md:space-y-24 pb-24">
            {exhibitions.map((exhibition) => {
              const heroWork = exhibition.works[0]
              const heroImage = heroWork
                ? getExhibitionImagePath(exhibition.slug, heroWork.filename)
                : null

              return (
                <Link
                  key={exhibition.id}
                  href={`/exhibition/${exhibition.slug}`}
                  className="block group"
                >
                  {heroImage && (
                    <div className="overflow-hidden">
                      <img
                        src={heroImage}
                        alt={heroWork?.label || exhibition.title}
                        className="w-full h-[50vh] md:h-[65vh] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      />
                    </div>
                  )}

                  <h2 className="mt-5 md:mt-6 font-display text-3xl md:text-4xl font-bold tracking-tight">
                    {exhibition.title}
                  </h2>
                  <p className="mt-2 font-display text-[20px] font-bold text-museum-text">
                    Thru {formatThruDate(exhibition)}
                  </p>
                </Link>
              )
            })}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-museum-border">
        <div className="px-6 md:px-12 py-8 max-w-gallery mx-auto flex items-center justify-between font-sans text-[14px] text-museum-muted">
          <span>Made with nowshowing</span>
          <span>&copy; Alex Beltechi {new Date().getFullYear()}</span>
        </div>
      </footer>
    </main>
  )
}
