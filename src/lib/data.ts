export type FeatureUsage = {
  name: string;
  totalClicks: number;
};

export type TimeTrend = {
  date: string;
  clicks: number;
};

export const featureUsageData: FeatureUsage[] = [
  { name: 'filter_gender', totalClicks: 120 },
  { name: 'chart_bar', totalClicks: 135 },
  { name: 'filter_age', totalClicks: 165 },
  { name: 'date_picker', totalClicks: 210 },
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
  'date_picker': generateRandomClicks(80, 40),
  'filter_age': generateRandomClicks(60, 30),
  'chart_bar': generateRandomClicks(30, 15),
  'filter_gender': generateRandomClicks(45, 20),
};
