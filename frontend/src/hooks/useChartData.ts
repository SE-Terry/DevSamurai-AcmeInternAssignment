import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { format, startOfDay, subDays } from 'date-fns'
import type { RootState } from '@/store/store'
import { useEffect } from 'react'
import api from '@/lib/axios'

export interface ChartDataPoint {
  date: string
  people: number
  companies: number
}

// Helper function to fetch chart data using axios
const fetchChartData = async (startDate: string, endDate: string): Promise<ChartDataPoint[]> => {
  const response = await api.get('/chart/data', {
    params: {
      startDate,
      endDate,
    },
  })

  return response.data.data || []
}

// Hook for fetching chart data based on selected date range
export const useChartData = () => {
  const { dateRange } = useSelector((state: RootState) => state.dateRange)
  
  return useQuery({
    queryKey: ['chartData', format(dateRange.from, 'yyyy-MM-dd'), format(dateRange.to, 'yyyy-MM-dd')],
    queryFn: () => fetchChartData(
      format(dateRange.from, 'yyyy-MM-dd'),
      format(dateRange.to, 'yyyy-MM-dd')
    ),
    enabled: !!dateRange.from && !!dateRange.to,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    // Optimize for perceived performance
    networkMode: 'online',
    retry: 0,
    retryDelay: 0,
  })
}

// Hook for prefetching other date ranges to optimize UX
export const useChartDataPrefetch = () => {
  const queryClient = useQueryClient()
  
  useEffect(() => {
    const prefetchOtherRanges = async () => {
      const today = startOfDay(new Date())
      
      // Define the date ranges we want to prefetch
      const rangesToPrefetch = [
        { key: '3d', from: subDays(today, 2), to: today },
        { key: '7d', from: subDays(today, 6), to: today },
        { key: '30d', from: subDays(today, 29), to: today },
      ]

      console.log('Starting background prefetch for chart data...')

      // Prefetch each range with a small delay to not overwhelm the server
      for (let i = 0; i < rangesToPrefetch.length; i++) {
        const range = rangesToPrefetch[i]
        const startDate = format(range.from, 'yyyy-MM-dd')
        const endDate = format(range.to, 'yyyy-MM-dd')
        
        // Add minimal delay between requests to be server-friendly
        if (i > 0) {
          await new Promise(resolve => setTimeout(resolve, 200))
        }

        try {
          console.log(`Prefetching ${range.key} data (${startDate} to ${endDate})...`)
          await queryClient.prefetchQuery({
            queryKey: ['chartData', startDate, endDate],
            queryFn: () => fetchChartData(startDate, endDate),
            staleTime: 5 * 60 * 1000, // 5 minutes
          })
          console.log(`Successfully prefetched ${range.key} data`)
        } catch (error) {
          console.log(`Failed to prefetch ${range.key} data:`, error)
          // Continue with other prefetches even if one fails
        }
      }
      
      console.log('Background prefetch completed!')
    }

    // Start prefetching immediately in parallel with 1d data
    const timeoutId = setTimeout(prefetchOtherRanges, 100) // Very short delay
    
    return () => clearTimeout(timeoutId)
  }, [queryClient])
}