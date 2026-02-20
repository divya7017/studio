"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';

import DashboardHeader from '@/components/dashboard-header';
import Filters from '@/components/filters';
import FeatureUsageChart from '@/components/charts/feature-usage-chart';
import TimeTrendChart from '@/components/charts/time-trend-chart';
import { featureUsageData, timeTrendData } from '@/lib/data';
import usePersistentState from '@/hooks/use-persistent-state';
import { trackFeatureClick } from '@/lib/tracking';

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [dateRange, setDateRange] = usePersistentState<DateRange | undefined>('filter-dateRange', {
    from: addDays(new Date(), -29),
    to: new Date(),
  });
  const [age, setAge] = usePersistentState<string>('filter-age', 'all');
  const [gender, setGender] = usePersistentState<string>('filter-gender', 'all');
  const [selectedFeature, setSelectedFeature] = usePersistentState<string | null>('selectedFeature', featureUsageData[0]?.name || null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.replace('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleBarClick = (featureName: string) => {
    setSelectedFeature(featureName);
  };
  
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-1 lg:col-span-4 cursor-pointer" onClick={handleChartClick}>
            <FeatureUsageChart 
              data={featureUsageData} 
              onBarClick={handleBarClick}
              selectedFeature={selectedFeature}
            />
          </div>
          <div className="col-span-1 lg:col-span-3 cursor-pointer" onClick={handleChartClick}>
            <TimeTrendChart 
              data={selectedFeature ? timeTrendData[selectedFeature] : undefined}
              featureName={selectedFeature}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
