import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, Cell } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useChartData } from "@/hooks/useChartData"
import { Loader2 } from "lucide-react"

const chartConfig = {
  views: {
    label: "Lead Generation",
  },
  people: {
    label: "People",
    color: "hsl(var(--chart-1))",
  },
  companies: {
    label: "Companies", 
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function LeadGenerationChart() {
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("people")
  const { data: chartData, isLoading, error } = useChartData()

  // Optimize rendering performance
  const chartDataMemo = React.useMemo(() => chartData || [], [chartData])

  // Generate consistent random colors for each data point
  const colorMapping = React.useMemo(() => {
    if (!chartDataMemo.length) return {}
    
    const colors: Record<string, string> = {}
    chartDataMemo.forEach((item, index) => {
      // Use index as seed for more predictable colors while still being different
      const hue = (index * 137.5) % 360 // Golden angle for better distribution
      const saturation = 70 + (index % 3) * 10 // 70%, 80%, 90%
      const lightness = 55 + (index % 2) * 10 // 55%, 65%
      colors[item.date] = `hsl(${hue}, ${saturation}%, ${lightness}%)`
    })
    return colors
  }, [chartDataMemo])

  const total = React.useMemo(() => {
    if (!chartDataMemo.length) return { people: 0, companies: 0 }
    
    return {
      people: chartDataMemo.reduce((acc, curr) => acc + curr.people, 0),
      companies: chartDataMemo.reduce((acc, curr) => acc + curr.companies, 0),
    }
  }, [chartDataMemo])

  if (isLoading) {
    return (
      <Card className="py-0 !bg-transparent !border-muted/50 !border-2">
        <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
            <CardTitle>Lead generation</CardTitle>
            <CardDescription>New contacts added to the pool.</CardDescription>
          </div>
          <div className="flex">
            {["people", "companies"].map((key) => (
              <div
                key={key}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
              >
                <span className="text-muted-foreground text-xs capitalize">{key}</span>
                <div className="text-lg leading-none font-bold sm:text-3xl animate-pulse bg-muted rounded h-8 w-16"></div>
              </div>
            ))}
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6 !bg-transparent">
          <div className="aspect-auto h-[250px] w-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Loading chart data...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="py-0 !bg-transparent !border-muted/50 !border-2">
        <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
            <CardTitle>Lead generation</CardTitle>
            <CardDescription>Failed to load chart data.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          <div className="text-red-500 text-center py-8">
            Error loading chart data: {error.message}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="py-0 !bg-transparent !border-muted/50 !border-2">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
          <CardTitle>Lead generation</CardTitle>
          <CardDescription>
            New contacts added to the pool.
          </CardDescription>
        </div>
        <div className="flex">
          {["people", "companies"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-muted-foreground text-xs">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6 !bg-transparent">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full !bg-transparent"
        >
          <BarChart
            accessibilityLayer
            data={chartDataMemo}
            margin={{
              left: 12,
              right: 12,
            }}
            style={{ backgroundColor: 'transparent' }}
          >
            <CartesianGrid vertical={false} stroke="hsl(var(--muted-foreground) / 0.2)" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[180px] !bg-background/95 !border-border !shadow-lg !backdrop-blur-sm"
                  nameKey={activeChart}
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                  formatter={(value, name) => [
                    name === "people"
                      ? `People: ${value?.toLocaleString() || 0}`
                      : `Companies: ${value?.toLocaleString() || 0}`,
                    ""
                  ]}
                />
              }
            />
            <Bar 
              dataKey={activeChart} 
              radius={4}
            >
              {chartDataMemo.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={colorMapping[entry.date] || `var(--color-${activeChart})`} 
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default LeadGenerationChart
