import fs from 'fs'
import path from 'path'

export interface ExhibitionWork {
  filename: string
  position: number
  label: string | null
  curator_note: string | null
}

export interface Exhibition {
  id: string
  title: string
  slug: string
  category: string
  status: 'showing' | 'archived' | 'draft'
  created_date: string
  showing_since: string
  curator_statement: string
  works: ExhibitionWork[]
  source_folder: string
  image_count: number
  tags: string[]
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'exhibitions')

function readExhibition(filePath: string): Exhibition | null {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(raw) as Exhibition
  } catch {
    return null
  }
}

export function getAllExhibitions(): Exhibition[] {
  try {
    const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.json'))
    return files
      .map(f => readExhibition(path.join(CONTENT_DIR, f)))
      .filter((e): e is Exhibition => e !== null)
      .sort((a, b) => new Date(b.showing_since).getTime() - new Date(a.showing_since).getTime())
  } catch {
    return []
  }
}

export function getThruDate(exhibition: Exhibition): Date {
  const date = new Date(exhibition.showing_since)
  date.setDate(date.getDate() + 14)
  return date
}

export function formatThruDate(exhibition: Exhibition): string {
  return getThruDate(exhibition).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  })
}

export function getShowingExhibitions(): Exhibition[] {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  return getAllExhibitions().filter(e => {
    if (e.status !== 'showing') return false
    const thru = getThruDate(e)
    return thru >= now
  })
}

export function getExhibitionBySlug(slug: string): Exhibition | null {
  const all = getAllExhibitions()
  return all.find(e => e.slug === slug) || null
}

export function getExhibitionImagePath(slug: string, filename: string): string {
  return `/exhibitions/${slug}/images/${filename}`
}
