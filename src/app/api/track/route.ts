import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { featureName } = body;
    const authToken = request.headers.get('Authorization');

    if (!authToken) {
      return NextResponse.json({ message: 'Authorization header is missing' }, { status: 401 });
    }

    if (!featureName) {
      return NextResponse.json({ message: 'featureName is missing from body' }, { status: 400 });
    }

    const externalApiResponse = await fetch('https://man-unrailed-noncorruptibly.ngrok-free.dev/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authToken,
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify({ featureName }),
    });

    const data = await externalApiResponse.text();

    return new NextResponse(data, {
      status: externalApiResponse.status,
      statusText: externalApiResponse.statusText,
      headers: { 'Content-Type': externalApiResponse.headers.get('Content-Type') || 'text/plain' },
    });

  } catch (error) {
    console.error('Error in tracking proxy API:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}
