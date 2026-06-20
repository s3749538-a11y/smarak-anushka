import { Card, CardContent } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'
import type { Response } from '@/lib/types'

export function ResponseDisplay({ response }: { response: Response }) {
  return (
    <Card>
      <CardContent className="pt-5">
        <p className="text-body text-ink-700 leading-relaxed">{response.answer}</p>
        <p className="text-sm text-ink-400 mt-3">{formatDate(response.submitted_at)}</p>
      </CardContent>
    </Card>
  )
}
