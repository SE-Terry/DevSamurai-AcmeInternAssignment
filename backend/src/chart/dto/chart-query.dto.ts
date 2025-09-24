import { IsOptional, IsDateString } from 'class-validator';

export class ChartQueryDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}
