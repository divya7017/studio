"use client";

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import DashboardHeader from '@/components/dashboard-header';
import Filters from '@/components/filters';
import FeatureUsageChart from '@/components/charts/feature-usage-chart';
import TimeTrendChart from '@/components/charts/time-trend-chart';
import { FeatureUsage, TimeTrend } from '@/lib/data';
import { trackFeatureClick } from '@/lib/tracking';
import { getBarChartData, getLineChartData } from '@/lib/analytics';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [featureUsageData, setFeatureUsageData] = useState<FeatureUsage[]>([]);
  const [isLoadingBarChart, setIsLoadingBarChart] = useState(true);
  const [lineChartData, setLineChartData] = useState<TimeTrend[]>([]);
  const [isLoadingLineChart, setIsLoadingLineChart] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.replace('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const fetchBarData = useCallback(async () => {
    if (!isAuthenticated) return;
    setIsLoadingBarChart(true);
    try {
      const data = await getBarChartData();
      setFeatureUsageData(data);
    } finally {
      setIsLoadingBarChart(false);
    }
  }, [isAuthenticated]);

  const fetchLineData = useCallback(async () => {
    if (!isAuthenticated) return;
    setIsLoadingLineChart(true);
    try {
      const data = await getLineChartData();
      setLineChartData(data);
    } finally {
      setIsLoadingLineChart(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if(isAuthenticated) {
      fetchBarData();
    }
  }, [isAuthenticated, fetchBarData]);
  
  useEffect(() => {
    if(isAuthenticated) {
      fetchLineData();
    }
  }, [isAuthenticated, fetchLineData]);
  
  const handleChartClick = () => {
    trackFeatureClick('chart_bar');
  };

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-lg font-medium">Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardHeader />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4">
          <h2 className="text-2xl font-bold tracking-tight font-headline">Analytics Dashboard</h2>
          <Filters
            dateRange={undefined}
            onDateRangeChange={() => {}}
            age={'all'}
            onAgeChange={() => {}}
            gender={'all'}
            onGenderChange={() => {}}
          />
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
          <div className="col-span-1 cursor-pointer" onClick={handleChartClick}>
            {isLoadingBarChart ? (
                <Card>
                    <Skeleton className="h-[388px] w-full" />
                </Card>
            ) : (
                <FeatureUsageChart 
                    data={featureUsageData} 
                    onBarClick={() => {}} // onBarClick does nothing for now
                    selectedFeature={null}
                />
            )}
          </div>
          <div className="col-span-1 cursor-pointer" onClick={handleChartClick}>
            {isLoadingLineChart ? (
              <Card>
                <Skeleton className="h-[388px] w-full" />
              </Card>
            ) : (
              <TimeTrendChart
                data={lineChartData}
                featureName={null}
                hasDateFilter={false}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
