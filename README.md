# Now Showing

A personal, AI-curated exhibition space. Point Claude at a folder of your creative work, have a conversation about what kind of show to make, and publish it as a live exhibition on your own website.

Claude acts as your curator — proposing themes, selecting works, writing exhibition texts — and you shape the show through conversation before it goes live.

## How It Works

1. You connect your archive (an external drive, a folder of photos, anything)
2. You open this project in VS Code with the Claude Code extension
3. You tell Claude: *"Create an exhibition from /path/to/my/folder"*
4. Claude looks at your images, proposes a show with a title, curatorial essay, and selection
5. You discuss, adjust, approve
6. Claude builds the exhibition and you deploy it

Each exhibition lives on your site as a page with a title, category, curatorial statement, and image gallery. Your homepage shows what's currently on view.

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) VS Code extension
- A [Vercel](https://vercel.com) account (free tier works)
- An Anthropic API key (for Claude Code)

## Quick Start

### 1. Clone

```bash
git clone https://github.com/yourusername/now-showing.git
cd now-showing
npm install
```

### 2. Configure Your Museum

Edit `museum.config.json`:

```json
{
  "name": "Now Showing",
  "tagline": "A personal museum",
  "owner": "Your Name",
  "description": "AI-curated exhibitions from a personal archive.",
  "url": "https://your-site.vercel.app",
  "donation_url": null,
  "max_concurrent_shows": 3
}
```

### 3. Create Your First Exhibition

Open the project in VS Code. Open the Claude Code panel. Say:

> Create an exhibition from /path/to/your/photos

Claude will propose a show. Discuss it, refine it, and when you're happy, tell Claude to build it. The exhibition files will be created in your project.

### 4. Deploy

```bash
npx vercel
```

Or connect your GitHub repo to Vercel for automatic deploys on every push.

### 5. Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000` to preview your site.

## Helping Claude Find the Good Stuff

If your archive is large, you can help Claude by:

- **Pointing to a specific folder** rather than the whole archive
- **Adding a `README.md`** inside any folder with notes about the work:
  ```
  # Lisbon 2019
  Street photography over two weeks in October.
  The night shots from Alfama are the strongest work.
  ```
- **Creating a `_selections/` subfolder** with your pre-selected favorites — Claude will look there first
- **Adding a `_curator.md`** with specific guidance for the curator

## Project Structure

```
now-showing/
├── content/exhibitions/     ← exhibition JSON data files
├── public/exhibitions/      ← exhibition images
├── src/
│   ├── app/                 ← Next.js pages
│   ├── components/          ← UI components
│   └── lib/                 ← data reading utilities
├── .claude/
│   ├── settings.json        ← Claude Code project config
│   └── curator-prompt.md    ← the curator's instructions
├── museum.config.json       ← your museum's identity
└── README.md
```

## Exhibition Data

Each exhibition is a JSON file in `content/exhibitions/`:

```json
{
  "id": "threshold-of-light",
  "title": "Threshold of Light",
  "slug": "threshold-of-light",
  "category": "photography",
  "status": "showing",
  "created_date": "2026-03-05",
  "showing_since": "2026-03-05",
  "curator_statement": "Your curatorial text here...",
  "works": [
    {
      "filename": "image.jpg",
      "position": 1,
      "label": "A short description",
      "curator_note": "An optional observation"
    }
  ],
  "source_folder": "/path/to/original/folder",
  "image_count": 12,
  "tags": ["street", "architecture"]
}
```

**Status values:** `"showing"` (on homepage), `"archived"` (past show), `"draft"` (not yet published).

## Customization

### Fonts and Colors

Edit `tailwind.config.js` to change the typography and color palette. The defaults are:

- **Display:** Playfair Display (headings)
- **Body:** Source Serif 4 (curatorial text)
- **Sans:** DM Sans (metadata, labels)

### Curator Persona

Edit `.claude/curator-prompt.md` to change how Claude approaches curation — its voice, its selection criteria, its curatorial philosophy.

## Privacy

- Your archive stays on your local machine
- Images are only copied into the project when you approve an exhibition
- Source folder paths are stored in the JSON but never rendered on the public site
- No analytics, no tracking, no third-party services beyond Vercel hosting

## License

MIT

## Support

If this project is useful to you, consider supporting its development.
