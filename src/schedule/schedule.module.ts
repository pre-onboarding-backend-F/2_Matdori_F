import { Module } from '@nestjs/common';
import { ScheduleModule as Schedule } from '@nestjs/schedule';
import { ScheduleService } from './schedule.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpenApiRaws } from 'src/global/entities/open-api-raws.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleController } from './schedule.controller';

@Module({
	imports: [Schedule.forRoot(), HttpModule, TypeOrmModule.forFeature([OpenApiRaws]), EventEmitterModule.forRoot()],
	providers: [ScheduleService],
	controllers: [ScheduleController],
})
export class ScheduleModule {}
