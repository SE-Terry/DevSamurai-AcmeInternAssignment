import { Module } from '@nestjs/common';
import { ChartController } from './chart.controller';
import { ChartService } from './chart.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ChartController],
  providers: [ChartService, PrismaService],
  exports: [ChartService],
})
export class ChartModule {}
