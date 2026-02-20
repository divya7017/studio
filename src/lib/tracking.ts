'use client';

export const trackFeatureClick = async (featureName: string) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    console.error('No auth token found for tracking');
    return;
  }

  try {
    const response = await fetch('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ featureName}),
    });
    if (!response.ok) {
        console.error('Failed to track feature click:', response.statusText);
    }
  } catch (error) {
    console.error('Failed to track feature click:', error);
  }
};
