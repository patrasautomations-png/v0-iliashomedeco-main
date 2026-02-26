import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { spaceType, needs, district, name, email, phone, message } = body

    // Validate required fields
    if (!name || !email || !spaceType || !needs?.length || !district) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // In production, integrate with Resend/Formspree here:
    // await resend.emails.send({
    //   from: 'ILIAS HOME DECO <noreply@iliashomedeco.gr>',
    //   to: ['info@iliashomedeco.gr'],
    //   subject: `New Lead: ${name} - ${spaceType} in ${district}`,
    //   html: `...`,
    // })

    // For MVP: log the submission
    console.log('Lead submission:', {
      spaceType,
      needs,
      district,
      name,
      email,
      phone,
      message,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    )
  }
}
