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

export const getBarChartData = async (
    gender: string,
    age: string,
    dateRange: DateRange | undefined
): Promise<FeatureUsage[]> => {
    const token = getToken();
    if (!token) {
        console.error("No auth token found");
        return [];
    }

    const params = new URLSearchParams();
    if (gender && gender !== 'all') {
        params.append('gender', gender);
    }

    const { minAge, maxAge } = parseAgeFilter(age);
    if (minAge !== undefined) {
        params.append('minAge', String(minAge));
    }
    if (maxAge !== undefined) {
        params.append('maxAge', String(maxAge));
    }

    if (dateRange?.from) {
        const fromDate = new Date(dateRange.from);
        params.append('startDate', fromDate.toISOString());
    }
    if (dateRange?.to) {
        const toDate = new Date(dateRange.to);
        params.append('endDate', toDate.toISOString());
    }

    const response = await fetch(`/api/analytics/bar?${params.toString()}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        console.error("Failed to fetch bar chart data", await response.text());
        return [];
    }

    return response.json();
};

export const getLineChartData = async (
    featureName: string,
    dateRange: DateRange | undefined
): Promise<TimeTrend[]> => {
    const token = getToken();
    if (!token) {
        console.error("No auth token found");
        return [];
    }

    const params = new URLSearchParams();
    params.append('featureName', featureName);

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

    return response.json();
};
