'use client';

export const trackFeatureClick = async (featureName: string) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    console.error('No auth token found for tracking');
    return;
  }

  try {
    const response = await fetch('https://man-unrailed-noncorruptibly.ngrok-free.dev/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ featureName, token }),
    });
    if (!response.ok) {
        console.error('Failed to track feature click:', response.statusText);
    }
  } catch (error) {
    console.error('Failed to track feature click:', error);
  }
};
