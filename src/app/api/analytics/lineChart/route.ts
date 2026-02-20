import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const authToken = request.headers.get('Authorization');

    if (!authToken) {
      return NextResponse.json({ message: 'Authorization header is missing' }, { status: 401 });
    }

    const { search } = request.nextUrl;
    const externalApiUrl = `https://analyticsdashboard-production-c0d2.up.railway.app/analytics/lineChart${search}`;

    const externalApiResponse = await fetch(externalApiUrl, {
      method: 'GET',
      headers: {
        'Authorization': authToken,
        'ngrok-skip-browser-warning': 'true',
      },
    });

    const data = await externalApiResponse.text();
    
    if (!externalApiResponse.ok) {
      console.error("External API error on line chart:", data);
      return new NextResponse(data || `External API Error: ${externalApiResponse.status}`, {
        status: externalApiResponse.status,
        statusText: externalApiResponse.statusText,
      });
    }

    return new NextResponse(data, {
      status: externalApiResponse.status,
      statusText: externalApiResponse.statusText,
      headers: { 'Content-Type': externalApiResponse.headers.get('Content-Type') || 'application/json' },
    });

  } catch (error) {
    console.error('Error in line chart proxy API:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}
