'use client';

import { FeatureUsage, TimeTrend } from "./data";
import { DateRange } from "react-day-picker";

const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
}

interface BarChartFilters {
    gender?: string;
    age?: string;
    dateRange?: DateRange;
}

export const getBarChartData = async (filters: BarChartFilters): Promise<FeatureUsage[]> => {
    const token = getToken();
    if (!token) {
        console.error("No auth token found");
        return [];
    }
    
    const params = new URLSearchParams();
    if (filters.gender && filters.gender !== 'all') {
        params.append('gender', filters.gender);
    }
    if (filters.age && filters.age !== 'all') {
        if (filters.age === '<18') {
            params.append('maxAge', '17');
        } else if (filters.age === '18-40') {
            params.append('minAge', '18');
            params.append('maxAge', '40');
        } else if (filters.age === '>40') {
            params.append('minAge', '41');
        }
    }
    if (filters.dateRange?.from) {
        params.append('startDate', new Date(filters.dateRange.from).toISOString().split('T')[0]);
    }
    if (filters.dateRange?.to) {
        params.append('endDate', new Date(filters.dateRange.to).toISOString().split('T')[0]);
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

    const data = await response.json();
    return data.map((item: { feature: string; count: number }) => ({
      name: item.feature,
      totalClicks: item.count,
    }));
};

interface LineChartFilters {
    featureName?: string | null;
    dateRange?: DateRange;
    gender?: string;
    age?: string;
}

export const getLineChartData = async (filters: LineChartFilters): Promise<TimeTrend[]> => {
    const token = getToken();
    if (!token) {
        console.error("No auth token found");
        return [];
    }
    
    const params = new URLSearchParams();
    if (filters.featureName) {
        params.append('featureName', filters.featureName);
    }
    if (filters.dateRange?.from) {
        params.append('startDate', new Date(filters.dateRange.from).toISOString());
    }
    if (filters.dateRange?.to) {
        params.append('endDate', new Date(filters.dateRange.to).toISOString());
    }
    if (filters.gender && filters.gender !== 'all') {
        params.append('gender', filters.gender);
    }
    if (filters.age && filters.age !== 'all') {
        if (filters.age === '<18') {
            params.append('maxAge', '17');
        } else if (filters.age === '18-40') {
            params.append('minAge', '18');
            params.append('maxAge', '40');
        } else if (filters.age === '>40') {
            params.append('minAge', '41');
        }
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
