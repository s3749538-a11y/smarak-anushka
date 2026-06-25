import { NextRequest, NextResponse } from 'next/server'

const NVIDIA_ENDPOINT = 'https://integrate.api.nvidia.com/v1/chat/completions'
const MODEL = 'meta/llama-3.3-70b-instruct'

interface AnsweredQA {
  question: string
  answer: string
  category: string
}

function buildPrompt(qas: AnsweredQA[]): string {
  const formatted = qas
    .map((qa, i) => `${i + 1}. [${qa.category}] Q: "${qa.question}" — A: "${qa.answer}"`)
    .join('\n')

  return `You are analyzing someone's answers to a set of personal getting-to-know-you questions. Based ONLY on what they actually wrote, produce a short, warm, specific read on their personality.

Their answers:
${formatted}

Respond with ONLY valid JSON in exactly this shape, no other text:
{
  "vibe": "2-3 warm, specific sentences describing their personality and energy, written in second person ('you come across as...'). Avoid generic horoscope-style filler — ground it in details from their actual answers.",
  "likes": ["3-5 short phrases describing things they seem to like or value, inferred from their answers"],
  "dislikes": ["2-4 short phrases describing things they seem to dislike or avoid, inferred from their answers"]
}

If there isn't enough information to infer dislikes confidently, it's fine to return fewer items, but don't invent things that aren't supported by the answers.`
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.NVIDIA_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'AI summary is not configured yet.' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const qas: AnsweredQA[] = Array.isArray(body.answers) ? body.answers : []

    if (qas.length === 0) {
      return NextResponse.json({ error: 'No answers to analyze yet.' }, { status: 400 })
    }

    const prompt = buildPrompt(qas)

    const response = await fetch(NVIDIA_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.4,
        top_p: 0.7,
        max_tokens: 600,
        stream: false,
      }),
    })

    if (!response.ok) {
      const errText = await response.text().catch(() => '')
      console.error('NVIDIA API error:', response.status, errText)
      return NextResponse.json(
        { error: 'Could not generate the summary right now. Try again in a bit.' },
        { status: 502 }
      )
    }

    const data = await response.json()
    const raw = data?.choices?.[0]?.message?.content ?? ''

    // The model is asked to return pure JSON, but defensively strip any
    // markdown code fences in case it wraps the response anyway.
    const cleaned = raw.replace(/```json\s*|\s*```/g, '').trim()

    let parsed
    try {
      parsed = JSON.parse(cleaned)
    } catch {
      console.error('Failed to parse model output as JSON:', raw)
      return NextResponse.json(
        { error: 'Got an unexpected response. Try again?' },
        { status: 502 }
      )
    }

    return NextResponse.json({
      vibe: typeof parsed.vibe === 'string' ? parsed.vibe : '',
      likes: Array.isArray(parsed.likes) ? parsed.likes.slice(0, 6) : [],
      dislikes: Array.isArray(parsed.dislikes) ? parsed.dislikes.slice(0, 5) : [],
    })
  } catch (error) {
    console.error('Error generating vibe summary:', error)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
