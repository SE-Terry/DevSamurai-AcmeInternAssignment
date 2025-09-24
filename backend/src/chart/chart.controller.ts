import {
  Controller,
  Get,
  Query,
  UseGuards,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ChartQueryDto } from './dto/chart-query.dto';
import { ChartResponse } from './interfaces/chart-response.interface';
import { ChartService } from './chart.service';

@Controller('chart')
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class ChartController {
  constructor(private readonly chartService: ChartService) {}

  @Get('data')
  async getChartData(@Query() query: ChartQueryDto): Promise<ChartResponse> {
    return this.chartService.getChartData(query.startDate, query.endDate);
  }
}
