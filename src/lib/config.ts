import fs from 'fs'
import path from 'path'

export interface MuseumConfig {
  name: string
  tagline: string
  owner: string
  description: string
  url: string
  donation_url: string | null
  max_concurrent_shows: number
}

const defaultConfig: MuseumConfig = {
  name: 'Now Showing',
  tagline: 'A personal museum',
  owner: '',
  description: 'AI-curated exhibitions from a personal archive.',
  url: '',
  donation_url: null,
  max_concurrent_shows: 3,
}

export function getMuseumConfig(): MuseumConfig {
  try {
    const configPath = path.join(process.cwd(), 'museum.config.json')
    const raw = fs.readFileSync(configPath, 'utf-8')
    return { ...defaultConfig, ...JSON.parse(raw) }
  } catch {
    return defaultConfig
  }
}
