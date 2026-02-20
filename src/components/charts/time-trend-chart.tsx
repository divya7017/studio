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
}

export default function TimeTrendChart({ data, featureName }: TimeTrendChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Time Trend Analysis</CardTitle>
        <CardDescription>
          {featureName ? `Click trends for "${featureName}" over the last 30 days.` : "Select a feature from the chart above to see its trend."}
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
                    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
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
              <p>{featureName ? "No data available for this feature." : "Please select a feature."}</p>
            </div>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
