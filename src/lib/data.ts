export type FeatureUsage = {
  name: string;
  totalClicks: number;
};

export type TimeTrend = {
  date: string;
  clicks: number;
};

export const featureUsageData: FeatureUsage[] = [
  { name: 'Dashboard View', totalClicks: 2450 },
  { name: 'Report Export', totalClicks: 1890 },
  { name: 'User Management', totalClicks: 980 },
  { name: 'Settings', totalClicks: 1398 },
  { name: 'Help & Support', totalClicks: 600 },
  { name: 'API Access', totalClicks: 350 },
];

const generateDateRange = (days: number) => {
  const dates = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
};

const dates = generateDateRange(30);

const generateRandomClicks = (base: number, variance: number) => {
  return dates.map(date => ({
    date,
    clicks: Math.floor(base + (Math.random() - 0.5) * variance),
  }));
};

export const timeTrendData: { [key: string]: TimeTrend[] } = {
  'Dashboard View': generateRandomClicks(80, 40),
  'Report Export': generateRandomClicks(60, 30),
  'User Management': generateRandomClicks(30, 15),
  'Settings': generateRandomClicks(45, 20),
  'Help & Support': generateRandomClicks(20, 10),
  'API Access': generateRandomClicks(10, 8),
};
