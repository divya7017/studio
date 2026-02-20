"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { FeatureUsage } from "@/lib/data"

const chartConfig = {
  totalClicks: {
    label: "Clicks",
    color: "hsl(var(--chart-1))",
  },
  selected: {
    label: "Clicks",
    color: "hsl(var(--accent))"
  }
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
        <CardTitle className="font-headline text-center">Total Clicks</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer>
            <BarChart
              data={data}
              layout="vertical"
              margin={{
                left: 20,
                right: 30,
              }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                width={100}
              />
              <XAxis type="number" />
              <Tooltip
                cursor={{ fill: "transparent" }}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar
                dataKey="totalClicks"
                radius={4}
                onClick={(d) => onBarClick(d.name)}
                className="cursor-pointer"
              >
                 {data.map((entry) => (
                    <Cell 
                      key={`cell-${entry.name}`} 
                      fill={entry.name === selectedFeature ? "hsl(var(--accent))" : "hsl(var(--chart-1))"} 
                    />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
