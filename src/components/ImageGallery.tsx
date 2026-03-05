'use client'

import { useState } from 'react'
import Lightbox from './Lightbox'

interface GalleryImage {
  src: string
  label: string | null
  curator_note: string | null
}

interface ImageGalleryProps {
  images: GalleryImage[]
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <>
      <div className="space-y-8 md:space-y-12">
        {images.map((image, index) => (
          <figure key={index} className="cursor-pointer" onClick={() => setLightboxIndex(index)}>
            <img
              src={image.src}
              alt={image.label || ''}
              className="w-full"
              loading={index > 1 ? 'lazy' : 'eager'}
            />
            {(image.label || image.curator_note) && (
              <figcaption className="mt-3 px-1">
                {image.label && (
                  <p className="font-sans text-sm text-museum-muted">
                    {image.label}
                  </p>
                )}
                {image.curator_note && (
                  <p className="mt-1 font-body text-sm text-museum-muted italic">
                    {image.curator_note}
                  </p>
                )}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images.map(img => ({ src: img.src, label: img.label }))}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  )
}
