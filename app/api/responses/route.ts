import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const MAX_ANSWER_LENGTH = 2000

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { question_id, answer, respondent = 'anushka' } = body

    if (!question_id || typeof question_id !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid question_id' }, { status: 400 })
    }

    if (!answer || typeof answer !== 'string' || !answer.trim()) {
      return NextResponse.json({ error: 'Answer cannot be empty' }, { status: 400 })
    }

    if (!['smarak', 'anushka'].includes(respondent)) {
      return NextResponse.json({ error: 'Invalid respondent' }, { status: 400 })
    }

    const trimmedAnswer = answer.trim().slice(0, MAX_ANSWER_LENGTH)

    // Upsert: if this question already has a response from this respondent, update it.
    const { data: existing } = await supabase
      .from('responses')
      .select('id')
      .eq('question_id', question_id)
      .eq('respondent', respondent)
      .maybeSingle()

    let data, error

    if (existing) {
      ;({ data, error } = await supabase
        .from('responses')
        .update({ answer: trimmedAnswer, updated_at: new Date().toISOString() })
        .eq('id', existing.id)
        .select()
        .single())
    } else {
      ;({ data, error } = await supabase
        .from('responses')
        .insert([{ question_id, answer: trimmedAnswer, respondent }])
        .select()
        .single())
    }

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error submitting response:', error)
    return NextResponse.json({ error: 'Failed to submit response' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('responses')
      .select('*')
      .order('submitted_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching responses:', error)
    return NextResponse.json({ error: 'Failed to fetch responses' }, { status: 500 })
  }
}
