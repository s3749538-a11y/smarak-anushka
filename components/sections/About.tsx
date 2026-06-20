import { PhotoCarousel } from '@/components/ui/photo-carousel'
import { ABOUT_COPY } from '@/lib/constants'

const MOMENTS = [
  { src: '/images/moments/moment1.jpg', alt: 'Smarak playing sports' },
  { src: '/images/moments/moment2.jpg', alt: 'Smarak coding' },
  { src: '/images/moments/moment3.jpg', alt: 'Smarak with guitar' },
  { src: '/images/moments/moment4.jpg', alt: 'Smarak laughing, candid moment' },
  { src: '/images/moments/moment5.jpg', alt: 'Smarak, candid moment' },
  { src: '/images/moments/moment6.jpg', alt: 'Smarak, candid moment' },
  { src: '/images/moments/moment7.jpg', alt: 'Smarak, candid moment' },
  { src: '/images/moments/moment8.jpg', alt: 'Smarak, candid moment' },
  { src: '/images/moments/moment9.jpg', alt: 'Smarak, candid moment' },
  { src: '/images/moments/moment10.jpg', alt: 'Smarak, candid moment' },
  { src: '/images/moments/moment11.jpg', alt: 'Smarak, candid moment' },
  { src: '/images/moments/moment12.jpg', alt: 'Smarak, candid moment' },
]

export function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <h2 className="font-display text-h2 text-ink-900 italic mb-6">{ABOUT_COPY.heading}</h2>
            <div className="space-y-4">
              {ABOUT_COPY.paragraphs.map((p, i) => (
                <p key={i} className="text-body text-ink-600 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>
          <div>
            <PhotoCarousel images={MOMENTS} />
          </div>
        </div>
      </div>
    </section>
  )
}
