'use client';

import { DateRange } from "react-day-picker";
import { FeatureUsage, TimeTrend } from "./data";

const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
}

const parseAgeFilter = (age: string): { minAge?: number; maxAge?: number } => {
  switch (age) {
    case '<18':
      return { maxAge: 17 };
    case '18-40':
      return { minAge: 18, maxAge: 40 };
    case '>40':
      return { minAge: 41 };
    default:
      return {};
  }
};

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

export const getLineChartData = async (
    featureName?: string,
    dateRange?: DateRange
): Promise<TimeTrend[]> => {
    const token = getToken();
    if (!token) {
        console.error("No auth token found");
        return [];
    }

    const params = new URLSearchParams();
    if (featureName) {
        params.append('featureName', featureName);
    }

    if (dateRange?.from) {
        const fromDate = new Date(dateRange.from);
        params.append('startDate', fromDate.toISOString());
    }
    if (dateRange?.to) {
        const toDate = new Date(dateRange.to);
        params.append('endDate', toDate.toISOString());
    }

    const response = await fetch(`/api/analytics/lineChart?${params.toString()}`, {
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