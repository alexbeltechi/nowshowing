import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import {
  getAllExhibitions,
  getExhibitionBySlug,
  getExhibitionImagePath,
  getShowingExhibitions,
  formatThruDate,
} from '@/lib/exhibitions'
import { getMuseumConfig } from '@/lib/config'
import ImageGallery from '@/components/ImageGallery'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const exhibitions = getAllExhibitions()
  return exhibitions.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const exhibition = getExhibitionBySlug(params.slug)
  if (!exhibition) return {}

  const config = getMuseumConfig()
  const heroImage = exhibition.works[0]
    ? `${config.url}${getExhibitionImagePath(exhibition.slug, exhibition.works[0].filename)}`
    : undefined

  return {
    title: `${exhibition.title} — ${config.name}`,
    description: exhibition.curator_statement.split('\n')[0].slice(0, 200),
    openGraph: {
      title: `${exhibition.title} — ${config.name}`,
      description: exhibition.curator_statement.split('\n')[0].slice(0, 200),
      type: 'article',
      images: heroImage ? [{ url: heroImage, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${exhibition.title} — ${config.name}`,
      description: exhibition.curator_statement.split('\n')[0].slice(0, 200),
      images: heroImage ? [heroImage] : [],
    },
  }
}

export default function ExhibitionPage({ params }: PageProps) {
  const exhibition = getExhibitionBySlug(params.slug)

  if (!exhibition) {
    notFound()
  }

  const otherExhibitions = getShowingExhibitions().filter(e => e.slug !== exhibition.slug)

  const images = exhibition.works
    .sort((a, b) => a.position - b.position)
    .map(work => ({
      src: getExhibitionImagePath(exhibition.slug, work.filename),
      label: work.label,
      curator_note: work.curator_note,
    }))

  const paragraphs = exhibition.curator_statement
    .split('\n')
    .filter(p => p.trim().length > 0)

  return (
    <main className="min-h-screen flex flex-col">
      {/* Back link */}
      <nav className="px-6 md:px-12 pt-8 max-w-article mx-auto w-full">
        <Link
          href="/"
          className="font-sans text-sm text-museum-muted hover:text-museum-text transition-colors"
        >
          &larr; Now Showing
        </Link>
      </nav>

      {/* Exhibition Header */}
      <header className="px-6 md:px-12 pt-10 pb-8 max-w-article mx-auto w-full">
        <span className="font-sans text-xs tracking-widest uppercase text-museum-muted">
          {exhibition.category}
        </span>
        <h1 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight">
          {exhibition.title}
        </h1>
        <p className="mt-3 font-sans text-sm text-museum-muted">
          Thru {formatThruDate(exhibition)}
        </p>
      </header>

      {/* Curatorial Statement */}
      <article className="px-6 md:px-12 max-w-article mx-auto pb-12 md:pb-16 w-full">
        <div className="space-y-5">
          {paragraphs.map((paragraph, i) => (
            <p key={i} className="font-body text-base md:text-lg leading-relaxed text-museum-text/90">
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      {/* Image Gallery */}
      {images.length > 0 && (
        <section className="px-6 md:px-12 max-w-gallery mx-auto pb-24 w-full">
          <ImageGallery images={images} />
        </section>
      )}

      {/* Also Showing */}
      {otherExhibitions.length > 0 && (
        <section className="px-6 md:px-12 max-w-article mx-auto pb-16 w-full text-center">
          <p className="font-sans text-xs tracking-widest uppercase text-museum-muted mb-8">
            Also showing
          </p>
          <div className="space-y-6">
            {otherExhibitions.map(other => (
              <div key={other.id}>
                <Link
                  href={`/exhibition/${other.slug}`}
                  className="font-display text-xl font-medium hover:opacity-60 transition-opacity"
                >
                  {other.title}
                </Link>
                <p className="mt-1 font-sans text-sm text-museum-muted">
                  Thru {formatThruDate(other)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-museum-border mt-auto">
        <div className="px-6 md:px-12 py-8 max-w-gallery mx-auto flex items-center justify-between font-sans text-[14px] text-museum-muted">
          <span>Made with nowshowing</span>
          <span>&copy; Alex Beltechi {new Date().getFullYear()}</span>
        </div>
      </footer>
    </main>
  )
}
