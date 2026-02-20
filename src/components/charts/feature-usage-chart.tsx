"use client"

import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { FeatureUsage } from "@/lib/data"

const chartConfig = {
  clicks: {
    label: "Clicks",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

interface FeatureUsageChartProps {
  data: FeatureUsage[];
  onBarClick: (featureName: string) => void;
  selectedFeature: string | null;
}

export default function FeatureUsageChart({ data, onBarClick, selectedFeature }: FeatureUsageChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Feature Usage</CardTitle>
        <CardDescription>Total click counts for each feature.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer>
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 10) + (value.length > 10 ? '...' : '')}
              />
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar
                dataKey="totalClicks"
                name="Clicks"
                fill="var(--color-clicks)"
                radius={4}
                onClick={(d) => onBarClick(d.name)}
                className="cursor-pointer"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
