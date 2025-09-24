import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '../../generated/prisma';
import { ChartResponse } from './interfaces/chart-response.interface';

@Injectable()
export class ChartService {
  constructor(private prisma: PrismaService) {}

  async getChartData(
    startDate?: string,
    endDate?: string,
  ): Promise<ChartResponse> {
    try {
      const whereCondition: Prisma.chart_dataWhereInput = {};

      // Add date filtering if provided
      if (startDate || endDate) {
        whereCondition.date = {};

        if (startDate) {
          const start = new Date(startDate);
          if (isNaN(start.getTime())) {
            throw new BadRequestException('Invalid startDate format');
          }
          whereCondition.date.gte = start;
        }

        if (endDate) {
          const end = new Date(endDate);
          if (isNaN(end.getTime())) {
            throw new BadRequestException('Invalid endDate format');
          }
          whereCondition.date.lte = end;
        }
      }

      const chartData = await this.prisma.chart_data.findMany({
        where: whereCondition,
        select: {
          date: true,
          people: true,
          companies: true,
        },
        orderBy: {
          date: 'asc',
        },
      });

      // Format dates to YYYY-MM-DD for frontend compatibility
      const formattedData = chartData.map((item) => ({
        date: (item.date as Date).toISOString().split('T')[0], // Convert to YYYY-MM-DD
        people: item.people,
        companies: item.companies,
      }));

      return {
        success: true,
        data: formattedData,
        total: formattedData.length,
      };
    } catch (error: unknown) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to fetch chart data');
    }
  }
}
