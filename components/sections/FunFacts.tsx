import { Card, CardContent } from '@/components/ui/card'
import { FUN_FACTS, FUN_FACTS_HEADING } from '@/lib/constants'

export function FunFacts() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="font-display text-h2 text-ink-900 italic mb-10 text-center">
          {FUN_FACTS_HEADING}
        </h2>

        <div className="grid sm:grid-cols-2 gap-3">
          {FUN_FACTS.map((fact, i) => (
            <Card
              key={i}
              className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <CardContent className="py-5">
                <p className="font-medium text-ink-900 mb-1">{fact.title}</p>
                <p className="text-sm text-ink-500 leading-relaxed">{fact.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
