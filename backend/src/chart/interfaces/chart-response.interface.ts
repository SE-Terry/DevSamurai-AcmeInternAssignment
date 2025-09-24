export interface ChartDataPoint {
  date: string;
  people: number;
  companies: number;
}

export interface ChartResponse {
  success: boolean;
  data: ChartDataPoint[];
  total: number;
}
