import FanCardCarousel from '@/components/ui/fan-card-carousel'
import { COLLAGE_CARDS } from '@/lib/constants'

export function Collage() {
  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl text-center mb-2">
        <h2 className="font-display text-h2 text-ink-900 italic mb-2">a bit of both worlds</h2>
        <p className="text-body text-ink-600">hover to see what&apos;s what 👀</p>
      </div>
      <FanCardCarousel cards={COLLAGE_CARDS} />
    </section>
  )
}
