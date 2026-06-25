import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FlirtyCardStack } from '@/components/ui/flirty-card-stack'
import { INTERESTS, LITTLE_THINGS, LITTLE_THINGS_HEADING, FLIRTY_LINES } from '@/lib/constants'

export function InterestsProjects() {
  return (
    <section id="interests" className="py-20 md:py-28 bg-ink-50/40 overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="font-display text-h2 text-ink-900 italic mb-12 text-center">
          what i&apos;m into
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Interests */}
          <div>
            <h3 className="text-h3 text-ink-700 mb-5">interests</h3>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((interest) => (
                <Badge
                  key={interest.label}
                  className="bg-white border border-ink-100 text-ink-600"
                >
                  <span className="mr-1.5">{interest.emoji}</span>
                  {interest.label}
                </Badge>
              ))}
            </div>

            {/* Scattered flirty lines, tucked right under the interest tags */}
            <div className="mt-16 mb-4">
              <FlirtyCardStack lines={FLIRTY_LINES} />
            </div>
          </div>

          {/* Little things — replaces the old "projects" column. This is
              the personality stuff, not the résumé stuff. */}
          <div>
            <h3 className="text-h3 text-ink-700 mb-5">{LITTLE_THINGS_HEADING}</h3>
            <div className="space-y-3">
              {LITTLE_THINGS.map((item, i) => (
                <Card
                  key={i}
                  className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <CardContent className="flex items-start gap-3 py-4">
                    <span className="text-xl leading-none mt-0.5">{item.emoji}</span>
                    <p className="text-body text-ink-600 leading-relaxed">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
