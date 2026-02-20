'use client';

import { FeatureUsage, TimeTrend } from "./data";

const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
}

export const getBarChartData = async (): Promise<FeatureUsage[]> => {
    const token = getToken();
    if (!token) {
        console.error("No auth token found");
        return [];
    }

    const response = await fetch(`/api/analytics/bar`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        console.error("Failed to fetch bar chart data", await response.text());
        return [];
    }

    const data = await response.json();
    return data.map((item: { feature: string; count: number }) => ({
      name: item.feature,
      totalClicks: item.count,
    }));
};

export const getLineChartData = async (): Promise<TimeTrend[]> => {
    const token = getToken();
    if (!token) {
        console.error("No auth token found");
        return [];
    }
    
    const response = await fetch(`/api/analytics/lineChart`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        console.error("Failed to fetch line chart data", await response.text());
        return [];
    }

    const data = await response.json();
    return data.map((item: { date: string; count: number }) => ({
      date: item.date,
      clicks: item.count,
    }));
};
