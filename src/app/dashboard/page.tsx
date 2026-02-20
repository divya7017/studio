"use client";

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { DateRange } from 'react-day-picker';

import DashboardHeader from '@/components/dashboard-header';
import Filters from '@/components/filters';
import FeatureUsageChart from '@/components/charts/feature-usage-chart';
import { FeatureUsage } from '@/lib/data';
import usePersistentState from '@/hooks/use-persistent-state';
import { trackFeatureClick } from '@/lib/tracking';
import { getBarChartData } from '@/lib/analytics';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Filters state is maintained, but not currently used for fetching.
  const [dateRange, setDateRange] = usePersistentState<DateRange | undefined>('filter-dateRange', undefined);
  const [age, setAge] = usePersistentState<string>('filter-age', 'all');
  const [gender, setGender] = usePersistentState<string>('filter-gender', 'all');
  
  const [featureUsageData, setFeatureUsageData] = useState<FeatureUsage[]>([]);
  const [isLoadingBarChart, setIsLoadingBarChart] = useState(true);

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
      // Calling getBarChartData without any parameters as requested.
      const data = await getBarChartData();
      setFeatureUsageData(data);
    } finally {
      setIsLoadingBarChart(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if(isAuthenticated) {
      fetchBarData();
    }
  }, [isAuthenticated, fetchBarData]);
  
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
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            age={age}
            onAgeChange={setAge}
            gender={gender}
            onGenderChange={setGender}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
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
        </div>
      </main>
    </div>
  );
}
