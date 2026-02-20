"use client"

import { Line, LineChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { TimeTrend } from "@/lib/data"

const chartConfig = {
  clicks: {
    label: "Clicks",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig

interface TimeTrendChartProps {
  data: TimeTrend[] | undefined;
  featureName: string | null;
  hasDateFilter: boolean;
}

export default function TimeTrendChart({ data, featureName, hasDateFilter }: TimeTrendChartProps) {
  let description = 'Overall click trends over all time.';
  if (featureName) {
    description = `Clicks Daily for "${featureName}"${hasDateFilter ? ' over the selected period' : ''}.`;
  } else if (hasDateFilter) {
    description = 'Overall click trends over the selected period.';
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Time Trend Analysis</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          {data && data.length > 0 ? (
            <ResponsiveContainer>
              <LineChart
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
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-IN", {
                      timeZone: "Asia/Kolkata",
                      month: "short",
                      day: "2-digit",
                      year: "numeric"
                    });
                  }}
                />
                <Tooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Line
                  dataKey="clicks"
                  type="monotone"
                  stroke="var(--color-clicks)"
                  strokeWidth={2}
                  dot={false}
                  name="Clicks"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-[300px] w-full items-center justify-center text-muted-foreground">
              <p>No data available to display.</p>
            </div>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
