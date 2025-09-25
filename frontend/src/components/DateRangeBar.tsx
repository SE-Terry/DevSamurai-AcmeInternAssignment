import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar as CalendarIcon } from 'lucide-react'
import type { RootState } from '@/store/store'
import { setActiveTab, setDateRange, setDatePickerOpen, type DateRangeTab } from '@/store/slices/dateRangeSlice'

const DateRangeBar = () => {
  const dispatch = useDispatch()
  const { activeTab, dateRange, isDatePickerOpen } = useSelector((state: RootState) => state.dateRange)
  

  const minDate = new Date(2025, 7, 1)

  // Handle tab change
  const handleTabChange = (tab: DateRangeTab) => {
    dispatch(setActiveTab(tab))
  }

  // Handle custom date range selection
  const handleDateRangeSelect = (range: { from?: Date; to?: Date } | undefined) => {
    if (range?.from) {
      if (range.to) {
        dispatch(setDateRange({ from: range.from, to: range.to }))
        dispatch(setDatePickerOpen(false))
      } else {
        dispatch(setDateRange({ from: range.from, to: range.from }))
      }
    }
  }

  const formatDateRange = () => {
    if (dateRange.from.getTime() === dateRange.to.getTime()) {
      return format(dateRange.from, 'MMM dd, yyyy')
    }
    return `${format(dateRange.from, 'MMM dd, yyyy')} - ${format(dateRange.to, 'MMM dd, yyyy')}`
  }

  return (
    <div className="sticky bg-background border-b border-border p-2">
      <div className="flex items-center gap-4">
        <Tabs value={activeTab} onValueChange={(value) => handleTabChange(value as DateRangeTab)} className="w-auto" data-testid="date-range-tabs">
          <TabsList className="grid grid-cols-5 w-fit !bg-transparent !p-0 !h-auto">
            <TabsTrigger value="1d" className="px-3 py-2 !bg-transparent hover:!bg-transparent data-[state=active]:!bg-transparent !shadow-none data-[state=active]:!shadow-none !border-0 relative data-[state=active]:after:absolute data-[state=active]:after:-bottom-[9px] data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-primary" data-testid="date-tab-1d">1d</TabsTrigger>
            <TabsTrigger value="3d" className="px-3 py-2 !bg-transparent hover:!bg-transparent data-[state=active]:!bg-transparent !shadow-none data-[state=active]:!shadow-none !border-0 relative data-[state=active]:after:absolute data-[state=active]:after:-bottom-[9px] data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-primary">3d</TabsTrigger>
            <TabsTrigger value="7d" className="px-3 py-2 !bg-transparent hover:!bg-transparent data-[state=active]:!bg-transparent !shadow-none data-[state=active]:!shadow-none !border-0 relative data-[state=active]:after:absolute data-[state=active]:after:-bottom-[9px] data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-primary">7d</TabsTrigger>
            <TabsTrigger value="30d" className="px-3 py-2 !bg-transparent hover:!bg-transparent data-[state=active]:!bg-transparent !shadow-none data-[state=active]:!shadow-none !border-0 relative data-[state=active]:after:absolute data-[state=active]:after:-bottom-[9px] data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-primary">30d</TabsTrigger>
            <TabsTrigger value="custom" className="px-3 py-2 !bg-transparent hover:!bg-transparent data-[state=active]:!bg-transparent !shadow-none data-[state=active]:!shadow-none !border-0 relative data-[state=active]:after:absolute data-[state=active]:after:-bottom-[9px] data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[2px] data-[state=active]:after:bg-primary" data-testid="date-tab-custom">Custom</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {activeTab === 'custom' ? (
          <Popover open={isDatePickerOpen} onOpenChange={(open) => dispatch(setDatePickerOpen(open))}>
            <PopoverTrigger asChild>
              <div className="flex items-center gap-2 px-3 py-2 border border-border rounded-md cursor-pointer hover:bg-accent/50" data-testid="custom-date-picker">
                <CalendarIcon size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium">{dateRange ? formatDateRange() : "Pick a date range"}</span>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                defaultMonth={dateRange?.from}
                selected={{ from: dateRange.from, to: dateRange.to }}
                onSelect={handleDateRangeSelect}
                numberOfMonths={2}
                disabled={(date) => date < minDate || date > new Date()}
                captionLayout="dropdown"
              />
            </PopoverContent>
          </Popover>
        ) : (
          <div className="flex items-center gap-2 px-3 py-2 border border-border rounded-md">
            <CalendarIcon size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium">{formatDateRange()}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default DateRangeBar
